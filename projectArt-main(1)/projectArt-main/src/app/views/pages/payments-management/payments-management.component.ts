import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../model/firebase.service';
import { Sale } from '../../../interfaces/sale';

@Component({
  selector: 'app-payments-management',
  templateUrl: './payments-management.component.html',
  styleUrls: ['./payments-management.component.css']
})
export class PaymentsManagementComponent implements OnInit {
  sales: Sale[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.firebaseService.getSales().subscribe((sales: Sale[]) => {
      this.sales = sales;
    });
  }

  updateSaleStatus(saleId: string, status: boolean): void {
    if (status) {
      this.firebaseService.updateSaleStatus(saleId, status).then(() => {
        this.loadSales();
      });
    } else {
      this.firebaseService.deleteSale(saleId).then(() => {
        this.loadSales();
      });
    }
  }
}