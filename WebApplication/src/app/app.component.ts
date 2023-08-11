import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  }

  title = 'WebApplication';
  private product1 = {
    number: 135,
    name: "iPhone 14 Pro",
    price: 899,
    img: "/assets/iphone14.png"
  }
  private buyer = {
    firstName: "Michael",
    lastName: "Williams",
    email: "michaelwilliams@gmail.com",
    phoneNumb: "+1 (267) 095-3252",

    address1: "7050 Friendship Rd, Baltimore",
    stateOrProvince1: "Maryland",
    zipOrPostalCode1: "MD 21240",
    country1: "United States",

    address2: "6722 Ritchie Hwy, Glen Burnie",
    stateOrProvince2: "Maryland",
    zipOrPostalCode2: "MD 21061",
    country2: "United States"
  }

  getProductData(): any {
    return this.product1;
  }

  getBuyerData(): any {
    return this.buyer;
  }

  submitForm(): void {
    this.buyer.firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    this.buyer.lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    this.buyer.email = (<HTMLInputElement>document.getElementById("email")).value;
    this.buyer.phoneNumb = (<HTMLInputElement>document.getElementById("phone")).value;
  
    this.buyer.address1 = (<HTMLInputElement>document.getElementById("address1")).value;
    this.buyer.stateOrProvince1 = (<HTMLInputElement>document.getElementById("state1")).value;
    this.buyer.zipOrPostalCode1 = (<HTMLInputElement>document.getElementById("zip1")).value;
    this.buyer.country1 = (<HTMLInputElement>document.getElementById("country1")).value;
  
    this.buyer.address2 = (<HTMLInputElement>document.getElementById("address2")).value;
    this.buyer.stateOrProvince2 = (<HTMLInputElement>document.getElementById("state2")).value;
    this.buyer.zipOrPostalCode2 = (<HTMLInputElement>document.getElementById("zip2")).value;
    this.buyer.country2 = (<HTMLInputElement>document.getElementById("country2")).value;
  }

}
