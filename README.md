# Finance Tracker

A full-stack web application that allows users to track income and expenses, manage transactions, and view financial summaries through an interactive dashboard.

The application uses secure authentication and a RESTful API to manage financial data.

---
## Live Demo
Frontend: https://finance-tracker-deploy-opal.vercel.app  
Backend: https://finance-tracker-z7ls.onrender.com

---

## Features

* User registration and login with JWT authentication
* Add, view, and delete income or expense transactions
* Financial summary showing total income, expenses, and balance
* Dashboard for tracking financial activity
* Protected backend routes for authenticated users

---

## Tech Stack

**Frontend**

* React
* JavaScript
* HTML
* CSS
* TailwindCSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

## Project Structure

```
finance-tracker
│
├── client
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
│
├── server
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/dhathrivaddiraju/finance-tracker.git
cd finance-tracker
```

---

### 2. Backend Setup

```
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```
npm start
```

---

### 3. Frontend Setup

Open a new terminal and run:

```
cd client
npm install
npm start
```

Application will run at:

```
http://localhost:3000
```

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Transactions

```
POST /api/transactions/add
GET /api/transactions
DELETE /api/transactions/:id
GET /api/transactions/summary
```

---

## Future Improvements

* Financial charts and analytics
* Monthly spending reports
* Budget notifications
* Export transaction history

---

## Author

Dhathri Vaddiraju
Computer Science – University of Massachusetts Lowell
