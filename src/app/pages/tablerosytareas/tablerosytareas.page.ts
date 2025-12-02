// ESTE LO CODIFICO EMILY 
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { TableroService } from '../../services/tablero.service';

@Component({
  selector: 'app-tablerosytareas',
  templateUrl: './tablerosytareas.page.html',
  styleUrls: ['./tablerosytareas.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class TablerosytareasPage implements OnInit {
  @ViewChild('tablerosContainer', { static: true }) tablerosContainer!: ElementRef;
  cantidadTableros = 0;
  userId = '';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private tableroService: TableroService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) return;

    this.tableroService.obtenerTablerosPorPropietario(this.userId).subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res?.Respuesta) ? res.Respuesta : [];

        // Limpiar contenedor
        this.limpiarTablerosContainer();

        // Pintar cada tablero dinámicamente
        lista.forEach((t: any) => this.pintarTablero(t));

        // Actualizar contador
        this.cantidadTableros = lista.length;
      },
      error: (err) => console.error('Error al cargar tableros:', err)
    });
  }

  private limpiarTablerosContainer() {
    const cont = this.tablerosContainer?.nativeElement;
    if (!cont) return;
    while (cont.firstChild) {
      cont.removeChild(cont.firstChild);
    }
  }

  private pintarTablero(tablero: any) {
    const card = this.renderer.createElement('ion-card');
    const header = this.renderer.createElement('ion-card-header');
    const title = this.renderer.createElement('ion-card-title');
    const content = this.renderer.createElement('ion-card-content');
    const button = this.renderer.createElement('ion-button');

    title.textContent = tablero.nombre || 'Sin título';
    const fechaText = tablero.fechaCreacion
      ? new Date(tablero.fechaCreacion).toLocaleDateString()
      : '—';

    content.innerHTML = `
      <p>Descripción: ${tablero.descripcion || '—'}</p>
      <p>Fecha de creación: ${fechaText}</p>
      <p>Estado: ${tablero.estado || 'activo'}</p>
    `;

    button.textContent = 'Ir a Tareas Pendientes';
    button.setAttribute('color', 'primary');
    button.setAttribute('expand', 'block');
    button.addEventListener('click', () => {
      this.irATareasPendientes(tablero._id || tablero.id);
    });

    this.renderer.appendChild(header, title);
    this.renderer.appendChild(card, header);
    this.renderer.appendChild(card, content);
    this.renderer.appendChild(card, button);
    this.renderer.appendChild(this.tablerosContainer.nativeElement, card);
  }

  irATareasPendientes(tableroId: string) {
    if (tableroId) {
      this.router.navigate(['/tareaspendientes', tableroId]);
    }
  }
}
