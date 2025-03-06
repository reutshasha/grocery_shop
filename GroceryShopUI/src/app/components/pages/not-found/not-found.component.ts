import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class NotFoundComponent {

}
