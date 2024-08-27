Email Service API
This repository contains a simple Email Service API built using Node.js and Express. The service provides two main routes for sending emails and checking the status of sent emails.

Getting Started
Prerequisites
Ensure you have Node.js installed on your machine. You can download it from Node.js Official Website.

Installation
Clone the repository:

##Copy code
git clone <your-repository-url>
Navigate to the project directory:


cd email-service-api
Install the dependencies:


npm install
This will install all necessary dependencies including:

express
uuid
Start the application:

npm start
The server should now be running on http://localhost:3000 (or any port specified in your environment).

Check Installed Dependencies
To verify that all the required dependencies (express and uuid) have been installed correctly, run:


npm list express uuid
Routes
The application provides the following routes:

POST /send

This route is used to send an email.

Example Request:


curl -X POST https://emailservices-l05y.onrender.com/send \
-H "Content-Type: application/json" \
-d '{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "message": "This is a test email."
}'
GET /status/

This route is used to check the status of an email by its ID.

Example Request:

curl https://emailservices-l05y.onrender.com/status/{id}
Deployment
The service is deployed and accessible via the following URLs:

Base URL: https://emailservices-l05y.onrender.com/
Send Email: https://emailservices-l05y.onrender.com/send
