import * as Express from 'express';
import mongodbClient from '../../common/mongodbClient';

const router = Express.Router();

router.post('/goods/create', (req, res, next) => {
    console.log("1")
});

export default router;