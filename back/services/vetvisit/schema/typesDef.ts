import { gql } from 'apollo-server-express';
import * as fs from 'fs';

export const typeDefs = gql`
  ${fs.readFileSync('../../../schemas/user.graphql', 'utf8')}
  ${fs.readFileSync('../../../schemas/pet.graphql', 'utf8')}
  ${fs.readFileSync('../../../schemas/visit.graphql', 'utf8')}
  ${fs.readFileSync('../../../schemas/vaccine.graphql', 'utf8')}
  ${fs.readFileSync('../../../schemas/prise.graphql', 'utf8')}
`;