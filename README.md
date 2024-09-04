# Foodlie 🍔

Foodlie is an online food ordering website where users can browse menus, add items to their cart, save favorite items to their wishlist, and place orders. This project includes both the frontend and backend components.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)


## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Menu Browsing**: Browse through various food items categorized by type.
- **Cart**: Add items to the cart and manage quantities before placing an order.
- **Wishlist**: Save favorite items to the wishlist for quick access later.
- **Order Management**: Place orders, view past orders, and track order status.
- **Responsive Design**: Mobile-friendly UI/UX.

## Technologies

### Frontend
- **React.js**: Frontend library for building user interfaces.
- **Redux Toolkit**: State management for cart and wishlist features.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For navigating between different pages.

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building the backend API.
- **MongoDB**: NoSQL database for storing user data, orders, and food items.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for user authentication.
- **bcrypt.js**: Library for hashing user passwords.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or a cloud MongoDB instance.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/foodlie.git
   cd foodlie

2. **Install dependencies for both frontend and backend:**
# Install backend dependencies
```
cd backend
npm install
```
# Install frontend dependencies
```
cd ../client
npm install
```

3.    **Running the Application**

3.1   #Start the backend server:
```cd backend
nodemon index.js
````
3.2    #Start the Frontend 

```cd client
npm start
```


