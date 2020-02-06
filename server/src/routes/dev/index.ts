import * as Express from 'express';
import mongodbClient from '../../common/mongodbClient';

const router = Express.Router();

router.get('/mongodb', (req, res, next) => {
    console.log("1")
    mongodbClient((err, client) => {
        if (err) {
            res.status(500).json({ message: 'MongoDB not connected.' });
            return next(err);
        }
        client.close();
        res.json({ message: 'MongoDB Connected.' });
    });
});

export default router;