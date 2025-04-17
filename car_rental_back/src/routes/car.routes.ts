import { Router } from 'express';
import { carController } from '../controllers/car.controller';
import { upload } from '../middleware/upload.middleware';
import cors from 'cors';

const router = Router();

// Enable CORS for all Car routes
router.use(cors());

router.get('/', carController.getAllCars);
router.get('/available', carController.getAvailableCars);
router.get('/search', carController.searchCars);
router.get('/:id', carController.getCarById);
router.post('/', upload.single('photo'), carController.createCar);
router.put('/:id', upload.single('photo'), carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.post('/:id/like', carController.likeCar);

export default router;