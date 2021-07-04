import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';
import { RolesService } from './roles/roles.service';

@Injectable()
export class GetNewRoleResolver implements Resolve<Observable<Role>> {

    constructor(
        private service: RolesService
    ) { }

    resolve(): Observable<Role> {
        return this.service.getNewRole();
    }
}
