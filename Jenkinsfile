pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'git@github.com:VARUNKANDUKURI/simple-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t simple-node-app:latest .'
            }
        }

        stage('Stop Existing Container') {
            steps {
                echo 'Stopping existing container...'
                script {
                    // Stop and remove existing container if running
                    sh '''
                    if [ "$(docker ps -q -f name=simple-node-app)" ]; then
                        docker stop simple-node-app
                        docker rm simple-node-app
                    fi
                    '''
                }
            }
        }

        stage('Run New Container') {
            steps {
                echo 'Running new container...'
                sh 'docker run -d -p 3100:3100 --name simple-node-app simple-node-app:latest'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
