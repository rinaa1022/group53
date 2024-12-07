# group53

**Set Up Your Environment**
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL

### Step 1: Install Node.js
- Visit [Node.js website](https://nodejs.org/en) and install Node.js.
  
### Step2: Set Up the Backend
1. Create a folder for your backend: </br>
  `a. mkdir backend` </br>
  `b. cd backend`
2. Initialize the project: </br>
  `a. npm init -y`
3. Install required packages: </br>
  `a. npm install express mysql cors body-parser`
4. Create a server.js file in the backend folder and Replace the content of server.js with the provided server.js: </br>
  `a.touch server.js`

### Step3: Set Up the React Frontend
1. Create a React app: </br>
  `a. npx create-react-app group53-app` </br>
  `b. cd group53-app`
3. Install Axios for API requests: </br>
  `a. npm install axios`
4. Replace the content of App.js in the group53-app folder with the provided App.js </br>

### Step4: Update server.js
1. Update the server.js configuration as follows:
    
        const pool = new Pool({
          user: "postgres",
          host: "127.0.0.1",
          database: "CSE412",
          password: "xxx",
          port: 8888,
        });

### Step5: Start Servers
1. Start the backend server: </br>
  `a. cd backend` </br>
  `b. node server.js`
2. Start the React app: </br>
  `a. cd group53-app` </br>
  `b. npm start`
    
          
