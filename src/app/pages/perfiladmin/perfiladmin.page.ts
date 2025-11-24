import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonList,
  IonLabel,
  IonItem,
  IonIcon,
  IonButton,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.page.html',
  styleUrls: ['./perfiladmin.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonList,
    IonLabel,
    IonItem,
    IonIcon,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class PerfiladminPage implements OnInit {
  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  async abrirCrearTablero() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Tablero',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Escribe el título del tablero'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'QR',
          handler: (data) => {
            this.mostrarQR(data.titulo);
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarQR(titulo: string) {
    const alert = await this.alertCtrl.create({
      header: `QR del Tablero`,
      message: `
        <div style="display:flex;justify-content:center;align-items:center;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
            titulo
          )}" />
        </div>
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
