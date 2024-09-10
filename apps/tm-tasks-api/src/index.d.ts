declare module 'express' {
  export interface Request extends Express.Request {
    userContext: {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
    };
  }
}