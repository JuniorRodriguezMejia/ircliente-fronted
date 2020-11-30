import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: AngularFireList<any>;
  selectedCustomer: Customer = new Customer();

  constructor(private firebase: AngularFireDatabase) { }

  getCustomers() {
    return this.customerList = this.firebase.list('customers');
  }

  addCustomer(customer: Customer) {
    this.customerList.push({
      firstname: customer.firstname,
      lastname: customer.lastname,
      birthday: customer.birthday
    });
  }

}
