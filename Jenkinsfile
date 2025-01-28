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
                    // Find and stop the running Node.js app using the process name
                    def pid = sh(script: "pgrep -f 'node .*app.js'", returnStdout: true).trim()
                    if (pid) {
                        echo "Stopping Node.js app with PID: ${pid}"
                        sh "sudo kill -9 ${pid}"  // Use sudo to kill the process
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
