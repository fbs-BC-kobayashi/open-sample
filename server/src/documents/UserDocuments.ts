import * as MongoDB from 'mongodb';

export interface UserDocument {
    _id: MongoDB.ObjectId;
    user_id: string;
    name: string;
    password: string;
}
