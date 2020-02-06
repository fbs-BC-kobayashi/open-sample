import * as Express from 'express';
import noImpl from '../../noImpl';

const router = Express.Router();

// ログイン処理
router.post('/login', noImpl);

// ログアウト処理
router.delete('/logout', noImpl);

// article 自体の READ, UPDATE, DELETE は /user/:user/article で行うようにする。

export default router;