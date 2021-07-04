import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from './users/users.service';

@Injectable()
export class GetUsersListResolver implements Resolve<Observable<User[]>> {

    constructor(
        private service: UsersService
    ) { }

    resolve() {
        return this.service.getUsers();
    }
}
