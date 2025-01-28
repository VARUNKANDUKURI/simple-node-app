pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'git@github.com:VARUNKANDUKURI/simple-node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Stop Existing Node App') {
            steps {
                echo 'Stopping existing Node.js app...'
                script {
                    // Stop existing app if running
                    sh '''
                    if pgrep -f "node app.js"; then
                        pkill -f "node app.js"
                    fi
                    '''
                }
            }
        }

        stage('Run Node.js App') {
            steps {
                echo 'Running Node.js app...'
                sh 'nohup node app.js &'
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
