import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonBackButton, 
  IonButton 
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonBackButton, 
    IonCol, 
    IonRow, 
    IonGrid, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
  ]
})
export class AdministradorPage {
  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  crearTableros() {
    // Aquí navega a la página de tableros
    this.router.navigate(['/perfiladmin']);
  }

  misTableros() {
    console.log('Mis Tableros');
  }

  tareasPendientes() {
    console.log('Tareas Pendientes');
  }

  async generarQR() {
  // Generar un valor aleatorio (ejemplo: número entre 1000 y 9999)
  const randomValue = Math.floor(Math.random() * 9000) + 1000;

  const alert = await this.alertCtrl.create({
    header: 'Código QR',
    message: `
      <div style="display:flex;justify-content:center;align-items:center;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QR-${randomValue}" />
      </div>
    `,
    buttons: ['Cerrar']
  });
  await alert.present();
}
}