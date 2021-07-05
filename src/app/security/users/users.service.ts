import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import * as uuid from 'uuid';
import { of } from 'rxjs';
import { UserList } from 'src/app/models/user-list';
import * as _ from 'lodash';
import { RolesService } from '../roles/roles.service';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient,
    private rolesService: RolesService
  ) {
    this.baseRoute = '/api/users'
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseRoute}`
    return this.http.get<User[]>(url);
  }

  // TODO: mejorar esto
  async getUsersList(): Promise<UserList[]> {
    let users = await this.getUsers().toPromise();
    const rolesIds = _.uniqBy(users, 'roleId').map((s: User) => s.roleId);
    let roles = await this.rolesService.getRolesByIds(rolesIds).toPromise();
    let usersList = [];
    _.each(users, (user: User) => {
      let userList = new UserList(user);
      let role = _.find(roles, { 'id': user.roleId });
      userList.roleName = role.name;
      usersList.push(userList);
    });
    return usersList;
  }

  getById(id): Observable<User> {
    const url = `${this.baseRoute}/${id}`
    return this.http.get<User>(url);
  }

  getUsersByEmail(email): Observable<User> {
    const url = `${this.baseRoute}?email=${email}`
    return this.http.get<User>(url);
  }

  getNewUser(): Observable<User> {
    return of<User>(new User());
  }
  
  save(entity: User): Promise<User> {
    return (!entity.id) ? this.create(entity) : this.update(entity);
  }

  create(entity: User): Promise<User> {
    const url = `${this.baseRoute}`;
    entity.id = uuid.v4();
    return this.http.post<User>(url, entity).toPromise();
  }

  update(entity: User): Promise<User> {
    const url = `${this.baseRoute}/${entity.id}`;
    return this.http.put<User>(url, entity).toPromise();
  }

  delete(id: string): Promise<User> {
    console.log(id);
    const url = `${this.baseRoute}/${id}`;
    return this.http.delete<User>(url).toPromise();
  }
}
