import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public form: Array<any> = [
    {value:"Nombre", type:"text"},
    {value:"Apellidos", type:"text"},
    {value:"Ubicación", type:"text"},
    {value:"Contacto", type:"number"},
    {value:"Capacidad (Mb)", type:"number"},
    {value:"Precio", type:"number"}
  ];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this.resetForm();
  }

  onSubmit(userForm: NgForm){
    if(userForm.value.$key == null){
      this.userService.insertUser(userForm.value);
    }
    else{
      this.userService.updateUser(userForm.value);
    }
    this.resetForm(userForm);
  }

  resetForm(userForm?: NgForm){
    if(userForm != null){
      userForm.reset();
      this.userService.selectedUser = new User();
    }
  }
}
