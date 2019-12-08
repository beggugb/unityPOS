import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';

const router = Router();

router.get('/list/:page/:num', ArticleController.getAllArticles);
router.post('/', ArticleController.addArticle);
router.get('/:id', ArticleController.getAArticle);
router.put('/:id', ArticleController.updatedArticle);
router.delete('/:id', ArticleController.deleteArticle);
router.post('/upload/item', ArticleController.uploadArticle);
router.post('/search/items', ArticleController.getSearchArticle);
router.get('/search/category/:id', ArticleController.getSearchCategory);
export default router;