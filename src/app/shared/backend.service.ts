import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';
import { Observable } from 'rxjs';

/**
 * Service handling all backend communication for courses and registrations
 * Manages data fetching, creation and deletion operations
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  /**
   * Fetches all courses with their event locations
   * Updates the store service with the retrieved data
   */
  public getCourses() {
      this.http.get<Course[]>('http://localhost:5000/courses?_expand=eventLocation').subscribe(data => {
        this.storeService.courses = data;
        this.storeService.cousesLoading = false;
      });
  }

  /**
   * Retrieves paginated registration data
   * @param page - The page number to fetch
   * Updates store service with registrations and total count
   */
  public getRegistrations(page: number) {

    const options = {
      observe: 'response' as const,
      transferCache: {
        includeHeaders: ['X-Total-Count']
      }
    };

    this.http.get<Registration[]>(`http://localhost:5000/registrations?_expand=course&_page=${page}&_limit=2`, options).subscribe(data => {
      this.storeService.registrations = data.body!;
      this.storeService.registrationTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.registrationsLoading = false;
    });
  }

  /**
   * Adds a new course registration to the system
   * @param registration - The registration data to add
   * @param currentPage - Current page number for refresh
   * @returns Observable of the post request
   */
  public addRegistration(registration: any, currentPage: number): Observable<any> {
    return this.http.post('http://localhost:5000/registrations', registration);
  }

  /**
   * Deletes a course registration from the system
   * @param registrationId - ID of the registration to delete
   * @returns Observable of the delete request
   */
  public deleteRegistration(registrationId: number): Observable<any> {
    return this.http.delete(`http://localhost:5000/registrations/${registrationId}`);
  }
}
