import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "src/app/models/user";
import { UsersService } from "./users.service";

@Injectable()
export class GetUserResolver implements Resolve<Observable<User>> {

    constructor(
        private service: UsersService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot
      ): Observable<User> {
        return this.service.getById(route.paramMap.get('id'));
    }
}
