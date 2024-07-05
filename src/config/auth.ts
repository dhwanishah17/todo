import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { environment } from './index';
const { secret} = environment;

dotenv.config();

export const verifyJWTToken=(token:any)=> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err:any, decodedToken:any) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
};

export const createJWToken=(payload:any)=> {
  return jwt.sign({
    data: payload
  },secret, {
    expiresIn: "1hr",
    algorithm: 'HS256'
  });
};
