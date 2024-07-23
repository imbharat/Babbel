# Project Name
### Babbel - EMail Guesser

## Description
#### Purpose:
> #### This project is designed to generate email addresses based on given names and company domains.

#### Backend APIs:
##### /api/v1/users/email
> ##### Query Parameters: name=[string], domain=[string]
> ##### Example: /api/v1/users/email?name=bharat sharma&domain=google.com
##### /api/v1/users/email-fast
> ##### Query Parameters: name=[string], domain=[string]
> ##### Example: /api/v1/users/email-fast?name=bharat sharma&domain=google.com

#### Features:
> ##### Derive email addresses using name and domain formats based on company email patterns.
> ##### Fast and accurate email derivation with caching support.
> ##### Handles various email formats and provides reliable email guessing.
#### Technology Stack:
##### Frontend:
> ##### Built with React and TypeScript for a responsive and interactive user interface.
##### Backend:
> ##### Implemented using Node.js and TypeScript to handle business logic and data operations.
> ##### Uses worker threads to manage concurrent tasks and improve performance.
#### Architecture:
##### Frontend:
> ##### Contains components for user interaction and API integration.
##### Backend:
> ##### Services handle email derivation.
> ##### Implements a worker-based architecture to perform tasks efficiently and handle load.
> ##### Provides API endpoints to interact with the frontend.

## Steps to Run

1. ### Clone the repository
   git clone https://github.com/imbharat/Babbel.git
2. ### In the parent folder, execute the following commands in order:
   #### a. npm run install:all
   #### b. npm install
   #### c. npm run start:all

## Steps to Run Tests

1. ### For frontend (from parent folder):
   #### a. Navigate to the frontend directory:
   #####   cd frontend
   #### b. Run the frontend tests:
   #####   npm test
3. ### For backend (from parent folder):
   #### a. Navigate to the backend directory:
   #####   cd backend
   #### b. Run the backend tests:
   #####   npm test
   
