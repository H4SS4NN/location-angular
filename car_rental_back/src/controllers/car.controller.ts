import { Request, Response } from 'express';
import { carService } from '../services/car.service';
import { sendReservationEmail } from '../config/email';

export class CarController {
  async getAllCars(req: Request, res: Response) {
    try {
      const cars = await carService.findAll();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error });
    }
  }

  async getAvailableCars(req: Request, res: Response) {
    try {
      const cars = await carService.findAvailable();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching available cars', error });
    }
  }

  async getCarById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const car = await carService.findById(id);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching car', error });
    }
  }

  async createCar(req: Request, res: Response) {
    try {
      const carData = {
        ...req.body,
        photo: req.file ? `/${req.file.filename}` : null,
      };
      const car = await carService.create(carData);
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error creating car', error });
    }
  }

  async updateCar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const carData = {
        ...req.body,
        photo: req.file ? `/${req.file.filename}` : undefined,
      };

      // Si c'est une réservation
      if (carData.available === false && carData.reservedFrom && carData.reservedTo && carData.customerEmail) {
        const [affectedCount] = await carService.update(id, {
          ...carData,
          customerName: carData.customerName,
          customerEmail: carData.customerEmail
        });

        if (affectedCount === 0) {
          return res.status(404).json({ message: 'Car not found' });
        }

        const updatedCar = await carService.findById(id);
        if (updatedCar) {
          // Envoyer l'email de confirmation
          await sendReservationEmail(carData.customerEmail, {
            brand: updatedCar.brand,
            model: updatedCar.model,
            reservedFrom: new Date(carData.reservedFrom),
            reservedTo: new Date(carData.reservedTo),
            customerName: carData.customerName
          });
        }
        res.json(updatedCar);
      } else {
        // Mise à jour normale
        const [affectedCount] = await carService.update(id, carData);
        if (affectedCount === 0) {
          return res.status(404).json({ message: 'Car not found' });
        }
        const updatedCar = await carService.findById(id);
        res.json(updatedCar);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating car', error });
    }
  }

  async deleteCar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await carService.delete(id);
      if (deleted === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting car', error });
    }
  }

  async likeCar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const [affectedCount] = await carService.incrementLikes(id);
      if (affectedCount === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }
      const updatedCar = await carService.findById(id);
      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ message: 'Error liking car', error });
    }
  }

  async searchCars(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      const cars = await carService.searchByBrandOrModel(query);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error searching cars', error });
    }
  }
}

export const carController = new CarController();