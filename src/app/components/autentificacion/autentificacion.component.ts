import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BQAuthService } from '../../Service/bqauth.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../Model/User';
import { OtpRQ } from '../../../Model/OtpRQ';
import { ViewChild } from '@angular/core';
import { OtpValidationRQ } from 'src/Model/OtpValRQ';
import { ProcessService } from 'src/app/Service/process.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientsService } from '../../Service/client.service';
@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.css'],
  providers: [MessageService]
})

export class AutentificacionComponent implements OnInit {
  username!: string;
  password!: string;
  display: boolean = false;
  otpRQ!: OtpRQ;
  otpValRQ!: OtpValidationRQ;
  otpPin!: string;
  user!: User;
  loginForm!: FormGroup;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private bqauthService: BQAuthService,
    private processService: ProcessService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.loginForm= new FormGroup({
      'username': new FormControl(this.username, [
        Validators.required
      ]),
      'password': new FormControl(this.password, [
        Validators.required
      ]),
    });
  }

  send(): void {    
    this.username= this.loginForm.value.username;
    this.password= this.loginForm.value.password;
    const credentials = { username: this.username, password: this.password };
    this.bqauthService.login(credentials).subscribe(
      (res) => {
        console.log('cuenta:' + JSON.stringify(res));
        let account: any = { ...res };        
        sessionStorage.setItem('nombre',account.nombre);
        this.router.navigate(["/system"]);
      },
      (err) => {
        console.log('err ' + JSON.stringify(err));
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.detail,
        });
      }
    );
  }

}
