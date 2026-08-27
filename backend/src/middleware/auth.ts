import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export interface AuthUser {
  id: string;
  role: "ADMIN" | "EDITOR" | "READER";
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(user: { id: string; role: string; name: string; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "30d" });
}

async function resolveUser(req: Request): Promise<AuthUser | null> {
  const token = req.cookies?.token;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthUser;
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return null;
    return { id: user.id, role: user.role as AuthUser["role"], name: user.name, email: user.email };
  } catch {
    return null;
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  req.user = (await resolveUser(req)) || undefined;
  next();
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = await resolveUser(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });
  req.user = user;
  next();
}

export function requireRole(...roles: Array<"ADMIN" | "EDITOR" | "READER">) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user || (await resolveUser(req));
    if (!user) return res.status(401).json({ error: "Authentication required" });
    if (!roles.includes(user.role)) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  };
}
