import { Router } from 'express';
import {
  getAllArticles,
  createArticle,
  getSingleArticle,
  deleteArticle,
  updateArticle,
} from '../controllers/article.controller';
import { upload } from '../middlewares/upload';

const router = Router();

// Routes for articles
router.post('/', createArticle);
router.put('/:id', upload.single("featuredImage"), updateArticle);
router.get('/', getAllArticles);
router.get('/:id', getSingleArticle);
router.delete('/:id', deleteArticle);

export default router;
