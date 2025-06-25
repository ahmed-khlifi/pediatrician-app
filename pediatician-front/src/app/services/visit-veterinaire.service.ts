import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { VisitVeterinaire } from '../models/visit-veterinaire';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisitVeterinaireService {
  constructor(private apollo: Apollo) {}

  getVisits(): Observable<VisitVeterinaire[]> {
    return this.apollo
      .query<{ visitList: VisitVeterinaire[] }>({
        query: gql`
          query {
            visitList {
              id
              date
              description
              pet {
                id
                name
              }
              owner {
                id
                name
                role
              }
              veterinaire {
                id
                name
                role
              }
              prises {
                id
                date
                notes
              }
            }
          }
        `,
      })
      .pipe(map((res) => res.data.visitList));
  }

  getVisitsByUser(userId: number): Observable<VisitVeterinaire[]> {
    return this.apollo
      .query<{ visitsByUser: VisitVeterinaire[] }>({
        query: gql`
          query($userId: ID!) {
            visitsByUser(userId: $userId) {
              id
              date
              description
              pet {
                id
                name
              }
              owner {
                id
                name
                role
              }
              veterinaire {
                id
                name
                role
              }
              prises {
                id
                date
                notes
              }
            }
          }
        `,
        variables: { userId },
      })
      .pipe(map((res) => res.data.visitsByUser));
  }

  createVisit(visit: {
    date: string;
    description?: string;
    petId: number;
    ownerId: number;
    veterinaireId: number;
  }): Observable<VisitVeterinaire> {
    return this.apollo
      .mutate<{ createVisit: VisitVeterinaire }>({
        mutation: gql`
          mutation(
            $date: String!
            $description: String
            $petId: ID!
            $ownerId: ID!
            $veterinaireId: ID!
          ) {
            createVisit(
              date: $date
              description: $description
              petId: $petId
              ownerId: $ownerId
              veterinaireId: $veterinaireId
            ) {
              id
              date
              description
            }
          }
        `,
        variables: { ...visit },
      })
      .pipe(map((res) => res.data!.createVisit));
  }

  deleteVisit(id: number): Observable<{ message: string; id: string }> {
    return this.apollo
      .mutate<{ deleteVisit: { message: string; id: string } }>({
        mutation: gql`
          mutation($id: ID!) {
            deleteVisit(id: $id) {
              message
              id
            }
          }
        `,
        variables: { id },
      })
      .pipe(map((res) => res.data!.deleteVisit));
  }
}
