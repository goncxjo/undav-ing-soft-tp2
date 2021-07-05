import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { UsersService } from './users.service';

@Injectable()
export class GetNewUserResolver implements Resolve<Observable<User>> {

    constructor(
        private service: UsersService
    ) { }

    resolve(): Observable<User> {
        return this.service.getNewUser();
    }
}
