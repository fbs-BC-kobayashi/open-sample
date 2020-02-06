import * as Express from 'express';
import noImpl from '../../../noImpl';

const router = Express.Router({ mergeParams: true });

// ユーザの記事一覧
router.get('/list', noImpl);

// 記事単体取得
router.get('/:article', noImpl);

// 記事の更新
router.put('/:article', noImpl);

// 記事の削除
router.delete('/:article', noImpl);

export default router;