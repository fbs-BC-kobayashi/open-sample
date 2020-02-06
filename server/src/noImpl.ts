import * as Express from 'express';

export default function notImplemented(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    console.log("noimpl")
    res.status(501).json({ message: 'Not Implemented.' });
}