import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare let paypal: any;   

interface Address {
  address: string;
  stateOrProvince: string;
  zipOrPostalCode: string;
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private paypalScript = false;
  public  title = 'WebApplication';
  private orderId = "";
  private generatedToken = "";
  private product1 = {   
    number: 135,
    name: "iPhone 14 Pro",
    price: 899,    
    img: "/assets/iphone14.png"
  } 

  buyer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumb: string;
    addresses: Address[];
  } = {
    firstName: "Michael",
    lastName: "Williams",
    email: "michaelwilliams@gmail.com",
    phoneNumb: "+1 (267) 095-3252",
    addresses: [
      {
        address: '7050 Friendship Rd, Baltimore',
        stateOrProvince: 'Maryland',
        zipOrPostalCode: '21240',
        country: 'US',
      },
      {
        address: '6722 Ritchie Hwy, Glen Burnie',
        stateOrProvince: 'Maryland',
        zipOrPostalCode: '21061',
        country: 'US',
      },
    ],  
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => { 
      if(!this.paypalScript) {
        this.addPaypalScript().then(()=> {
          paypal.Buttons({
            createOrder: (data: any, actions: any) => {
                this.orderId = actions.order.create.fireAndForget.__id__;

                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      "currency_code": "BRL",
                      value: this.product1.price 
                    },
                    payer: {
                      name: {
                        given_name: this.buyer.firstName,
                        surname: this.buyer.lastName
                      },
                      email_address: this.buyer.email,
                      phone: {
                        phone_number: {
                          national_number: this.buyer.phoneNumb
                        }
                      },
                      address: {
                        address_line_1: this.buyer.addresses[0].address,
                        admin_area_2: this.buyer.addresses[0].stateOrProvince,
                        postal_code: this.buyer.addresses[0].zipOrPostalCode,
                        country_code: this.buyer.addresses[0].country
                      }
                    },
                    shipping: {
                      name: {
                        full_name: this.buyer.firstName + " " + this.buyer.lastName
                      },
                      address: {
                        address_line_1: this.buyer.addresses[0].address,
                        admin_area_2: this.buyer.addresses[0].stateOrProvince,
                        postal_code: this.buyer.addresses[0].zipOrPostalCode,
                        country_code: this.buyer.addresses[0].country
                      }
                    }
                  }]
                });
            },
            onApprove: (data: any, actions: any) => {
                return actions.order.capture().then( (details: any) => {
                    alert("Thank you for choosing us for your shopping needs!");
                    alert("The order ID that has been generated is: " + this.orderId);
                });
            }
          }).render('#paypalButton'); 
        }); 
      }
    }, 1);

    this.getAccessToken();
  }

  getProductData(): any {
    return this.product1;
  }

  getBuyerData(): any {
    return this.buyer;
  }

  private addPaypalScript(): any {
    let sandbox: string = ''; //<Sandbox Client ID>
    this.paypalScript = true;

    return new Promise((resolve,reject)=>{
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src = "https://www.paypal.com/sdk/js?client-id=" + sandbox + "&currency=BRL";
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }  

  private getAccessToken(): void {
    const clientId = ''; //YOUR_CLIENT_ID
    const clientSecret = ''; //YOUR_CLIENT_SECRET
    const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) 
    });
    const body = 'grant_type=client_credentials';

    this.http.post(url, body, { headers: headers }).subscribe(
      (response: any) => {
        this.generatedToken = response.access_token;
      },
      (error: any) => {
        console.log(error); 
      }
    );
  }
}  
 

