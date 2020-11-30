import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../../../services/customer.service';

import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;

  minDate: string = '1945-11-29';
  maxDate: string = '2020-11-29"';
  

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    this.minDate = (year - 75) + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    this.maxDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  
  }

  onAddCustomer(customerForm: NgForm) {
    if(customerForm != null && customerForm.valid) {
      this.customerService.addCustomer(customerForm.value);
      this.resetForm(customerForm);
      this.btnClose.nativeElement.click();
    }
  }

  resetForm(customerForm: NgForm) {
    if(customerForm != null ) {
      customerForm.reset();
      this.customerService.selectedCustomer = new Customer();
    }
  }

}
