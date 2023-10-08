import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userEmail: string | null = null;
  public menuItems: MenuItem[] = [];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home'
      },
      {
        label: 'Quien soy',
        icon: 'pi pi-heart',
        routerLink: 'about'
      },
      {
        label: 'Juegos',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Ahorcado',
            icon: 'pi pi-code',
            routerLink: 'ahorcado',

          },
          {
            label: 'Mayor o Menor',
            icon: 'pi pi-sort-alt',
            routerLink: 'mayor'
          },
          {
            label: 'Preguntados',
            icon: 'pi pi-question',
            routerLink: 'preguntados'
          },
          {
            label: 'Propio',
            icon: 'pi pi-prime',
            routerLink: 'propio'
          },
        ]
      },
      {
        label: 'Chat',
        icon: 'pi pi-comments',
        routerLink: 'chat'
      }
    ];
  }

  logout() {
    this.auth.logout();
  }

  getUser() {
    this.auth.getUserEmail()
      .subscribe(email => {
        this.userEmail = this.userEmail != null ? null : email;
      });
  }
}
