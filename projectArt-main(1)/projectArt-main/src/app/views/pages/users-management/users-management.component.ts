import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../model/firebase.service';
import { User } from '../../../interfaces/user.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.firebaseService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  saveUser(): void {
    if (this.selectedUser) {
      this.firebaseService.updateUser(this.selectedUser).then(() => {
        this.selectedUser = null;
        this.loadUsers();
      });
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
  }

  deleteUser(userId: string): void {
    this.firebaseService.deleteUser(userId).then(() => {
      this.loadUsers();
    });
  }
}