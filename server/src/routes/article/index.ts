import * as Express from 'express';
import noImpl from '../../noImpl';

const router = Express.Router();

// 全ユーザの記事一覧取得
//router.get('/', noImpl);

router.get('/test', (req, res, next) => {
    console.log("1")
        res.json({ message: 'WHAT?' });
});

// ログインしてるユーザの記事投稿
router.post('/', noImpl);

export default router;