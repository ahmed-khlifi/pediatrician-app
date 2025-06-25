import { AppDataSource } from "../config/ormConfig";
import { Vaccine } from "../entities/Vaccine";

const vaccineRepository = AppDataSource.getRepository(Vaccine);

export const vaccineResolver = {
    Query: {
        vaccine: async (_: any, { id }: any) => {
            return vaccineRepository.findOne({ where: { id }, relations: ['prises'] });
        },
        vaccineList: async () => {
            return vaccineRepository.find({ relations: ['prises'] });
        },
    },
    Mutation: {
        createVaccine: async (_: any, args: any) => {
            const vaccine = vaccineRepository.create(args);
            return vaccineRepository.save(vaccine);
        },
        updateVaccine: async (_: any, { id, ...data }: any) => {
            await vaccineRepository.update(id, data);
            return vaccineRepository.findOneBy({ id });
        },
        deleteVaccine: async (_: any, { id }: any) => {
            const vaccine = await vaccineRepository.findOneBy({ id });
            if (!vaccine) return null;
            await vaccineRepository.remove(vaccine);
            return vaccine;
        },
    },
};