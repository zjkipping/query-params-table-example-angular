import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Order, TableOptions } from '../orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @Input() orders: Order[];
  @Input() options: TableOptions;

  constructor(private router: Router) { }

  changeSortBy(sortBy: string) {
    if (this.options.sortBy === sortBy) {
      this.changeOrdering();
    } else {
      const queryParams = { ...this.options, sortBy, order: undefined };
      this.router.navigate([], { queryParams });
    }
  }

  changeOrdering() {
    const order = this.options.order === 'asc' ? 'desc' : 'asc';
    const queryParams = { ...this.options, order };
    this.router.navigate([], { queryParams });
  }
}
