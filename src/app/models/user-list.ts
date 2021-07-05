import { User } from "./user";
import { UserMiniList } from "./user-mini-list";

export class UserList extends UserMiniList {
    roleId: string;
    roleName: string;

    constructor(user?: User) {
      super();
      if(user) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      }
    }
  }
  