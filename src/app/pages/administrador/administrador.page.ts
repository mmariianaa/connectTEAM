// ESTE LO IMPLENTE YO (MARIANA) PARA LA PAGINA DEL ADMINISTRADOR
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
  IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
  standalone: true,
  imports: [IonBadge, IonIcon, 
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

  misTablerosasignartareas() {
    this.router.navigate(['/tablerosytareas']);
  }

}