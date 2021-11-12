import { Request, Response, NextFunction } from 'express';

const signIn = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({"success": true});
}

export default { signIn }