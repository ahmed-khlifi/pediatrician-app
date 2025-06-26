import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.css',
})
export class CredentialsComponent {
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();
}
