pipeline {
    agent any

    environment {
        SSH_KEY = '/var/lib/jenkins/.ssh/id_rsa'  // SSH key for authentication
        SERVER_IP = '3.81.103.194'  // IP address of the EC2 instance
        DEPLOY_PATH = '/home/ubuntu/simple-app'  // Deployment path on the EC2 instance
        NODE_HOME = '/usr/local/bin'  // Node.js home directory
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
                    // Print the current process list to debug
                    echo "Listing current processes..."
                    sh 'ps -x'

                    // Refined approach to find the PM2 process
                    def pm2_pid = sh(script: "pgrep -f '/home/ubuntu/.pm2'", returnStdout: true).trim()
                    echo "PM2 process found: ${pm2_pid}"

                    // Check if we got a valid PID and stop the PM2 process
                    if (pm2_pid) {
                        echo "Stopping PM2 process with PID: ${pm2_pid}"
                        sh "sudo kill -9 ${pm2_pid}"  // Use sudo to kill the process
                    } else {
                        echo "No PM2 process found."
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying Node.js application...'
                script {
                    // SCP to copy files from Jenkins to EC2
                    sh "scp -i ${SSH_KEY} -o StrictHostKeyChecking=no -r * ubuntu@${SERVER_IP}:${DEPLOY_PATH}"
                }
            }
        }

        stage('Start Node.js App') {
            steps {
                echo 'Starting Node.js app...'
                sh 'pm2 start app.js'
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
