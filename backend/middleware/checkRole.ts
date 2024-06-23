import { Request, Response, NextFunction } from 'express';


//define the user type object
interface User {
  id: string;
  roles: string[];
}

// express request
export interface RequestWithUser extends Request {
  user?: User;
}

export const checkRoles = (requiredRoles: string[]) => (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userRoles = req.user?.roles;

  if (!userRoles) {
    return res.status(403).json({ message: "Access Denied" });
  }

  const hasRoles = requiredRoles.some((role) => userRoles.includes(role));

  if (!hasRoles) {
    return res.status(403).json({ message: "Access Denied" });
  }

  next();
};

