export class Transaction {
  order = {
    buyer: {
      merchantBuyerId: '',
      fullName: '',
      emailAddress: '',
      contactPhone: '',
      dniNumber: '',
      shippingAddress: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        phone: '',
      }
    },
    shippingAddress: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: ''
    }
  };
  payer= {
    merchantPayerId: '',
    fullName: '',
    emailAddress: '',
    contactPhone: '',
    dniNumber: '',
    billingAddress: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: ''
    }
  };
  creditCard = {
    number: '',
    securityCode: '',
    expirationDate: '',
    name: '',
  };
  paymentMethod: string;
  paymentCountry: string;
  cookie: string;
  userAgent: string;

  constructor() {}
}

// {
//        "transaction": {
//           "order": {
//              "buyer": {
//                 "merchantBuyerId": "1",
//                 "fullName": "First name and second buyer  name",
//                 "emailAddress": "buyer_test@test.com",
//                 "contactPhone": "7563126",
//                 "dniNumber": "5415668464654",
//                 "shippingAddress": {
//                    "street1": "Viamonte",
//                    "street2": "1366",
//                    "city": "Buenos Aires",
//                    "state": "Buenos Aires",
//                    "country": "AR",
//                    "postalCode": "000000",
//                    "phone": "7563126"
//                 }
//              },
//              "shippingAddress": {
//                 "street1": "Viamonte",
//                 "street2": "1366",
//                 "city": "Buenos Aires",
//                 "state": "Buenos Aires",
//                 "country": "AR",
//                 "postalCode": "0000000",
//                 "phone": "7563126"
//              }
//           },
//           "payer": {
//              "merchantPayerId": "1",
//              "fullName": "First name and second payer name",
//              "emailAddress": "payer_test@test.com",
//              "contactPhone": "7563126",
//              "dniNumber": "5415668464654",
//              "billingAddress": {
//                 "street1": "Avenida entre rios",
//                 "street2": "452",
//                 "city": "Plata",
//                 "state": "Buenos Aires",
//                 "country": "AR",
//                 "postalCode": "64000",
//                 "phone": "7563126"
//              }
//           },
//           "creditCard": {
//              "number": "4850110000000000",
//              "securityCode": "321",
//              "expirationDate": "2014/12",
//              "name": "REJECTED"
//           },
//           "paymentMethod": "VISA",
//           "paymentCountry": "AR",
//           "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
//           "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
//        }
// }
