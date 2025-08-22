pipeline {
    agent any

    environment {
        REGISTRY = "your-docker-registry"
        REPO = "git_product_serv"
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                echo 'Running linters...'
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Running security scan...'
                sh 'npx snyk test'
            }
        }
        stage('Container Build') {
            steps {
                echo 'Building Docker Image...'
                sh 'docker build -t ${REGISTRY}/${REPO}:${env.BUILD_NUMBER} .'
            }
        }
        stage('Container Push') {
            steps {
                echo 'Pushing Docker Image...'
                sh 'docker push ${REGISTRY}/${REPO}:${env.BUILD_NUMBER}'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to Development Environment...'
                // Implement deployment logic here
            }
        }
    }
}
