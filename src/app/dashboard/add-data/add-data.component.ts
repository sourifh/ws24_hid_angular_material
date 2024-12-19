import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  // Add these date restriction properties
  maxDate: Date;
  minDate: Date;

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
    // Form-Validation (max, min, required) mithilfe der Library einzubauen.
    // man muss für die Anmeldung mindestens 18 Jahre und max 90 Jahre sein
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 90, today.getMonth(), today.getDate());
  }
  public registrationForm!: FormGroup;
  public showFormError: boolean = false;
  public showSuccessNotification: boolean = false;
  public isSubmitting: boolean = false;

  //Aufgabe:  Können wir eigene Fehlermeldungen setzen?
  // JA, wir können!
  get nameErrorMessage(): string {
    const control = this.registrationForm.get('name');
    if (control?.errors?.['required']) {
      return 'Bitte geben Sie Ihren Namen ein';
    }
    return '';
  }

  get birthdateErrorMessage(): string {
    const control = this.registrationForm.get('birthdate');
    if (control?.errors?.['required']) {
      return 'Bitte wählen Sie Ihr Geburtsdatum aus';
    }
    return '';
  }

  get courseErrorMessage(): string {
    const control = this.registrationForm.get('courseId');
    if (control?.errors?.['required']) {
      return 'Bitte wählen Sie einen Kurs aus';
    }
    return '';
  }

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      courseId: ['', Validators.required],
      birthdate: [null, Validators.required],
      newsletterOptIn: [false] // new form control with default value false
    });

    // Reset form error when form changes
    this.registrationForm.valueChanges.subscribe(() => {
      this.showFormError = false;
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.registrationForm.disable();
      
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage)
        .subscribe({
          next: (response) => {
            this.showSuccessNotification = true;
            setTimeout(() => this.showSuccessNotification = false, 3000);
            this.registrationForm.reset();
            this.registrationForm.enable();
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Registration failed:', error);
            this.registrationForm.enable();
            this.isSubmitting = false;
          }
        });
    } else {
      this.showFormError = true;
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
