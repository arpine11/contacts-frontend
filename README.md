# Contacts Management Application

This project is a simple full-stack Contacts Management application.
It consists of a backend REST API and a frontend client that allows users
to register, log in, and manage their personal contacts.

The main goal of the project is to demonstrate authentication,
authorization, and CRUD operations.

---

## Features
- User registration
- User login with JSON Web Tokens (JWT)
- Create new contacts
- View list of contacts
- Edit existing contacts
- Authorization: each user can access and manage only their own contacts

---

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JSON Web Tokens (JWT)
- bcryptjs

### Frontend
- HTML
- CSS
- Vanilla JavaScript

---

## Project Structure (Overview)

### Backend
- server.js  
- src/db/database.js  
- src/middleware/auth.js  
- src/routes/auth.js  
- src/routes/contacts.js  

### Frontend
- index.html  
- styles.css  
- app.js  

---

## Backend Setup Instructions

1. Install dependencies
```bash
npm install
