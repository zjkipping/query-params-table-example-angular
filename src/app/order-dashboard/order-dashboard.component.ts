import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent {
  constructor(public ordersService: OrdersService) { }
}
