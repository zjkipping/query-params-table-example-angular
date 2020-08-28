import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, pluck, withLatestFrom, switchMap, map, filter, distinctUntilChanged } from 'rxjs/operators';

import { order_data } from './order-data';

export interface Order {
  orderID: number;
  customerID: number;
  customerName: string;
  itemCount: number;
}

export interface TableOptions {
  sortBy: string;
  order: string;
  filter: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private data: Observable<Order[]>;
  orders$: Observable<Order[]>;
  tableOptions$: Observable<TableOptions>;

  constructor(private route: ActivatedRoute) {
    this.data = of(order_data);

    this.tableOptions$ = this.route.queryParams.pipe(
      map(params => {
        return {
          sortBy: params['sortBy'],
          order: params['order'] ? params['order'] : 'asc',
          filter: params['filter']
        }
      })
    );

    this.orders$ = this.tableOptions$.pipe(
      tap(params => console.log(params)),
      withLatestFrom(this.data),
      map(([options, data]: [TableOptions, Order[]]) => {
        const filtered_data = data.filter((order: Order) => {
          const filter = options.filter ? options.filter : '';
          return order.customerName.toLowerCase().startsWith(filter.toLowerCase())
        });
        const sorted_data = filtered_data.sort((a: Order, b: Order) => a[options.sortBy] > b[options.sortBy] ? 1 : -1);
        return options.order === 'asc' ? sorted_data : sorted_data.reverse();
      }),
      tap(orders => console.log(orders))
    )
  }
}
