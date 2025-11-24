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

// 🔹 Interfaz para tipar los tableros
interface Tablero {
  titulo: string;
  codigo: number;
}

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
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class PerfiladminPage implements OnInit {
  // 🔹 Array para guardar los tableros creados
  tableros: Tablero[] = [];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  // Método para abrir un alert y crear tablero con código
  async crearTablero() {
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
          text: 'Crear',
          handler: (data) => {
            if (data.titulo && data.titulo.trim() !== '') {
              const codigo4Digitos = Math.floor(1000 + Math.random() * 9000);

              // Guardar tablero en el array
              this.tableros.push({
                titulo: data.titulo,
                codigo: codigo4Digitos
              });

              // Mostrar alerta con el código
              this.mostrarCodigo(data.titulo, codigo4Digitos);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para mostrar el código generado
  async mostrarCodigo(titulo: string, codigo: number) {
    const alert = await this.alertCtrl.create({
      header: `Tablero creado`,
      message: `
        <div id="codigo-alert">
          <p><strong>${titulo}</strong></p>
          <p class="codigo-texto">Código: ${codigo}</p>
        </div>
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}