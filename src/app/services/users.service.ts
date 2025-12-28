import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { UserResponse } from '@interfaces/user-response';
import type { User, UsersResponse } from '@interfaces/users-response';
import { delay, map } from 'rxjs';

interface State{
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject( HttpClient);

  #state = signal<State>({
    loading: true,
    users: [],
  }); 


  public users = computed( () => this.#state().users);
  public loading = computed( () => this.#state().loading);

  constructor(){
    
    this.http.get<UsersResponse>('https://dummyjson.com/users')
      .pipe( delay(1500))
      .subscribe({
        next: (res) => {
          console.log('Response: ', res);
          this.#state.set({
          loading: false,
          users: res.users,
          });
        },
        error: (err) => {
          console.log('Error details:', err);
          this.#state.set({
            loading: false,
            users:[],
          })
        }

      });
  };


  getUserById(id: string){

    return this.http.get<UserResponse>(`https://dummyjson.com/users/${ id }`)
      .pipe(
        delay(1500),
        map(resp => resp) 
      )
  }
}
