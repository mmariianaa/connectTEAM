import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  isLogin: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertita: AlertController,
    private router: Router,
    private authService: Auth
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit() {}

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  // Validación personalizada para confirmar contraseña
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const data = { email, password };

      this.authService.login(data).subscribe(
        (res: any) => {
          if (res.intResponse === '200') {
            this.mostrarAlerta('Login Exitoso', '', '¡Bienvenido de nuevo!');
          } else {
            this.mostrarError('Error de Login', '', 'Correo o contraseña incorrectos.');
          }
        },
        error => {
          this.mostrarError('Error de Login', '', 'Error en la conexión al servidor.');
        }
      );
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      const data = { email, password };

      this.authService.register(data).subscribe(
        (res: any) => {
          if (res.intResponse === '200') {
            this.mostrarAlerta('Registro Exitoso', '', '¡Cuenta creada correctamente!');
          } else {
            this.mostrarError('Error de Registro', '', 'El correo ya está en uso.');
          }
        },
        error => {
          this.mostrarError('Error de Registro', '', 'Error en la conexión al servidor.');
        }
      );
    } else if (this.registerForm.hasError('mismatch')) {
      this.mostrarError('Error de Registro', '', 'Las contraseñas no coinciden.');
    }
  }

  async mostrarAlerta(header: string, sub: string, message: string) {
    const alerta = await this.alertita.create({
      header,
      subHeader: sub,
      message,
      buttons: [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          this.router.navigate(['/tabs/tab1']);
        }
      }]
    });
    await alerta.present();
  }

  async mostrarError(header: string, sub: string, message: string) {
    const alerta = await this.alertita.create({
      header,
      subHeader: sub,
      message,
      buttons: ['Ok']
    });
    await alerta.present();
  }
}