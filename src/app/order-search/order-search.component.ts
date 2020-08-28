import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TableOptions } from '../orders.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {
  @Input() options: TableOptions;

  searchForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      filter: [this.options.filter, Validators.required]
    })

    this.searchForm.controls['filter'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(filter => console.log(filter))
    ).subscribe((filter: string) => {
      const queryParams = { ...this.options, filter: filter ? filter : undefined }
      this.router.navigate([], { queryParams })
    });
  }
}
