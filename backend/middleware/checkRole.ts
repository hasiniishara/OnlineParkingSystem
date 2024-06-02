import { Request, Response, NextFunction } from 'express';

// Define a type for the User object, assuming it has an id and roles property
interface User {
  id: string;
  roles: string[];
}

// Extend the Express Request interface to include the user property
interface RequestWithUser extends Request {
  user?: User;
}

const checkRoles = (requiredRoles: string[]) => (req: RequestWithUser, res: Response, next: NextFunction) => {
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

export default checkRoles;
