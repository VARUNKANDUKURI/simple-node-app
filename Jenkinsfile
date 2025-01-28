pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }
        
        stage('Stop Existing Node.js App') {
            steps {
                script {
                    echo 'Stopping existing Node.js app...'
                    sh '''
                        if pgrep -f node > /dev/null; then
                          echo "Stopping existing Node.js app..."
                          kill -9 $(pgrep -f node)
                        else
                          echo "No running Node.js app found."
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    echo 'Deploying the application to the server...'
                    // Your deployment commands here
                }
            }
        }
        
        stage('Start Node.js App') {
            steps {
                script {
                    echo 'Starting Node.js app...'
                    // Start your Node.js app commands here
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment finished.'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
