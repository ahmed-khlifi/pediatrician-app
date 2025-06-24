import { AppDataSource } from "../config/ormConfig";
import { Pet } from "../entities/Pet";
import { UserApp } from "../entities/UserApp";
import { VisitVeterinaire } from "../entities/VisitVeterinaire";

const visitRepo = AppDataSource.getRepository(VisitVeterinaire);
const petRepo = AppDataSource.getRepository(Pet);
const userRepo = AppDataSource.getRepository(UserApp);

export const visitResolver = {
  Query: {
    visit: async (_: any, { id }: any) => {
      return visitRepo.findOne({ where: { id }, relations: ['pet', 'prises','owner'] });
    },
    visitList: async () => {
      return visitRepo.find({ relations: ['pet', 'prises','owner'] });
    }
  },
  Mutation: {
    createVisit: async (_: any, { date, description, petId,ownerId }: any) => {
      const pet = await petRepo.findOneBy({ id: petId });
      if (!pet) throw new Error('Pet not found');
      const owner = await userRepo.findOneBy({id:ownerId})
      if(!owner) throw new Error('User not found !');
      const visit = visitRepo.create({ date, description, pet,owner });
      return visitRepo.save(visit);
    },
    updateVisit: async (_: any, { id, ...data }: any) => {
      const visit = await visitRepo.findOneBy({ id });
      if (!visit) return null;

      if (data.petId) {
        const pet = await petRepo.findOneBy({ id: data.petId });
        if (!pet) throw new Error('Pet not found');
        data.pet = pet;
      }

      if (data.ownerId) {
        const owner = await userRepo.findOneBy({ id: data.ownerId });
        if (!owner) throw new Error('owner not found');
        data.owner = owner;
      }

      await visitRepo.update(id, data);
      return visitRepo.findOne({ where: { id }, relations: ['pet', 'prises'] });
    },
    deleteVisit: async (_: any, { id }: any) => {
      const visit = await visitRepo.findOneBy({ id });
      if (!visit) return null;
      await visitRepo.remove(visit);
      return visit;
    }
  }
};