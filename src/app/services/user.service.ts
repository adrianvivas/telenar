import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase, ) { }

  getUsers() {
    return this.userList = this.firebase.list('users');
  }

  insertUser(user: User) {
    this.userList.push({
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      contact: user.contact,
      capacity: user.capacity,
      price: user.price
    });
  }

  updateProduct(user: User) {
    this.userList.update(user.$key, {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      contact: user.contact,
      capacity: user.capacity,
      price: user.price
    });
  }

  deleteProduct($key: string) {
    this.userList.remove($key);
  }
  
}
