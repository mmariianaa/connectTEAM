import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonInputPasswordToggle,IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput,
    IonItem,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    CommonModule,
    FormsModule,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonList,
    IonListHeader
  ]
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
      confirmPassword: ["", [Validators.required]],
      role: ['', Validators.required]

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
  if (this.loginForm.invalid) {
    this.mostrarError('Formulario incompleto', '', 'Por favor completa todos los campos antes de iniciar sesión.');
    return;
  }

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

  onRegister() {
  if (this.registerForm.invalid) {
    // Validación específica para el rol
    if (!this.registerForm.value.role) {
      this.mostrarError('Rol requerido', '', 'Por favor selecciona si eres Administrador o Colaborador.');
      return;
    }

    // Validación de contraseñas
    if (this.registerForm.hasError('mismatch')) {
      this.mostrarError('Error de Registro', '', 'Las contraseñas no coinciden.');
      return;
    }

    // Validación general
    this.mostrarError('Formulario incompleto', '', 'Por favor completa todos los campos antes de continuar.');
    return;
  }

  // Si todo está bien
  const { email, password, role } = this.registerForm.value;
  const data = { email, password, role };

  this.authService.register(data).subscribe(
    (res: any) => {
      if (res.intResponse === '200') {
        const rolTexto = role === 'admin' ? 'Administrador' : 'Colaborador';
        this.mostrarAlerta('Registro Exitoso', '', `Cuenta creada correctamente como ${rolTexto}.`);
      } else {
        this.mostrarError('Error de Registro', '', 'El correo ya está en uso.');
      }
    },
    error => {
      this.mostrarError('Error de Registro', '', 'Error en la conexión al servidor.');
    }
  );
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
          this.router.navigate(['/perfiladmin']);
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