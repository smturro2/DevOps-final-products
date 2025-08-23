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
                    // Get the first 7 characters of the Git commit hash
                    def commitHash = sh(script: 'git rev-parse --short=7 HEAD', returnStdout: true).trim()
                    // Get the current branch name
                    def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()

                    // Use branch name and commit hash to construct the docker tag
                    env.DOCKER_TAG = "${branchName}-${commitHash}"
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
        stage('Security Scan') {
            steps {
                script {
                    utils.runStaticScan()
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
