const express = require('express');
const app = express();
const port = 3100;

app.get('/', (req, res) => {
    res.send(`
        1. **Setting up the EC2 Instance:**
            • We set up an EC2 instance (Ubuntu) on AWS.
            • We configured security groups to allow:
                • SSH (port 22) for remote access to the EC2 instance.
                • HTTP (port 80) and the application port (3100) for web access and the Docker container’s services.

        2. **Setting up Jenkins on the EC2 Instance:**
            • Installed Jenkins on the EC2 instance (http://98.82.11.201:8080/).
            • Installed required plugins for Jenkins (e.g., Docker, GitHub integration).
            • Configured SSH keys for Jenkins to access the GitHub repository (https://github.com/VARUNKANDUKURI/webMethodsProject.git).
            • Set up Jenkins credentials to use the SSH key for secure GitHub communication.

        3. **Creating the Jenkins Pipeline:**
            • We wrote a Jenkins pipeline in a Jenkinsfile for the deployment process:
                1. **Cloning the Repository:** Jenkins clones the GitHub repository containing the Docker project files.
                2. **Building the Docker Image:** Jenkins builds the Docker image using the Dockerfile and tags it as simple-node-app:latest.
                3. **Stopping the Existing Docker Container:** The pipeline stops and removes any running container with the name simple-node-app.
                4. **Running the New Container:** The pipeline runs the newly built Docker image as a container on the specified port (3100).

        4. **Permissions and Configuration:**
            • We handled permissions:
                • Jenkins was granted sudo access for Docker commands.
                • We ensured Docker commands like docker run, docker ps, docker stop, and docker rm were working without requiring interactive password entry.
                • We updated the pipeline to remove sudo from Docker commands, allowing Jenkins to directly execute them.

        5. **Security Group Configuration:**
            • Configured the security group for the EC2 instance to allow inbound access on ports:
                • Port 22: For SSH access to the server.
                • Port 8080: For accessing Jenkins’ web interface.
                • Port 3100: For accessing the Node.js app running in the Docker container.

        6. **Testing and Troubleshooting:**
            • Initially, there was an issue with sudo permissions for Docker commands, which was resolved by ensuring Jenkins could run Docker commands without needing a password.
            • Also ensured that the existing container would be stopped and removed only if it was running.

        7. **Final Deployment:**
            • After making the necessary updates to the Jenkinsfile and resolving permission issues, the pipeline was successfully triggered.
            • The deployment now successfully pulls the code from GitHub, builds the Docker image, stops the old container, and runs the new container with the updated code.
    `);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
