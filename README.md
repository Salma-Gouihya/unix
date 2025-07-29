# 🏪 Entrepot Service - Full Stack Application

A modern full-stack inventory management application built with React frontend and Express.js backend.

## 📋 Features

- **Modern React Frontend**: Beautiful, responsive UI with real-time updates
- **RESTful API Backend**: Express.js server with comprehensive CRUD operations
- **Real-time Search & Filtering**: Search items by name/description and filter by category
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /workspace
   ```

2. **Install all dependencies (frontend, backend, and root)**
   ```bash
   npm run install:all
   ```

### Development

**Start both frontend and backend simultaneously:**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

**Or run them separately:**

**Backend only:**
```bash
npm run backend
```

**Frontend only:**
```bash
npm run frontend
```

## 📁 Project Structure

```
/workspace/
├── backend/                 # Express.js backend
│   ├── src/
│   │   └── server.js       # Main server file
│   ├── routes/
│   │   └── entrepot.js     # API routes
│   ├── controllers/
│   │   └── entrepotController.js  # Business logic
│   ├── package.json
│   └── .env
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styling
│   ├── public/
│   └── package.json
├── package.json           # Root package.json with scripts
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/entrepot`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get all items (supports ?search= and ?category= params) |
| GET    | `/:id`   | Get item by ID |
| POST   | `/`      | Create new item |
| PUT    | `/:id`   | Update item |
| DELETE | `/:id`   | Delete item |

### Example API Usage

**Get all items:**
```bash
curl http://localhost:5000/api/entrepot
```

**Search items:**
```bash
curl "http://localhost:5000/api/entrepot?search=product&category=Electronics"
```

**Create new item:**
```bash
curl -X POST http://localhost:5000/api/entrepot \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "A great product",
    "price": 99.99,
    "category": "Electronics"
  }'
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run backend` | Start only the backend server |
| `npm run frontend` | Start only the frontend development server |
| `npm run install:all` | Install dependencies for all parts of the application |
| `npm run build` | Build the frontend for production |

## 🎨 Frontend Features

- **Item Management**: Add, view, and delete inventory items
- **Real-time Search**: Instant search across item names and descriptions
- **Category Filtering**: Filter items by category
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean interface with smooth animations and transitions
- **Error Handling**: User-friendly error messages and loading states

## ⚙️ Backend Features

- **RESTful API**: Well-structured REST endpoints
- **CORS Enabled**: Cross-origin requests supported
- **Security**: Helmet.js for security headers
- **Logging**: Morgan for request logging
- **Error Handling**: Comprehensive error handling middleware
- **Environment Configuration**: Configurable via .env file

## 🔧 Configuration

### Backend Configuration (`.env`)

```env
PORT=5000
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`. If you change the backend port, update the `API_BASE_URL` in `frontend/src/App.js`.

## 🚀 Production Deployment

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the backend in production mode:**
   ```bash
   cd backend
   NODE_ENV=production npm start
   ```

3. **Serve the frontend build:**
   ```bash
   npm run start:frontend
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Technologies Used

**Frontend:**
- React 18
- Modern CSS with CSS Grid and Flexbox
- Fetch API for HTTP requests

**Backend:**
- Node.js
- Express.js
- CORS
- Helmet.js (Security)
- Morgan (Logging)
- dotenv (Environment variables)

---

**Happy coding! 🎉**
