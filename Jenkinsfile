pipeline {
    agent any

    environment {
        // Define your SSH details and server path
        SSH_KEY = '/var/lib/jenkins/.ssh/id_rsa'  // Path to your SSH private key on Jenkins server
        SERVER_IP = '3.81.103.194'               // Your EC2 instance's IP
        DEPLOY_PATH = '/home/ubuntu/simple-app'  // Path where the app should be deployed on the server
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
                    def pid = sh(script: "pgrep -f node app.js", returnStdout: true).trim()
                    if (pid) {
                        echo "Stopping Node.js app with PID: ${pid}"
                        sh "pkill -f node app.js"
                    } else {
                        echo 'No running Node.js app found.'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying the application to the server...'

                script {
                    // Copy the app code to the remote server using SCP
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
                    // Start the Node.js app on the remote server
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
