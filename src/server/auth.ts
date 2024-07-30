import "server-only";
import { SignJWT, decodeJwt } from "jose";
import { hashSync, compareSync } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function encryptJWT(user_id: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SIGNING_SECRET);
  const jwt = await new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .setSubject(user_id)
    .sign(secret);
  return jwt;
}

export interface UserSchema {
  id?: string;
  username: string;
  password: string;
}

export async function decodeToken(token: string) {
  return decodeJwt(token);
}

export async function createUser(user: UserSchema) {
  const { username, password } = user;
  if (password.length < 6 || username.length < 2) {
    throw new Error(
      "Username must be at least 2 characters and password must be at least 6 characters"
    );
  }
  const userExists = await checkUserExists(username);
  if (!userExists) {
    const hash = createHash(password);
    await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });
    return true;
  }
  throw new Error("User already exists");
}

export async function login(username: string, password: string) {
  const user = await getUser(username);
  if (user) {
    const isCorrectPassword = compareSync(password, user.password);
    if (!isCorrectPassword) throw new Error("incorrect password");
    const token = encryptJWT(user.id);
    return token;
  }
}

export function createHash(password: string) {
  return hashSync(password, 10);
}

export async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: { username },
  });
  return user;
}

export async function checkUserExists(username: string): Promise<Boolean> {
  const userExists = await prisma.user.findFirst({
    where: { username },
  });
  if (userExists) return true;
  else return false;
}
