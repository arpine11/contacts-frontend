# Contacts Manager (Frontend)

This project is a simple frontend application that connects to the
Contacts Management API. It allows users to register, log in, and manage
their personal contacts through a clean and minimal interface.

The frontend focuses on user interaction and communication with the backend.

---

## Core Concepts

- **Frontend UI**: user interface for interacting with the system
- **API communication**: frontend sends HTTP requests to backend
- **JWT handling**: token stored and reused for authenticated requests
- **State management**: UI updates dynamically without page reloads

---

## Features

- User registration
- User login
- Persistent authentication using localStorage
- Display list of contacts
- Add new contacts
- Edit existing contacts
- Logout functionality

---

## Tech Stack

- **HTML** – Structure
- **CSS** – Styling
- **Vanilla JavaScript** – Logic and API communication

No frameworks or libraries are used.

---

## Project Structure

contacts-frontend/
├── index.html
├── styles.css
├── app.js
└── README.md


### File Explanation
- `index.html` – Main HTML layout
- `styles.css` – Styling and layout
- `app.js` – Application logic and API calls

---

## How the Frontend Works

1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored in `localStorage`
4. All future API requests include the token
5. Contacts are fetched and rendered dynamically
6. User actions update the backend and UI in real time

---

## Setup Instructions

### 1. Start the backend server
The backend must be running at:
http://localhost:4000


### 2. Open the frontend
Simply open the `index.html` file in your browser.

No additional setup or build process is required.

---

## API Communication Example

The frontend communicates with the backend using `fetch`:

```js
fetch("http://localhost:4000/contacts", {
  headers: {
    Authorization: "Bearer <JWT_TOKEN>"
  }
})
