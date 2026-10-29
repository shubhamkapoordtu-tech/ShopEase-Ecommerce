# ShopEase — E-Commerce Product Listing Website

## 1. Project Overview

ShopEase is a full-stack e-commerce website developed as Part 1 of the Full-Stack E-Commerce Application lab assignment.

Users can browse products, search the catalogue, view product images and prices, and open individual product details.

## 2. Technologies Used

- **Frontend:** React, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Database Library:** better-sqlite3
- **Other Tools:** Git, npm

## 3. Project Structure

```text
Ecom/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
├── database/
│   └── schema.sql
├── .gitignore
└── README.md
```

## 4. Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A modern web browser

SQLite is used through the Node.js package, so a separate database server is not required.

## 5. Installation

Clone the repository or download the project files.

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies in a separate terminal:

```bash
cd frontend
npm install
```

## 6. Run the Application

### Start the backend

Open a terminal in the backend directory and run:

```bash
node server.js
```

The backend runs at:

http://localhost:5000

The database is created automatically when the backend starts.

### Start the frontend

Open another terminal in the frontend directory and run:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

http://localhost:5173

Keep both terminals running while using the website.

## 7. Database

The application uses a SQLite database with a `products` table.

| Column | Description |
|---|---|
| id | Unique product ID |
| name | Product name |
| description | Product description |
| price | Product price |
| image | Product image reference |

Sample products include Wireless Headphones, Smart Watch, Laptop Backpack, and Wireless Mouse.

The database table and sample products are initialized by the backend. The SQL setup script is available at `database/schema.sql`.

## 8. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products?search=mouse` | Search products |
| GET | `/api/products/1` | Retrieve a product by ID |

### HTTP Status Codes

- `200 OK` — Request completed successfully.
- `400 Bad Request` — Invalid product ID or search value.
- `404 Not Found` — Product does not exist.

## 9. Application Architecture

The application follows a three-layer architecture:

1. **Frontend:** React displays products and handles search and product selection.
2. **Backend:** Express provides API endpoints and validates requests.
3. **Database:** SQLite stores product records and supplies data through the backend.

The frontend requests product information from the backend API. The backend queries SQLite and returns JSON responses to the frontend.

## 10. Features

- Responsive product listing page
- Product images, descriptions, and prices
- Search by product name or description
- Individual product details view
- SQLite database integration
- Backend API with request validation
- Responsive styling for desktop and mobile screens

## 11. Future Enhancements

Future stages may include shopping cart functionality, user authentication, authorization, database migrations, logging, and monitoring.

## 12. Author

Developed as a Full-Stack E-Commerce Application lab assignment — Part 1.
