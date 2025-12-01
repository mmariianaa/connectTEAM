import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TableroService } from '../../services/tablero.service';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton, IonLabel, IonCheckbox, IonItem, IonCol, IonList, IonInput, IonRow, IonGrid 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfilcolaborador',
  templateUrl: './perfilcolaborador.page.html',
  styleUrls: ['./perfilcolaborador.page.scss'],
  standalone: true,
  imports: [
    IonGrid, IonRow, IonInput, IonList, IonCol, IonItem, IonCheckbox, IonLabel, 
    IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule
  ]
})
export class PerfilcolaboradorPage implements OnInit {
  @ViewChild('misTablerosContainer', { static: true }) misTablerosContainer!: ElementRef;

  colaboradorId = '';
  codigoInput = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private tableroService: TableroService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.colaboradorId = localStorage.getItem('userId') || '';
    if (this.colaboradorId) {
      this.cargarMisTableros();
    }
  }

  // 👉 Método para cargar todos los tableros del colaborador
  cargarMisTableros() {
    this.tableroService.obtenerTablerosPorColaborador(this.colaboradorId).subscribe({
      next: (res: any) => {
        const lista = res.Respuesta || [];
        const cont = this.misTablerosContainer.nativeElement;

        // limpiar contenido previo
        while (cont.firstChild) cont.removeChild(cont.firstChild);

        // pintar cada tablero dinámicamente
        lista.forEach((t: any) => {
          const card = this.renderer.createElement('ion-card');
          const header = this.renderer.createElement('ion-card-header');
          const title = this.renderer.createElement('ion-card-title');
          const content = this.renderer.createElement('ion-card-content');

          title.textContent = t.nombre || 'Sin título';
          content.innerHTML = `
            <p>Código: ${t.codigoRandom || '—'}</p>
            <p>Estado: ${t.estado || 'activo'}</p>
            <p>Administrador: ${t.propietarioNombre || '—'}</p>
          `;

          this.renderer.appendChild(header, title);
          this.renderer.appendChild(card, header);
          this.renderer.appendChild(card, content);
          this.renderer.appendChild(cont, card);
        });
      },
      error: (err) => console.error('Error al cargar tableros:', err)
    });
  }

  // 👉 Método para unirse a un tablero por código
  unirmePorCodigo() {
    const codigo = this.codigoInput.trim();
    if (!codigo || !this.colaboradorId) return;

    this.tableroService.unirsePorCodigo(this.colaboradorId, codigo).subscribe({
      next: async (res: any) => {
        const alert = await this.alertController.create({
          header: 'Unido',
          message: `Te has unido al tablero: ${res.Respuesta?.nombre || ''}`,
          buttons: ['OK']
        });
        await alert.present();

        this.codigoInput = '';
        this.cargarMisTableros(); // recargar lista
      },
      error: async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo unir al tablero',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  // 👉 Métodos de navegación que ya tenías
  irTableros() {
    this.router.navigate(['/mistableroscolaborador']);
  }

  irTareas() {
    this.router.navigate(['/tareaspendientes']);
  }

  volver() {
    this.router.navigate(['/login']);
  }

  async guardar() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se guardó con éxito',
      buttons: ['OK']
    });
    await alert.present();
  }
}
