import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (result: any) => {
        const { token, user } = result.data.login;
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
      error: (err) => (this.error = err.message),
    });
  }
}
