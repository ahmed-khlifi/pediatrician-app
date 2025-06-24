import { AppDataSource } from "../config/ormConfig";
import { UserApp } from "../entities/UserApp";

const userRepo = AppDataSource.getRepository(UserApp);

export const userResolver = {
  Query: {
    user: async (_: any, { id }: any) => {
      return userRepo.findOne({ where: { id }, relations: ['pets'] });
    },
    userList: async () => {
      return userRepo.find({ relations: ['pets'] });
    }
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const user = userRepo.create(args);
      return userRepo.save(user);
    },
    updateUser: async (_: any, { id, ...data }: any) => {
      await userRepo.update(id, data);
      return userRepo.findOneBy({ id });
    },
    deleteUser: async (_: any, { id }: any) => {
      const user = await userRepo.findOneBy({ id });
      if (!user) return null;
      await userRepo.remove(user);
      return user;
    }
  }
};