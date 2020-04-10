import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<User>;
  public displayedColumns = ['name', 'lastName', 'location', 'contact', 'capacity', 'price', 'actions']; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .snapshotChanges()
    .subscribe(items => {
      this.userList = [];
      items.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.userList.push(x as User);
      })
    })
  }

  onEdit(user: User){
    this.userService.selectedUser = Object.assign({}, user);
  }

  onDelete($key: string){
    this.userService.deleteUser($key);
  }
}
