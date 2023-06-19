import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  menuOpen = false;

  toggleMenu() {
      this.menuOpen = !this.menuOpen;
      console.log("CLICKED")
  }
}
