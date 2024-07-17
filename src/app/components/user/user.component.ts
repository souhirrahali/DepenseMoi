import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | null = null;
  currentPassword = '';
  newPassword = '';

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userEmail = this.authService.currentUserEmail;
    
    if (userEmail) {
      this.userService.getUser(userEmail).subscribe(
        (user: User) => this.user = user,
        (error: any) => console.error('Error fetching user:', error)
      );
    } else {
      console.error('User email is null or undefined');
    }
  }

  updateUser(): void {
    if (this.user && this.authService.currentUserEmail) {
      this.userService.updateUser(this.authService.currentUserEmail, this.user).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
          console.log('User updated successfully');
        },
        (error: any) => console.error('Error updating user:', error)
      );
    } else {
      console.error('User or email is null or undefined');
    }
  }

  changePassword(): void {
    if (this.authService.currentUserEmail) {
      this.userService.changePassword(this.authService.currentUserEmail, this.currentPassword, this.newPassword).subscribe(
        (response: any) => {
          console.log('Password changed successfully');
          this.currentPassword = '';
          this.newPassword = '';
        },
        (error: any) => console.error('Error changing password:', error)
      );
    } else {
      console.error('User email is null or undefined');
    }
  }

  deleteUser(): void {
    if (this.authService.currentUserEmail) {
      this.userService.deleteUser(this.authService.currentUserEmail).subscribe(
        (response: any) => {
          console.log('User deleted successfully');
          this.user = null;
          // You might want to log out the user here
          this.authService.logout();
        },
        (error: any) => console.error('Error deleting user:', error)
      );
    } else {
      console.error('User email is null or undefined');
    }
  }
}