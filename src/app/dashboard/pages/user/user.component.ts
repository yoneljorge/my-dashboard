import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [TitleComponent],
  template:`
    <app-title [title]="titleLabel()"></app-title>

    @if(user()){
      <section>
        <img 
        [srcset]="user()?.image"
        [alt]="user()?.firstName"
        >

        <div>
          <h3>{{user()?.firstName}} {{user()?.lastName}}</h3>
          <p>{{user()?.email}}</p> 
        </div>
      </section>
    } @else {
      <p>Cargando información</p>
    }
  `
})
export default class UserComponent {

  private route = inject( ActivatedRoute);
  private usersService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) =>  this.usersService.getUserById(id) )
    )
  )

  public titleLabel = computed( () => {

    if(this.user()){
      return `Información del usuario: ${this.user()?.firstName} ${this.user()?.lastName}`
    }

    return 'Información del usuario'
  })
}
