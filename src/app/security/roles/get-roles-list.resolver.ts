import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from "src/app/models/role";
import { RolesService } from "./roles.service";

@Injectable()
export class GetRolesListResolver implements Resolve<Observable<Role[]>> {

    constructor(
        private service: RolesService
    ) { }

    resolve() {
        return this.service.getRoles();
    }
}
