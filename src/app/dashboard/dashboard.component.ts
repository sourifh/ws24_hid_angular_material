import { Component, OnInit } from '@angular/core';
import { DataComponent } from './data/data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { StoreService } from '../shared/store.service';
import { BackendService } from '../shared/backend.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DataComponent, 
    AddDataComponent, 
    ButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  public showForm = true;

  buttonClicked() {
    this.showForm = !this.showForm;
  }
}
