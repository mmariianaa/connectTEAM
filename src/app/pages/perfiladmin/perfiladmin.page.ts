import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TableroService } from '../../services/tablero.service'; // ⚠️ Ajusta la ruta según tu estructura real
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

interface Tablero {
  id?: string;
  nombre: string;
  propietario: string;
  colaboradores: string[];
  codigoRandom: string;
  fechaCreacion: string;
  estado?: string;
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
  cantidadTableros = 0;
  propietarioId = ''; // aquí debes asignar el id del admin logueado

  constructor(
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private router: Router,
    private tableroService: TableroService
  ) { }

  ngOnInit() {
    // Recuperar el id del usuario guardado en login
  this.propietarioId = localStorage.getItem('userId') || '';
    
  // 2) Si hay id, cargar sus tableros
  if (this.propietarioId) {
    this.tableroService.obtenerTablerosPorPropietario(this.propietarioId).subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res?.Respuesta) ? res.Respuesta : [];

        // 3) Limpiar contenedor para evitar duplicados
        this.limpiarTablerosContainer();

        // 4) Pintar cada tablero con Renderer2
        lista.forEach((t: any) => this.pintarTablero(t));

        // 5) Actualizar contador
        this.cantidadTableros = lista.length;
      },
      error: (err: any) => console.error('Error al cargar tableros del propietario:', err)
    });
  }
}

// Auxiliar: limpiar el contenedor antes de repintar
private limpiarTablerosContainer() {
  const cont = this.tablerosContainer?.nativeElement;
  if (!cont) return;
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }
}
  async crearTablero() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo Tablero',
      inputs: [
        { name: 'titulo', type: 'text', placeholder: 'Título del tablero' },
        { name: 'fecha', type: 'date', placeholder: 'Fecha de creación' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (!data.titulo || !this.propietarioId) return;

            const codigo = Math.floor(1000 + Math.random() * 9000).toString();
            const isoFecha = data.fecha ? new Date(data.fecha).toISOString() : new Date().toISOString();

            this.propietarioId = localStorage.getItem('userId') || '';
            const payload = {
              nombre: data.titulo,
              propietario: this.propietarioId,
              colaboradores: [],
              codigoRandom: codigo,
              fechaCreacion: isoFecha,
              estado: 'activo'
            };

            this.tableroService.crearTablero(payload).subscribe({
              next: (res: any) => {
                const creado = res?.Respuesta;
                if (!creado) return;
                this.cantidadTableros += 1;
                this.pintarTablero(creado);
              },
              error: (err: any) => console.error('Error al guardar tablero:', err)
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private pintarTablero(tablero: Tablero) {
    const card = this.renderer.createElement('ion-card');
    const header = this.renderer.createElement('ion-card-header');
    const title = this.renderer.createElement('ion-card-title');
    const subtitle = this.renderer.createElement('ion-card-subtitle');
    const content = this.renderer.createElement('ion-card-content');
    const button = this.renderer.createElement('ion-button');

    title.textContent = tablero.nombre || 'Sin título';
    subtitle.textContent = `Código: ${tablero.codigoRandom || ''}`;

    const fechaText = tablero.fechaCreacion
      ? new Date(tablero.fechaCreacion).toLocaleDateString()
      : '—';
    content.innerHTML = `
      <p>Fecha: ${fechaText}</p>
      <p>Propietario: ${tablero.propietario}</p>
      <p>Estado: ${tablero.estado || 'activo'}</p>
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
