import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
import { Router } from '@angular/router';

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
  @ViewChild('tablerosContainer', { static: true }) tablerosContainer!: ElementRef;
  tableros: Tablero[] = [];

  constructor(
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {}

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
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo && data.titulo.trim() !== '') {
              const codigo4Digitos = Math.floor(1000 + Math.random() * 9000);

              const nuevoTablero: Tablero = {
                titulo: data.titulo,
                codigo: codigo4Digitos
              };

              this.tableros.push(nuevoTablero);

              // Crear dinámicamente un card
              const card = this.renderer.createElement('ion-card');
              const header = this.renderer.createElement('ion-card-header');
              const title = this.renderer.createElement('ion-card-title');
              const subtitle = this.renderer.createElement('ion-card-subtitle');
              const content = this.renderer.createElement('ion-card-content');
              const button = this.renderer.createElement('ion-button');

              title.textContent = nuevoTablero.titulo;
              subtitle.textContent = `Código: ${nuevoTablero.codigo}`;
              content.textContent = 'Este tablero fue creado por el administrador.';
              button.textContent = 'Asignar tarea';

              // Evento de click → navegar a la pantalla "tablero"
              button.addEventListener('click', () => {
                this.router.navigate(['/mistablreosasignaciondetareas']);
              });

              this.renderer.appendChild(header, title);
              this.renderer.appendChild(header, subtitle);
              this.renderer.appendChild(card, header);
              this.renderer.appendChild(card, content);
              this.renderer.appendChild(card, button);

              this.renderer.appendChild(this.tablerosContainer.nativeElement, card);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}