import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
    selector: 'app-user-list',
    standalone: false,
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.load();
    }

    load() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }

    delete(id: string) {
        if (confirm('Delete user?')) {
            this.userService.delete(id).subscribe(() => this.load());
        }
    }
}
