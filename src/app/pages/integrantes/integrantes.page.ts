// ESTE LO CODIFICO EMILY 
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  IonCol, 
  IonRow, 
  IonGrid 
} from '@ionic/angular/standalone';
import { TableroService } from '../../services/tablero.service'; 

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
  standalone: true,
  imports: [
    IonGrid, IonRow, IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule
  ]
})
export class IntegrantesPage implements OnInit {
  @ViewChild('integrantesContainer', { static: true }) integrantesContainer!: ElementRef;
  tableroId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private tableroService: TableroService
  ) {}

  ngOnInit() {
    // Recuperar el id del tablero desde la URL
    this.tableroId = this.route.snapshot.paramMap.get('id') || '';

    // Cargar integrantes del tablero
    if (this.tableroId) {
      this.tableroService.obtenerIntegrantesPorTablero(this.tableroId).subscribe({
        next: (res: any) => {
          const lista = res.Respuesta || [];
          this.limpiarIntegrantesContainer();
          lista.forEach((i: any) => this.pintarIntegrante(i));
        },
        error: (err) => console.error('Error al cargar integrantes:', err)
      });
    }
  }

  // Limpiar el contenedor antes de repintar
  private limpiarIntegrantesContainer() {
    const cont = this.integrantesContainer?.nativeElement;
    if (!cont) return;
    while (cont.firstChild) cont.removeChild(cont.firstChild);
  }

  // Pintar cada integrante en un recuadro dinámico
  private pintarIntegrante(integrante: any) {
    const card = this.renderer.createElement('ion-card');
    const header = this.renderer.createElement('ion-card-header');
    const title = this.renderer.createElement('ion-card-title');
    const content = this.renderer.createElement('ion-card-content');
    const button = this.renderer.createElement('ion-button');

    // Mostrar nombre del colaborador
    title.textContent = integrante.nombre || 'Sin nombre';
    content.innerHTML = `
      <p>Email: ${integrante.email || '—'}</p>
      <p>Rol: ${integrante.rol || 'colaborador'}</p>
    `;

    // Botón para asignar tarea  redirige con colaboradorId y tableroId
    button.textContent = 'Asignar tarea';  
    button.addEventListener('click', () => {
      this.router.navigate(['/mistablreosasignaciondetareas'], {
        queryParams: {
          colaboradorId: integrante.id,
          tableroId: this.tableroId
        }
      });
    });

    this.renderer.appendChild(header, title);
    this.renderer.appendChild(card, header);
    this.renderer.appendChild(card, content);
    this.renderer.appendChild(card, button);
    this.renderer.appendChild(this.integrantesContainer.nativeElement, card);
  }
}
