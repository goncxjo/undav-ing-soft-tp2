import { Role } from "./role";
import { UserMiniList } from "./user-mini-list";

export class User extends UserMiniList {
    password: string;
    role: Role;
  }
