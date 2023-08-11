import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare let paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private paypalScript = false;
  public title = 'WebApplication';
  private orderId = "";
  private generatedToken = "";
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
    zipOrPostalCode1: "21240",
    country1: "United States",

    address2: "6722 Ritchie Hwy, Glen Burnie",
    stateOrProvince2: "Maryland",
    zipOrPostalCode2: "21061",
    country2: "United States"
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => { 
      if(!this.paypalScript) {
        this.addPaypalScript().then(()=> {
           paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              this.orderId = actions.order.create.fireAndForget.__id__;
              console.log(this.orderId);
                return actions.order.create({
                  purchase_units: [{
                    amount: {
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
                        address_line_1: this.buyer.address1,
                        admin_area_2: this.buyer.stateOrProvince1,
                        postal_code: this.buyer.zipOrPostalCode1,
                        country_code: this.buyer.country1
                      }
                    },
                    shipping: {
                      name: {
                        full_name: this.buyer.firstName + " " + this.buyer.lastName
                      },
                      address: {
                        address_line_1: this.buyer.address1,
                        admin_area_2: this.buyer.stateOrProvince1,
                        postal_code: this.buyer.zipOrPostalCode1,
                        country_code: this.buyer.country1
                      }
                    }
                  }]
                });
            },
            onApprove: (data: any, actions: any) => {
                return actions.order.capture().then( (details: any) => {
                    alert("Thank you for choosing us for your shopping needs!");
                    alert("The order ID that has been generated is" + this.orderId);
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

  private addPaypalScript(): any {
    let sandbox: string = ''; //<Sandbox Client ID>
    
    this.paypalScript = true;
    return new Promise((resolve,reject)=>{
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src= "https://www.paypal.com/sdk/js?client-id="+sandbox;
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
        console.error(error); 
      }
    );
  }

}  


