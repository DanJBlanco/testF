import { Transaction } from './../../models/transaction';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Suscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  suscriptor: Suscriptor;
  plan: Plan;
  tamano: Tamano;
  frecuencia: Frecuencia;

  tipoDoc: Array<any>;
  datosPago: any;
  emailConfirmacion: string;
  tarjetas: Array<any>;
  mensajeError: string;
  transaction: Transaction;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.suscriptor = new Suscriptor();
    this.plan = new Plan();
    this.tamano = new Tamano();
    this.frecuencia = new Frecuencia();

    this.datosPago = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      celular: '',
      tipoDocumento: '',
      numeroDocumento: '',
      tarjeta: '',
      nombreTarjeta: '',
      tipoDocumentoTarjeta: '',
      numeroDocumentoTarjeta: '',
      numeroTarjeta: '',
      codigoSeguridad: '',
      fechaVencimiento: '',
      cuotas: '',
      celularTarjeta: '',
    };
    this.tipoDoc = ['Cedula Colombiana', 'Cedula de Extranjeria', 'Pasaporte'];
    this.tarjetas = [
      { _id: 1, nombre: 'visa' },
      { _id: 2, nombre: 'mastercard' },
      { _id: 3, nombre: 'american' },
      { _id: 4, nombre: 'colpatria' },
      { _id: 5, nombre: 'other1' }
    ];
    this.emailConfirmacion = '';
    this.mensajeError = '';
    if (localStorage.getItem('suscriptor') &&
    localStorage.getItem('plan') &&
    localStorage.getItem('tamano') &&
    localStorage.getItem('frecuencia')) {
      // console.log('Informaciond el local storage');
      this.suscriptor = JSON.parse(localStorage.getItem('suscriptor'));
      this.plan = JSON.parse(localStorage.getItem('plan'));
      this.tamano = JSON.parse(localStorage.getItem('tamano'));
      this.frecuencia = JSON.parse(localStorage.getItem('frecuencia'));
      this.datosPago.nombre = this.suscriptor.nombre;
      this.datosPago.telefono = this.suscriptor.tel;
    } else {
      this.router.navigate(['subscription/plan'], {});
    }
    this.transaction = new Transaction();
    // this.transaction.order.buyer.fullName='fa';
    // console.log('Datos Transaction', this.transaction.order['buyer'].buyer.fullName);
    // console.log('Datos Transaction', this.transaction);
  }

  ngOnInit() {

  }

  goToSummary() {
    if (
      this.validarString(this.datosPago.nombre) &&
      this.validarString(this.datosPago.apellidos) &&
      this.validarEmail(this.datosPago.email, this.emailConfirmacion) &&
      this.validarNumber(this.datosPago.telefono) &&
      this.validarNumber(this.datosPago.celular) &&
      this.validarNumber(this.datosPago.numeroDocumento) &&
      this.validarString(this.datosPago.tipoDocumento) &&
      this.validarString(this.datosPago.tarjeta) &&
      this.validarString(this.datosPago.nombreTarjeta) &&
      this.validarString(this.datosPago.tipoDocumentoTarjeta) &&
      this.validarString(this.datosPago.numeroDocumentoTarjeta) &&
      this.validarString(this.datosPago.numeroTarjeta) &&
      this.validarString(this.datosPago.codigoSeguridad) &&
      this.validarString(this.datosPago.fechaVencimiento) &&
      this.validarString(this.datosPago.cuotas) &&
      this.validarString(this.datosPago.celularTarjeta)
    ) {
      this.mensajeError = '';
      // {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
      // this.router.navigate(['----'], {
      //   queryParams: {
      //     nombre: this.datosPago['nombre'],
      //     apellidos: this.datosPago['apellidos'],
      //     email: this.datosPago['email'],
      //     telefono: this.datosPago['telefono'],
      //     celular: this.datosPago['celular'],
      //     tipoDocumento: this.datosPago['tipoDocumento'],
      //     numeroDocumento: this.datosPago['numeroDocumento'],
      //     tarjeta: tarjetas._id =this.datosPago['tarjetaId']
      //   }
      // });
      // this.transaction.order.buyer.fullName = this.datosPago.nombre + ' ' + this.datosPago.apellidos;
      this.llenarJsonTransaction();
      console.log('Datos Transaction', JSON.stringify(this.transaction));
      console.log('Datos Validados Correctamente', JSON.stringify(this.datosPago));

      console.log(this.datosPago);
    } else {
      this.mensajeError = 'Debe completar todos los datos';
    }
  }
  llenarJsonTransaction() {
    this.transaction.order.buyer.merchantBuyerId = '1';
    this.transaction.order.buyer.fullName = this.datosPago.nombre + ' ' + this.datosPago.apellidos;
    this.transaction.order.buyer.emailAddress = this.datosPago.email;
    this.transaction.order.buyer.contactPhone = this.datosPago.telefono;
    this.transaction.order.buyer.dniNumber = this.datosPago.numeroDocumento;
    this.transaction.order.buyer.shippingAddress.street1 = this.suscriptor.direccion;
    this.transaction.order.buyer.shippingAddress.street2 = '';
    this.transaction.order.buyer.shippingAddress.city = this.suscriptor.ciudad;
    this.transaction.order.buyer.shippingAddress.state = 'Departamento';
    this.transaction.order.buyer.shippingAddress.country = 'Colombia';
    this.transaction.order.buyer.shippingAddress.postalCode = 'XXX';
    this.transaction.order.shippingAddress.phone = this.datosPago.telefono;
    this.transaction.order.shippingAddress.street1 = this.suscriptor.direccion;
    this.transaction.order.shippingAddress.street2 = '';
    this.transaction.order.shippingAddress.city = this.suscriptor.ciudad;
    this.transaction.order.shippingAddress.state = 'Departamento';
    this.transaction.order.shippingAddress.country = 'Colombia';
    this.transaction.order.shippingAddress.postalCode = 'XXX';
    this.transaction.order.shippingAddress.phone = this.datosPago.telefono;
    this.transaction.payer.merchantPayerId = '1';
    this.transaction.payer.fullName = this.datosPago.nombreTarjeta;
    this.transaction.payer.emailAddress = this.datosPago.email;
    this.transaction.payer.contactPhone = this.datosPago.celularTarjeta;
    this.transaction.payer.dniNumber = this.datosPago.numeroDocumentoTarjeta;
    this.transaction.payer.billingAddress.street1 = this.suscriptor.direccion;
    this.transaction.payer.billingAddress.street2 = '';
    this.transaction.payer.billingAddress.city = this.suscriptor.ciudad;
    this.transaction.payer.billingAddress.state = 'Departamento';
    this.transaction.payer.billingAddress.country = 'Colombia';
    this.transaction.payer.billingAddress.postalCode = 'XXX';
    this.transaction.payer.billingAddress.phone = this.datosPago.celularTarjeta;
    this.transaction.creditCard.number = this.datosPago.numeroTarjeta;
    this.transaction.creditCard.securityCode = this.datosPago.codigoSeguridad;
    this.transaction.creditCard.expirationDate = this.datosPago.fechaVencimiento;
    this.transaction.creditCard.name = this.datosPago.nombreTarjeta;
    this.transaction.paymentMethod = this.datosPago.tarjeta;
    this.transaction.paymentCountry = 'Colombia';
    this.transaction.cookie = 'Cookie!!';
    this.transaction.userAgent = 'UserAgent!!';

  }

  validarString(texto: string) {
    console.log(texto);
    console.log(texto !== '');
    return texto !== '';

  }
  validarNumber(numero) {
    // console.log(!isNaN(numero) && numero !== '');
    // console.log(numero !== '' + ' {{{{{{ ¿ ' + Number.isNaN(numero) );
    // return numero !== '' && isNaN(numero);
    return !isNaN(numero) && numero !== '';
  }
  validarEmail(email1: string, email2: string) {
    // console.log(email1 + '¿----¿  ' + email2);
    // console.log('igualdad de emails: ');
    if (this.validarString(email1) && this.validarString(email2)) {
      // console.log('email no vacios');
      return email1 === email2;
    }
    return false;
  }
  addCard(nombreTarjeta: string) {
    this.datosPago['tarjeta'] = nombreTarjeta;
    // console.log(nombreTarjeta);
    // console.log(this.tarjetas[0].nombre);
    // console.log(this.datosPago.tarjeta);
    // console.log(this.tarjetas[0].nombre == this.datosPago.tarjeta);
  }
}
