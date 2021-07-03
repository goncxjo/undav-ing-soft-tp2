import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../api/models/Role';
import { RolesService } from '../api/services/roles.service';

@Injectable()
export class GetRoleResolver implements Resolve<Observable<Role>> {

    constructor(
        private service: RolesService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot
      ): Observable<Role> {
        return this.service.getById(route.paramMap.get('id'));
    }
}
