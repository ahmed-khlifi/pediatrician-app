import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitVeterinaire } from '../models/visit-veterinaire';

@Injectable({ providedIn: 'root' })
export class VisitVeterinaireService {
  constructor(private apollo: Apollo) { }

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
                vaccine {
                  id
                  name
                }
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
                petImage
                race
                age
                type
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
                vaccine {
                  id
                  name
                }
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

  getVisitsByPet(petId: number): Observable<VisitVeterinaire[]> {
    return this.apollo
      .query<{ visitsByPet: VisitVeterinaire[] }>({
        query: gql`
          query($petId: ID!) {
            visitsByPet(petId: $petId) {
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
                vaccine {
                  id
                  name
                  description
                }
              }
            }
          }
        `,
        variables: { petId },
      })
      .pipe(map((res) => res.data.visitsByPet));
  }

  getVisitById(id: number): Observable<VisitVeterinaire> {
    return this.apollo
      .query<{ visit: VisitVeterinaire }>({
        query: gql`
          query($id: ID!) {
            visit(id: $id) {
              id
              date
              description
              pet {
                id
                name
                age
                race
                type
                petImage
              }
              owner {
                id
                name
                role
                email
              }
              veterinaire {
                id
                name
                role
                email
              }
              prises {
                id
                date
                notes
              }
            }
          }
        `,
        variables: { id },
      })
      .pipe(map((res) => res.data.visit));
  }

  updateVisit(visit: {
    id: number;
    date?: string;
    description?: string;
    petId?: number;
    ownerId?: number;
    veterinaireId?: number;
  }): Observable<VisitVeterinaire> {
    return this.apollo
      .mutate<{ updateVisit: VisitVeterinaire }>({
        mutation: gql`
          mutation(
            $id: ID!
            $date: String
            $description: String
            $petId: ID
            $ownerId: ID
            $veterinaireId: ID
          ) {
            updateVisit(
              id: $id
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
      .pipe(map((res) => res.data!.updateVisit));
  }
}
