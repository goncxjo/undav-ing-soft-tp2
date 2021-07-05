import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { UserList } from "src/app/models/user-list";
import { UsersService } from './users.service';

@Injectable()
export class GetUsersListResolver implements Resolve<Promise<UserList[]>> {

    constructor(
        private service: UsersService
    ) { }

    resolve(): Promise<UserList[]> {
        return this.service.getUsersList();
    }
}
