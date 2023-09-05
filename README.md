# Dog Adoption Website: A Newbie's Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Launch](#launch)
4. [Scope of Functionalities](#scope-of-functionalities)
5. [Examples of Use](#examples-of-use)
6. [Project Status](#project-status)
7. [Sources](#sources)
8. [Other Information](#other-information)

## Introduction

Welcome to the Dog Adoption Website project! The aim of this initiative is to facilitate a seamless and efficient process for dog adoption. It serves as a platform where different types of users can interact and manage dog adoption cards, providing an organized system to connect dog lovers and potential dog owners. Let's dive into the various features and functionalities that make this project unique.

## Technologies

The backbone of this project comprises a robust set of technologies to ensure a seamless and efficient user experience:

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **State Management**: Redux
- **UI Framework**: Material-UI (MUI)
- **Authentication and Verification**: JWT, Joi
- **File Upload**: Multer
- **Real-time Communication**: Socket.io
- **Routing**: react-router-dom
- **External API Integration**: Fetch API (for dog breeds)

## Launch

1. **Server**:

### Setting up the Development Environment

Run the following command to start the server in development mode (with a local MongoDB instance):

'npm run dev'

### Setting up the Production Environment

For the production environment, use the following command to start the server:

'npm start'

2. **Client**: To start the client-side application, navigate to the React project directory and use:

'npm start'

## Scope of Functionalities

The website hosts three types of users, each with distinct functionalities:

1. **Normal Users**

   - View dog adoption cards
   - Edit their own profile
   - Engage in chat with card creators

2. **Business Users**

   - All functionalities of normal users
   - Create, edit, and delete their own dog adoption cards

3. **Admin Users**
   - All functionalities of business users
   - Edit and delete any dog adoption cards

## Examples of Use

- Retrieving a list of all dog breeds from an external API and displaying it on the homepage
- Users can upload and edit profile pictures using Multer for image handling
- Real-time chat functionality between users facilitated by Socket.io, with chat histories saved and retrievable from the database

## Project Status

The project is in active development, with continuous updates and improvements being made to enhance the user experience and expand functionalities.

## Sources

Documentation and resources that were instrumental in the development of this project will be listed here.

## Other Information

For token management and user authentication, JWTDecode was used to ensure secure and authenticated user sessions.

Feel free to explore the project and contribute. If you have any queries or suggestions, do not hesitate to reach out.

---

We hope this guide provides you with an insightful view into the project. Happy coding!
