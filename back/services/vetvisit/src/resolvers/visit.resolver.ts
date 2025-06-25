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
      return visitRepo.findOne({
        where: { id },
        relations: ["pet", "prises", "owner", "veterinaire"],
      });
    },
    visitList: async () => {
      return visitRepo.find({
        relations: ["pet", "prises", "owner", "veterinaire"],
      });
    },
    visitsByUser: async (_: any, { userId }: { userId: number }) => {
      const user = await userRepo.findOne({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      const role = user.role;

      if (role === "OWNER") {
        return visitRepo.find({
          where: { owner: { id: userId } },
          relations: ["pet", "prises", "owner", "veterinaire"],
        });
      } else if (role === "VETERINAIRE") {
        return visitRepo.find({
          where: { veterinaire: { id: userId } },
          relations: ["pet", "prises", "owner", "veterinaire"],
        });
      } else {
        throw new Error("Invalid role");
      }
    },
  },
  Mutation: {
    createVisit: async (
      _: any,
      {
        date,
        description,
        petId,
        ownerId,
        veterinaireId,
      }: {
        date: string;
        description?: string;
        petId: number;
        ownerId: number;
        veterinaireId: number;
      }
    ) => {
      const pet = await petRepo.findOneBy({ id: petId });
      const owner = await userRepo.findOneBy({ id: ownerId });
      const veterinaire = await userRepo.findOneBy({ id: veterinaireId });

      if (!pet) throw new Error("Pet not found");
      if (!owner) throw new Error("Owner not found");
      if (!veterinaire) throw new Error("Veterinaire not found");

      const visit = visitRepo.create({
        date,
        description,
        pet,
        owner,
        veterinaire,
      });
      return visitRepo.save(visit);
    },
    updateVisit: async (_: any, { id, ...data }: any) => {
      const visit = await visitRepo.findOneBy({ id });
      if (!visit) return null;

      if (data.petId) {
        const pet = await petRepo.findOneBy({ id: data.petId });
        if (!pet) throw new Error("Pet not found");
        data.pet = pet;
      }

      if (data.ownerId) {
        const owner = await userRepo.findOneBy({ id: data.ownerId });
        if (!owner) throw new Error("owner not found");
        data.owner = owner;
      }
      delete data.petId;
      delete data.ownerId;
      await visitRepo.update(id, data);
      return visitRepo.findOne({
        where: { id },
        relations: ["pet", "prises", "owner", "veterinaire"],
      });
    },
    deleteVisit: async (_: any, { id }: any) => {
      const visit = await visitRepo.findOneBy({ id });
      const visitId = visit?.id;
      if (!visit)
        return {
          message: "couldn't find visit",
        };
      await visitRepo.remove(visit);
      return {
        message: "Visit Deleted Successfully",
        id: visitId,
      };
    },
  },
};
