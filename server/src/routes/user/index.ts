import * as Express from 'express';
import errorJSON from '../../common/errorJSON';
import mongodbClient from '../../common/mongodbClient';
import { UserDocument } from '../../documents/UserDocuments';

const router = Express.Router();
// ユーザの新規作成
router.post('/new', (req, res, next) => {
    // パラメータ取得
    const user_id = req.body.user_id;
    const name = req.body.name;
    const password = req.body.password;

    // 必須項目が入力済みかチェック
    if (user_id === undefined || name === undefined || password === undefined) {
        res.status(400).json(errorJSON('Parameter', 'Require Parameter.'));
        return next();
    }

    // user_id の書式チェック
    if (user_id.match(/^[a-zA-Z0-9_]+$/) == null) {
        res.status(400).json(errorJSON('Parameter', 'Invalid Parameter.'));
        return next();
    }

    mongodbClient((err, client, db) => {
        if (err) {
            client.close();
            res.status(500).json(errorJSON('MongoDB', err.message));
            return next(err);
        }

        const collection = db.collection<UserDocument>('user');
        collection.insertOne(
            {
                user_id: user_id,
                name: name,
                password: password,
            },
            (err, result) => {
                if (err) {
                    client.close();
                    res.status(500).json(errorJSON('MongoDB', err.message));
                    return next(err);
                }

                res.status(200).json(filterUserDocument(result.ops[0]));
                client.close();
            }
        );
    });
});
function filterUserDocument(doc: object) {
    const denied = ['_id', 'password'];
    return Object.keys(doc)
        .filter(key => denied.indexOf(key) === -1)
        .reduce((obj, key) => {
            obj[key] = doc[key];
            return obj;
        }, {});
}
router.put('/:user', (req, res, next) => {
    // URLから対象のuser_idを取得
    const user_id = req.params.user;

    // JSONより更新用パラメータを取得
    const new_user_id = req.body.user_id;
    const name = req.body.name;
    const password = req.body.password;

    // 更新用オブジェクト作成
    const updateFields = {};
    if (new_user_id !== undefined) { updateFields['user_id'] = new_user_id; }
    if (name !== undefined) { updateFields['name'] = name; }
    if (password !== undefined) { updateFields['password'] = password; }
    const update = { $set: updateFields };

    mongodbClient((err, client, db) => {
        if (err) {
            client.close();
            res.status(500).json(errorJSON('MongoDB', err.message));
            return next(err);
        }

        const collection = db.collection<UserDocument>('user');
        collection.findOneAndUpdate({ user_id: user_id }, update, (err, result) => {
            if (err) {
                client.close();
                res.status(500).json(errorJSON('MongoDB', err.message));
                return next(err);
            }

            if (result.value === null) {
                // 対象レコードが存在しなかった場合 result.value に null が返る。
                client.close();
                res.status(404).json({ message: 'Not Found.' });
                return;
            }

            // 更新後のdocumentを取得するために再検索する。
            collection.findOne({ _id: result.value._id }, (err, result) => {
                if (err) {
                    client.close();
                    res.status(500).json(errorJSON('MongoDB', err.message));
                    return next(err);
                }

                client.close();
                res.json(filterUserDocument(result));
            });
        });
    });
});
router.get('/:user', (req, res, next) => {
    const user_id = req.params.user;

    mongodbClient((err, client, db) => {
        if (err) {
            client.close();
            res.status(500).json(errorJSON('MongoDB', err.message));
            return next(err);
        }

        const collection = db.collection<UserDocument>('user');
        collection.findOne({ user_id: user_id }, (err, result) => {
            if (err) {
                client.close();
                res.status(500).json(errorJSON('MongoDB', err.message));
                return next(err);
            }

            client.close();

            if (result == null) {
                res.status(404).json({ message: 'Not Found.' });
            } else {
                res.json(filterUserDocument(result));
            }
        });
    });
});
router.delete('/:user', (req, res, next) => {
    const user_id = req.params.user;

    mongodbClient((err, client, db) => {
        if (err) {
            client.close();
            res.status(500).json(errorJSON('MongoDB', err.message));
            return next(err);
        }

        const collection = db.collection<UserDocument>('user');
        collection.findOneAndDelete({ user_id: user_id }, (err, result) => {
            if (err) {
                client.close();
                res.status(500).json(errorJSON('MongoDB', err.message));
                return next(err);
            }

            client.close();
            if (result.value == null) {
                res.status(404).json({ message: 'Not Found.' });
            } else {
                res.json({ message: 'Deleted.' });
            }
        });
    });
});