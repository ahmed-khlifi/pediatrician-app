import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apollo = inject(Apollo);
  private router = inject(Router);

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password,
      },
    });
  }
  register(
    name: string,
    email: string,
    password: string,
    role: 'OWNER' | 'VETERINAIRE'
  ) {
    const REGISTER_MUTATION = gql`
      mutation Register(
        $name: String!
        $email: String!
        $password: String!
        $role: Role!
      ) {
        register(name: $name, email: $email, password: $password, role: $role) {
          token
          user {
            id
            name
            email
            role
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: { name, email, password, role },
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
