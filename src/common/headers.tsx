import { Request, Response, NextFunction } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    res.header("access-control-allow-origin", "*");
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
    res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
};

export {};
