import express from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './config/database';
import carRoutes from './routes/car.routes';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/cars', carRoutes);

// Database sync and server start
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
  console.log(`Uploads directory: ${uploadsDir}`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});