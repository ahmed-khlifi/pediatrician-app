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
              }
            }
          }
        `,
      })
      .pipe(map((res) => res.data.visitList));
  }

  getVisitsByOwner(ownerId: number): Observable<VisitVeterinaire[]> {
    return this.apollo
      .query<{ visitsByOwner: VisitVeterinaire[] }>({
        query: gql`
          query($ownerId: ID!) {
            visitsByOwner(ownerId: $ownerId) {
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
              }
            }
          }
        `,
        variables: { ownerId },
      })
      .pipe(map((res) => res.data.visitsByOwner));
  }

  createVisit(visit: {
    date: string;
    description?: string;
    petId: number;
    ownerId: number;
  }): Observable<VisitVeterinaire> {
    return this.apollo
      .mutate<{ createVisit: VisitVeterinaire }>({
        mutation: gql`
          mutation(
            $date: String!
            $description: String
            $petId: Int!
            $ownerId: Int!
          ) {
            createVisit(
              date: $date
              description: $description
              petId: $petId
              ownerId: $ownerId
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

  updateVisit(visit: {
    id: number;
    date?: string;
    description?: string;
    petId?: number;
    ownerId?: number;
  }): Observable<VisitVeterinaire> {
    return this.apollo
      .mutate<{ updateVisit: VisitVeterinaire }>({
        mutation: gql`
          mutation(
            $id: Int!
            $date: String
            $description: String
            $petId: Int
            $ownerId: Int
          ) {
            updateVisit(
              id: $id
              date: $date
              description: $description
              petId: $petId
              ownerId: $ownerId
            ) {
              id
              date
              description
            }
          }
        `,
        variables: { ...visit },
      })
      .pipe(map((res) => res.data!.updateVisit));
  }

  deleteVisit(id: number): Observable<{ message: string; id: number }> {
    return this.apollo
      .mutate<{ deleteVisit: { message: string; id: number } }>({
        mutation: gql`
          mutation($id: Int!) {
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
