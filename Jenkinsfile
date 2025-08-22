pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials("dockerhub")
        DOCKER_REGISTRY = "denture8278"
        DOCKER_NAME = "devops-final-products"
        DOCKER_HOST = 'unix:///var/run/docker.sock'  // this is needed to fix "Cannot connect to the Docker daemon" error
        // DOCKER_TAG = "${env.BUILD_NUMBER}"  // todo
        DOCKER_TAG = "v1.1"
    }

    stages {
        // todo remove
        stage('Debug') {
            steps {
                script {
                    sh 'whoami'
                    sh 'env'
                    sh 'docker --version'
                    sh 'docker ps'
                    echo "Branch name is: ${env.BRANCH_NAME}"
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
        stage('Container Push') {
            steps {
                script {
                    utils.pushDocker(
                        DOCKER_REGISTRY, 
                        DOCKER_NAME, 
                        DOCKER_TAG,
                        DOCKERHUB_CREDENTIALS_USR,
                        DOCKERHUB_CREDENTIALS_PSW,
                    )
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    utils.conditionalDeployment(
                        env.BRANCH_NAME
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
