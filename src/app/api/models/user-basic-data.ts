import { Md5 } from "ts-md5";
import { User } from "./user";

export class UserBasicData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;

    constructor(user?: User) {
      if(user) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      }
    }

    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    profilePicture(): string {
      const size = 128;
      const md5 = new Md5();
      let digest = md5.appendStr(this.email.toLowerCase());
      return `https://www.gravatar.com/avatar/${digest}?d=identicon&s=${size}`;
    }
  }
