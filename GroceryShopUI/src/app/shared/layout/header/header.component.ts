import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, RouterModule, CommonModule, HttpClientModule, NgChartsModule],
})
export class HeaderComponent {
  @Input() startDate: string | undefined;
  @Input() endDate: string | undefined;
}
