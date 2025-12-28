import { Component, inject } from '@angular/core';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  imports: [TitleComponent, RouterLink],
  templateUrl: './users.component.html',
  styles: ``,
})
export default class UsersComponent {
  public usersService = inject(UsersService)
  
}
