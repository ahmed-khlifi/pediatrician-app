import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
  name = '';
  email = '';
  password = '';
  role: 'OWNER' | 'VETERINAIRE' = 'OWNER';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService
      .register(this.name, this.email, this.password, this.role)
      .subscribe({
        next: (result: any) => {
          const { token, user } = result.data.register;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          switch (user.role) {
            case 'OWNER':
              this.router.navigate(['/home/owner', user.name]);
              break;
            case 'VETERINAIRE':
              this.router.navigate(['/home/veterinaire', user.name]);
              break;
            default:
              this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.error = err.message;
        },
      });
  }
}
