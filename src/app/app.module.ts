import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';

const routes: Routes = [
  { path: '', component: OrderDashboardComponent},
];

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent, OrderSearchComponent, OrderListComponent, OrderDashboardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
