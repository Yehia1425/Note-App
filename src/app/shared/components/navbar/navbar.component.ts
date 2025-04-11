import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly router = inject (Router)
  isLogin=input<boolean>(true)
  logout(){
localStorage.removeItem('Token')
this.router.navigate(['/login'])
  }


 
}
