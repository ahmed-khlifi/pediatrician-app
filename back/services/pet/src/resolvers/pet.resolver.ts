import { AppDataSource } from "../config/ormConfig";
import { Pet } from "../entities/Pet";

const petRepo = AppDataSource.getRepository(Pet);

export const petResolver = {
  Query: {
    pet: async (_: any, { id }: any) => {
      return petRepo.findOne({
        where: { id },
        relations: ['visits']
      });
    },
    petList: async () => {
      return petRepo.find({ relations: ['visits'] });
    }
  },
  Mutation: {
    createPet: async (_: any, args: any) => {
      const pet = petRepo.create(args);
      return petRepo.save(pet);
    },
    updatePet: async (_: any, { id, ...data }: any) => {
      await petRepo.update(id, data);
      return petRepo.findOneBy({ id });
    },
    deletePet: async (_: any, { id }: any) => {
      const pet = await petRepo.findOneBy({ id });
      if (!pet) return null;
      await petRepo.remove(pet);
      return pet;
    }
  }
};
