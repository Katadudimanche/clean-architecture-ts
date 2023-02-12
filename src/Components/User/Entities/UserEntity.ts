import IEntity from '../../../ComponentInterfaces/Entity/IEntity';

export default class UserEntity implements IEntity {
  id?: any;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;

  constructor(
    email: string,
    password: string,
    id?: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
    address?: string
  ) {
    this.id = id ? id : undefined;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.address = address;
  }

  getId() {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  checkPassword(passwordToCheck: string) {
    return this.password === passwordToCheck;
  }
}
