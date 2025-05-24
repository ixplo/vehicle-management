import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
    selector: 'app-user-form',
    standalone: false,
    templateUrl: './user-form.component.html',
    styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    user: User = { username: '', email: '', role: 'User', password: '' };
    isEdit = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.userService.getById(id).subscribe(user => {
                this.user = user;
            });
        }
    }

    save() {
        if (this.isEdit && this.user.id) {
            this.userService.update(this.user.id, this.user).subscribe(() => {
                this.router.navigate(['/users']);
            });
        } else {
            this.userService.create(this.user).subscribe(() => {
                this.router.navigate(['/users']);
            });
        }
    }

    cancel() {
        this.router.navigate(['/users']);
    }
}
