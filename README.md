# group53

Set Up Your Environment
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: PostgreSQL
<pre>
Step1: Install Node.js on website https://nodejs.org/en <pre>
Step2: Set Up the Backend <pre>
        1. Create a folder for your backend:
          a. mkdir backend
          b. cd backend
        2. Initialize the project:
          a. npm init -y
        3. Install required packages:
          a. npm install express mysql cors body-parser
        4. Create a server.js file in the backend folder and Replace the content of server.js with the provided server.js:
          a.touch server.js
Step3: Set Up the React Frontend
        1. Create a React app:
          a. npx create-react-app group53-app 
          b. cd group53-app 
        3. Install Axios for API requests:
          a. npm install axios
        4. Replace the content of App.js in the group53-app folder with the provided App.js
Step4: 
      1. Update server.js like following:
    
          const pool = new Pool({
              user: "postgres",
              host: "127.0.0.1",
              database: "CSE412",
              password: "xxx",
              port: 8888,
          });

Step5:
    1. Start the backend server:
        a. cd backend
        b. node server.js
    2. Start the React app: 
        a. cd group53-app
        b. npm start
    
          
