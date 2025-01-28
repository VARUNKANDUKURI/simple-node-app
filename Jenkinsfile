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

        stage('Stop Existing Node.js App') {
            steps {
                echo 'Stopping existing Node.js app...'
                script {
                    // Stop the running Node.js app with sudo if needed
                    sh '''
                    if pgrep -f "node app.js"; then
                        sudo pkill -f "node app.js"
                    fi
                    '''
                }
            }
        }

        stage('Run Node.js App') {
            steps {
                echo 'Starting Node.js app...'
                script {
                    // Run the updated Node.js app
                    sh 'nohup node app.js > app.log 2>&1 &'
                }
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
