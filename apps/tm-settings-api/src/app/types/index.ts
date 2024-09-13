import { IUser } from "./user";

declare module 'express' {
  export interface Request extends Express.Request {
    userContext: IUser;
  }
}