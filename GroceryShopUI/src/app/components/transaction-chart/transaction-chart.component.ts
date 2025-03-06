import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BehaviorSubject, Subject, catchError, switchMap, tap, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { SnackBarUtil } from '../../shared/utilities/snack-bar.util';
import { GroceryTransaction } from '../../shared/models/GroceryTransaction';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NgChartsModule, HeaderComponent, FooterComponent],
})
export class TransactionChartComponent implements OnInit {
  private apiService = inject(ApiService);
  private snackBar = inject(SnackBarUtil);
  private destroy$ = new Subject<void>();

  startDate: string = this.formatDateToInput(new Date('2021-06-01'));
  endDate: string = this.formatDateToInput(new Date('2021-12-31'));

  headerStartDate: string = this.formatDateToInput(new Date('2021-06-01'));
  headerEndDate: string = this.formatDateToInput(new Date('2021-12-31'));

  private dateRange$ = new BehaviorSubject<{ startDate: string; endDate: string }>({
    startDate: this.startDate,
    endDate: this.endDate,
  });


  transactions$ = this.dateRange$.pipe(
    switchMap(({ startDate, endDate }) =>
      this.apiService.getTransactionsByDateRange(this.formatDate(startDate), this.formatDate(endDate)).pipe(
        tap((response: any) => {
          const transactions = response?.data || [];
          this.updateChart(transactions);
          this.snackBar.show(transactions.length > 0 ? 'Transactions loaded successfully!' : 'No transactions found.');
        }),
        catchError(() => {
          this.snackBar.show('Error fetching transactions', SnackBarUtil.Duration.LONG);
          return of([]);
        })
      )
    )
  );

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Income', data: [], borderColor: 'red', fill: false },
      { label: 'Outcome', data: [], borderColor: 'blue', fill: false },
      { label: 'Revenue', data: [], borderColor: 'green', fill: false },
    ],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.headerStartDate = this.formatDateToInput(new Date('2021-06-01'));
    this.headerEndDate = this.formatDateToInput(new Date('2021-12-31'));
    this.dateRange$.next({ startDate: this.startDate, endDate: this.endDate });
  }

  updateChart(transactions: GroceryTransaction[]): void {
    this.chartData.labels = transactions.map((t) => new Date(t.transactionDate).toLocaleDateString());
    this.chartData.datasets[0].data = transactions.map((t) => t.income);
    this.chartData.datasets[1].data = transactions.map((t) => t.outcome);
    this.chartData.datasets[2].data = transactions.map((t) => t.revenue);
  }

  formatDateToInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

}