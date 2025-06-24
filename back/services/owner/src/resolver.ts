import { Owner } from './entity';

export const resolvers = {
    Query: {
        owner: async (_: any, { id }: any, { dataSource }: any) => {
            return dataSource.getRepository(Owner).findOneBy({ id });
        },
        owners: async (_: any, __: any, { dataSource }: any) => {
            return dataSource.getRepository(Owner).find();
        }
    },
    Mutation: {
        createOwner: async (_: any, args: any, { dataSource }: any) => {
            const repo = dataSource.getRepository(Owner);
            const owner = repo.create(args);
            return repo.save(owner);
        }
    }
};