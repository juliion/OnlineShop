import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  loguot($event: Event) {
    $event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', '/login']);
  }
}
