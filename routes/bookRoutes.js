import express from 'express';
import { getBooks, getBook, createBook, updateBook,  deleteBook, 
    checkBookAvailability } from '../controllers/book.js';

import { protect } from "../middleware/auth.js"


const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/add', protect, createBook);
router.patch('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

router.get('/:id/availability', checkBookAvailability);


export default router;