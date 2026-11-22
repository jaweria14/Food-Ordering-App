// console.log("AUTH0 AUDIENCE:", process.env.AUTH0_AUDIENCE);
// console.log("AUTH0 ISSUER:", process.env.AUTH0_ISSUER_BASE_URL);
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
 import jwt from "jsonwebtoken";
  import User from "../model/user.ts";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

const expectedAudience = process.env.AUTH0_AUDIENCE?.trim();

// console.log(
//   "Expected audience:",
//   JSON.stringify(expectedAudience)
// );

export const jwtCheck = auth({
  audience: expectedAudience,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL?.trim(),
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};