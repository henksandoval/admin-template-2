import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-basic-forms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './basic-forms.component.html',
  styles: [`
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class BasicFormsComponent {
  emailFormControl1 = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl2 = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/showcase']);
  }
}
