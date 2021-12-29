import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  public userName: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName = (sessionStorage.getItem('nombre')) ? sessionStorage.getItem('nombre') : 'INVITADO';
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

}
