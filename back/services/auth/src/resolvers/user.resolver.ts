import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/ormconfig";
import { UserApp } from "../entities/UserApp";

const userRepo = AppDataSource.getRepository(UserApp);

const JWT_SECRET = "L2tUZocnBytcOvxbaNJMTQlbs6ELwuW8";

function generateToken(user: UserApp) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export const authResolver = {
  Query: {
    user: async (_: any, { id }: any) => {
      return userRepo.findOne({ where: { id }});
    },
    userList: async () => {
      return userRepo.find();
    },
  },
  Mutation: {
    register: async (_: any, { name, email, password, role }: any) => {
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await hash(password, 10);
      const user = userRepo.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      const savedUser = await userRepo.save(user);
      const token = generateToken(savedUser);

      return {
        token,
        user: savedUser,
      };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await userRepo.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      const valid = await compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};
