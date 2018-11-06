import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../serviços/clientes/cliente.service'
import { Cliente } from '../Classes/cliente';
import { error } from 'selenium-webdriver';
import { CookieService, CookieOptions} from 'angular2-cookie/services';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {


  constructor(private _cookieService:CookieService) { }
  ngOnInit() {
   
  }

 
}
