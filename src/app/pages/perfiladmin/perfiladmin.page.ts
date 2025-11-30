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
  creador:string;
  fecha:string;
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
  cantidadTableros: number = 0; 
  ngOnInit() {}

  async crearTablero() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Tablero',
      inputs: [
       { name: 'titulo', type: 'text', placeholder: 'Título del tablero' },
      { name: 'creador', type: 'text', placeholder: 'Nombre del creador' },
      { name: 'fecha', type: 'date', placeholder: 'Fecha de creación' }
    ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo && data.creador) {
              const codigo = Math.floor(1000 + Math.random() * 9000);

              const nuevoTablero: Tablero = {
                titulo: data.titulo,
                codigo: codigo,
                creador: data.creador,
                fecha: data.fecha
              };

              //Guardar en lista interna
              this.tableros.push(nuevoTablero)  ;
              this.cantidadTableros = this.tableros.length;
            

              

              // Crear dinámicamente un card
              const card = this.renderer.createElement('ion-card');
              const header = this.renderer.createElement('ion-card-header');
              const title = this.renderer.createElement('ion-card-title');
              const subtitle = this.renderer.createElement('ion-card-subtitle');
              const content = this.renderer.createElement('ion-card-content');
              const button = this.renderer.createElement('ion-button');

              title.textContent = nuevoTablero.titulo;
              subtitle.textContent = `Código: ${codigo}`;
              content.innerHTML = `
              <p>Fecha: ${data.fecha}</p>
              <p>Creado por: ${data.creador}</p>
            `;
            button.textContent = 'Asignar tarea';
            button.addEventListener('click', () => {
              this.router.navigate(['/integrantes']);
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