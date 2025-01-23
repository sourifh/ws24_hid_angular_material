import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

/**
 * Component for displaying and managing course data and registrations
 * Provides functionality for viewing courses, managing registrations and pagination
 */
@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  /** Current page number for pagination */
  public page: number = 0;

  /** Set to track which registration items are currently being deleted */
  public loadingDeletions: Set<number> = new Set();

  /**
   * Handles page selection in the pagination
   * @param i - The page number to select
   */
  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  /**
   * Deletes a registration and updates the view
   * @param registrationId - The ID of the registration to delete
   */
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

  /**
   * Checks if a specific registration is currently being deleted
   * @param registrationId - The ID of the registration to check
   * @returns boolean indicating if the registration is being deleted
   */
  isDeleting(registrationId: number): boolean {
    return this.loadingDeletions.has(registrationId);
  }

  /**
   * Calculates and returns an array of page numbers for pagination
   * @returns Array of numbers representing available pages
   */
  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
        res.push(i + 1);
      }
    return res;
  }

}
