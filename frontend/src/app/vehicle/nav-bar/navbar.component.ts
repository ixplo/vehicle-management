import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
    constructor(public auth: AuthService, private router: Router) {}

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }
    
    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
