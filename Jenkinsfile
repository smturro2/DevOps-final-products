pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "your-docker-DOCKER_REGISTRY"
        DOCKER_NAME = "devops-final-web"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
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
                        DOCKER_TAG
                    )
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    utils.conditionalDeployment(
                        env.branchName
                    )
                }
            }
        }
    }
}
