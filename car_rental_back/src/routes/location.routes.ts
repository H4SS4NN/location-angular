import { Router } from 'express';
import { locationController } from '../controllers/location.controller';
import { upload } from '../middleware/upload.middleware';
import cors from 'cors';

const router = Router();

// Enable CORS for all Location routes
router.use(cors());

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', upload.single('photo'), locationController.createLocation);
router.put('/:id', upload.single('photo'), locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);
router.post('/:id/like', locationController.likeLocation);

export default router;