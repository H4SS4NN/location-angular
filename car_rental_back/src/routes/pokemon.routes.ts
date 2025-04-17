import { Router } from 'express';
import { pokemonController } from '../controllers/pokemon.controller';
import { upload } from '../middleware/upload.middleware';
import cors from 'cors';

const router = Router();

// Enable CORS for all Pokemon routes
router.use(cors());

router.get('/', pokemonController.getAllPokemons);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', upload.single('picture'), pokemonController.createPokemon);
router.put('/:id', upload.single('picture'), pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

export default router;