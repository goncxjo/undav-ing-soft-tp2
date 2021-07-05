import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../models/role';
import * as uuid from 'uuid';
import { of } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api/roles'
  }

  getRoles(): Observable<Role[]> {
    const url = `${this.baseRoute}`;
    return this.http.get<Role[]>(url);
  }

  getById(id): Observable<Role> {
    const url = `${this.baseRoute}/${id}`;
    return this.http.get<Role>(url);
  }

  getRolesByIds(ids: string[]): Observable<Role[]> {
    const rolesIds = _.map(ids, (id: string) => { return `id=${id}`}).join('&');
    const url = `${this.baseRoute}?${rolesIds}`;
    return this.http.get<Role[]>(url);
  }

  getNewRole(): Observable<Role> {
    return of<Role>({ id: '', name: '', details: ''});
  }
  
  save(entity: Role): Promise<Role> {
    return (!entity.id) ? this.create(entity) : this.update(entity);
  }

  create(entity: Role): Promise<Role> {
    const url = `${this.baseRoute}`;
    entity.id = uuid.v4();
    return this.http.post<Role>(url, entity).toPromise();
  }

  update(entity: Role): Promise<Role> {
    const url = `${this.baseRoute}/${entity.id}`;
    return this.http.put<Role>(url, entity).toPromise();
  }

  delete(id: string): Promise<Role> {
    const url = `${this.baseRoute}/${id}`;
    return this.http.delete<Role>(url).toPromise();
  }
}
