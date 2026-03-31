# Mail Sender Helper API
  A REST API built with Express and MongoDB. This API provides registers apps having issue with SMTP while hosted on render and sends mail on it's behalf.
  
## Features:
 * RESTful API with endpoints for creating, reading, updating, and deleting app details registered.
 * Each app registered have atleast a appName, appLinkURL and timestamp/s, will be persisted in App Model collection.
 * After registering the app, the registered app which is facing issues in Render deployment with SMTP for free tier will now able to send various kinds of mails to that app's requesting user like: Password Reset/Verify Email/Generate OTP/Feedback mails.
 * Provided clear and comprehensive API documentation using tools like Swagger or OpenAPI.

## Tech Stack Used:

#### Back-End:
<img alt="NodeJS" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="ExpressJS" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img alt="Mongoose" src ="https://img.shields.io/badge/Mongoose-orange?style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="Swagger UI" src ="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"/>

#### Database:
<img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>

#### Deployed Version:

https://mail-sender-helper-api.vercel.app/

## Demonstration:

<img width="745" height="647" alt="MailSenderHelperAPI" src="https://github.com/user-attachments/assets/82191751-3c7f-48e3-98d7-5bd881ad0bf1" />



