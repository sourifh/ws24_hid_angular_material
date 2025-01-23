import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  public page: number = 0;
  public loadingDeletions: Set<number> = new Set();

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  deleteRegistration(registrationId: number): void {
    this.loadingDeletions.add(registrationId);
    this.backendService.deleteRegistration(registrationId).subscribe({
      next: () => {
        // Refresh the registrations list after successful deletion
        this.backendService.getRegistrations(this.storeService.currentPage);
        this.loadingDeletions.delete(registrationId);
      },
      error: (error) => {
        console.error('Error deleting registration:', error);
        this.loadingDeletions.delete(registrationId);
      }
    });
  }

  isDeleting(registrationId: number): boolean {
    return this.loadingDeletions.has(registrationId);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
        res.push(i + 1);
      }
    return res;
  }

}
