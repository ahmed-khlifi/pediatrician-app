import { AppDataSource } from "../config/ormConfig";
import { CreatePriseDto } from "../dto/createPrise.dto";
import { UpdatePriseDto } from "../dto/updatePrise.dto";
import { Prise } from "../entities/Prise";
import { Vaccine } from "../entities/Vaccine";
import { VisitVeterinaire } from "../entities/VisitVeterinaire";

const priseRepository = AppDataSource.getRepository(Prise);

export const priseResolver = {
    Query: {
        prise: async (_: any, { id }: any) => {
            return priseRepository.findOne({ where: { id }, relations: ['vaccine'] });
        },
        priseList: async () => {
            return priseRepository.find({ relations: ['vaccine'] });
        },
    },
    Mutation: {
        createPrise: async (_: any, args: CreatePriseDto) => {
            const { visitId, vaccineId, date, notes } = args;

            const visit = await AppDataSource.getRepository(VisitVeterinaire).findOneBy({ id: visitId });
            if (!visit) throw new Error("Visit not found");
            const vaccine = await AppDataSource.getRepository(Vaccine).findOneBy({ id: vaccineId });
            if (!vaccine) throw new Error("Vaccine not found");


            const prise = priseRepository.create({
                date,
                notes,
                visit,
                vaccine,
            });

            return priseRepository.save(prise);
        },

        updatePrise: async (_: any, { id, date, notes, visitId, vaccineId }: UpdatePriseDto) => {
            const prise = await priseRepository.findOneBy({ id });
            if (!prise) throw new Error('Prise not found');

            if (date !== undefined) prise.date = date;
            if (notes !== undefined) prise.notes = notes;

            if (visitId !== undefined) {
                const visit = await AppDataSource.getRepository(VisitVeterinaire).findOneBy({ id: visitId });
                if (!visit) throw new Error('Visit not found');
                prise.visit = visit;
            }

            if (vaccineId !== undefined) {
                const vaccine = await AppDataSource.getRepository(Vaccine).findOneBy({ id: vaccineId });
                if (!vaccine) throw new Error('Vaccine not found');
                prise.vaccine = vaccine;
            }

            return priseRepository.save(prise);
        },

        deletePrise: async (_: any, { id }: any) => {
            const prise = await priseRepository.findOneBy({ id });
            if (!prise) {
                return {
                    success: false,
                    message: "Prise not found",
                };
            }

            await priseRepository.remove(prise);

            return {
                success: true,
                message: "Prise deleted successfully",
                id: id,
            };
        }


    },
};