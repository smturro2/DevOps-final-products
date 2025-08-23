pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials("dockerhub")
        DOCKER_REGISTRY = "denture8278"
        DOCKER_NAME = "devops-final-products"
        DOCKER_HOST = 'unix:///var/run/docker.sock'  // this is needed to fix "Cannot connect to the Docker daemon" error
        // DOCKER_TAG = "v1.1"
    }
    

    stages {
        // // todo remove
        // stage('Debug') {
        //     steps {
        //         script {
        //             sh 'whoami'
        //             sh 'env'
        //             sh 'docker --version'
        //             sh 'docker ps'
        //             echo "Branch name is: ${env.BRANCH_NAME}"
        //         }
        //     }
        // }
        stage('Set Version') {
            steps {
                script {
                    def commitHash = sh(script: 'git rev-parse --short=7 HEAD', returnStdout: true).trim()
                    env.DOCKER_TAG = "${commitHash}"
                    echo "Docker tag set to ${env.DOCKER_TAG}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    utils.buildAPI()
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    utils.testJavascript()
                }
            }
        }
        stage('Container Build') {
            steps {
                script {
                    utils.buildDocker(
                        DOCKER_REGISTRY, 
                        DOCKER_NAME, 
                        DOCKER_TAG
                    )
                }
            }
        }
        stage('Security Scan') {
            steps {
                script {
                    utils.runSecurityScan(
                        DOCKER_REGISTRY, 
                        DOCKER_NAME, 
                        DOCKER_TAG
                    )
                }
            }
        }
        stage('Deploy (Container Push)') {
            steps {
                script {
                    utils.conditionalDeployment(
                        env.BRANCH_NAME,
                        DOCKER_REGISTRY, 
                        DOCKER_NAME, 
                        DOCKER_TAG,
                        DOCKERHUB_CREDENTIALS_USR,
                        DOCKERHUB_CREDENTIALS_PSW,
                    )
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
