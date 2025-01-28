pipeline {
    agent any

    environment {
        SSH_KEY = '/var/lib/jenkins/.ssh/id_rsa'
        SERVER_IP = '3.81.103.194'
        DEPLOY_PATH = '/home/ubuntu/simple-app'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
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
                    // Find and stop the running PM2 process
                    def pm2_pid = sh(script: "pgrep -f 'PM2'", returnStdout: true, returnStatus: true).trim()
                    if (pm2_pid) {
                        echo "Stopping PM2 process with PID: ${pm2_pid}"
                        sh "sudo kill -9 ${pm2_pid}"  // Use sudo to kill the process
                    } else {
                        echo "No PM2 process found or failed to retrieve PID"
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying the application to the server...'
                script {
                    sh """
                        scp -i ${SSH_KEY} -o StrictHostKeyChecking=no -r . ubuntu@${SERVER_IP}:${DEPLOY_PATH}
                    """
                }
            }
        }

        stage('Start Node.js App') {
            steps {
                echo 'Starting Node.js app on the server...'
                script {
                    sh """
                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'cd ${DEPLOY_PATH} && nohup node app.js > /dev/null 2>&1 &'
                    """
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
