import { Role } from "./role";
import { UserMiniList } from "./user-mini-list";

export class User extends UserMiniList {
    password: string;
    roleId: string;

    constructor() {
      super();
      this.id = '';
      this.firstName = '';
      this.lastName = '';
      this.password = '';
      this.roleId = '';
    }
  }
