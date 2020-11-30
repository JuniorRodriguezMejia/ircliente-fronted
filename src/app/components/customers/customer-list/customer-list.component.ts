import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../../services/customer.service';

import { Customer } from '../../../models/customer';

import { MathUtils } from '../../../utils/math-utils';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[];
  avg: string = '0';
  stdDev: string = '0';

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
    .snapshotChanges()
    .subscribe(item => {
      let arrayAge = [];

      this.customerList = [];
      item.forEach(element => {
        let x = element.payload.toJSON(); 
        const arrayBirthday = x['birthday'].split('-');
        const today = new Date();
        const birthday = new Date(arrayBirthday[0], arrayBirthday[1] - 1, arrayBirthday[2]);
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() > birthday.getDate())) {
          age--;
        }
        x['$key'] = element.key;
        x['birthday'] = arrayBirthday[2] + '/' + arrayBirthday[1] + '/' + arrayBirthday[0];
        x['age'] = age;
        this.customerList.push(x as Customer);
        arrayAge.push(x['age']);
      })
      this.avg = MathUtils.average(arrayAge).toFixed(1);
      this.stdDev = MathUtils.standardDeviation(arrayAge).toFixed(1);
    });
  }

  onViewCustomer(customer: Customer) {
    let age = customer.age;
    const today = new Date();
    const deathday = new Date(today.getTime() + ((75 - age) * 365 * 24 * 3600 * 1000));
    const year = deathday.getFullYear();
    let month = deathday.getMonth() + 1;
    let day = deathday.getDate();
    
    customer.deathday = (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month)+ '/' + year;
    this.customerService.selectedCustomer = Object.assign({}, customer);
  }

}
