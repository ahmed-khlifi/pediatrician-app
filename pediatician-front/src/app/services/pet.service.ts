import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private apollo: Apollo) {}
  createPet(pet: {
    name: string;
    type?: string;
    race: string;
    age: number;
    petImage: string;
  }): Observable<Pet> {
    return this.apollo
      .mutate<{ createPet: Pet }>({
        mutation: gql`
          mutation CreatePet(
            $name: String!
            $type: String!
            $race: String!
            $age: Int!
            $petImage: String!
          ) {
            createPet(
              name: $name
              type: $type
              race: $race
              age: $age
              petImage: $petImage
            ) {
              id
              name
              type
              race
              age
              petImage
            }
          }
        `,
        variables: { ...pet },
      })
      .pipe(map((res) => res.data!.createPet));
  }
}
