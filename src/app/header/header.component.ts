import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public title: string = 'Active Together';
  public imagePath: string = "./../assets/images/sport.jpeg";
  public isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = ! this.isMenuOpen;
  }
}
