import { gql } from 'apollo-server-express';
import * as fs from 'fs';
import * as path from 'path';

// Résolution absolue du dossier contenant les fichiers .graphql
const schemasDir = path.resolve(__dirname, '../../../../schemas');

const typeDefsArray = fs
  .readdirSync(schemasDir)
  .filter(file => file.endsWith('.graphql'))
  .map(file => fs.readFileSync(path.join(schemasDir, file), 'utf8'));

// Fusionne tous les fichiers .graphql dans une seule définition GraphQL
export const typeDefs = gql`${typeDefsArray.join('\n')}`;