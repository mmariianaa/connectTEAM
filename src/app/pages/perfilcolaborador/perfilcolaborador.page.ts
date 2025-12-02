// LO CODIFICAMOS ENTRE EMILY Y YO MARIANA PARA QUE EL COLABORADOR PUEDA VER SU PERFIL Y LAS TAREAS ASIGNADAS
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
  @ViewChild('misTareasContainer', { static: true }) misTareasContainer!: ElementRef;

  colaboradorId = '';
  codigoInput = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private tableroService: TableroService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.colaboradorId = localStorage.getItem('userId') || '';
    if (this.colaboradorId) {
      this.cargarMisTableros();
    }
  }

  // Método para cargar todos los tableros del colaborador
  cargarMisTableros() {
    this.tableroService.obtenerTablerosPorColaborador(this.colaboradorId).subscribe({
      next: (res: any) => {
        const lista = res.Respuesta || [];
        const cont = this.misTablerosContainer.nativeElement;

        while (cont.firstChild) cont.removeChild(cont.firstChild);

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

          const botonVerTareas = this.renderer.createElement('ion-button');
          botonVerTareas.textContent = 'Ver tareas';
          botonVerTareas.setAttribute('color', 'success');
          botonVerTareas.setAttribute('expand', 'block');
          botonVerTareas.addEventListener('click', () => {
            this.cargarTareasDeTablero(t.tableroId || t._id || t.id);
          });

          this.renderer.appendChild(header, title);
          this.renderer.appendChild(card, header);
          this.renderer.appendChild(card, content);
          this.renderer.appendChild(card, botonVerTareas);
          this.renderer.appendChild(cont, card);
        });
      },
      error: (err) => console.error('Error al cargar tableros:', err)
    });
  }
  // Método para cargar tareas de un tablero específico
  cargarTareasDeTablero(tableroId: string) {
    this.tableroService.obtenerTareasPorTableroYColaborador(tableroId, this.colaboradorId).subscribe({
      next: (res: any) => {
        const tareas = res.Respuesta || [];
        const cont = this.misTareasContainer.nativeElement;
        while (cont.firstChild) cont.removeChild(cont.firstChild);

        tareas.forEach((tarea: any) => {
          const card = this.renderer.createElement('ion-card');
          const header = this.renderer.createElement('ion-card-header');
          const title = this.renderer.createElement('ion-card-title');
          title.textContent = tarea.titulo || 'Tareas del tablero';

          const content = this.renderer.createElement('ion-card-content');
          content.innerHTML = `<p>Asignadas el: ${new Date(tarea.fechaAsignacion).toLocaleDateString()}</p>`;

          const lista = this.renderer.createElement('ion-list');
          const checklist = tarea.checklist || tarea.tareas || [];

          checklist.forEach((chk: any) => {
            const item = this.renderer.createElement('ion-item');
            const checkbox = this.renderer.createElement('ion-checkbox');
            checkbox.setAttribute('slot', 'start');
            if (chk.completado) checkbox.setAttribute('checked', 'true');

            const label = this.renderer.createElement('ion-label');
            label.textContent = chk.texto || chk.descripcion || chk;

            const fileInput = this.renderer.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('style', 'margin-left: 12px');

            // guardar inmediatamente al marcar
            checkbox.addEventListener('ionChange', (ev: any) => {
              chk.completado = ev.detail.checked;
              chk.fechaCompletado = chk.completado ? new Date().toISOString() : null;

              this.tableroService.actualizarTarea(tarea._id, { checklist }).subscribe({
                next: () => console.log('Estado guardado'),
                error: (err) => console.error('Error al guardar estado:', err)
              });
            });

            // subir archivo
            fileInput.addEventListener('change', async (e: any) => {
              const file = e.target.files[0];
              if (file) {
                const base64 = await this.fileToBase64(file);
                chk.archivo = { nombre: file.name, data: base64 };

                this.tableroService.actualizarTarea(tarea._id, { checklist }).subscribe({
                  next: () => console.log('Archivo guardado'),
                  error: (err) => console.error('Error al guardar archivo:', err)
                });
              }
            });

            this.renderer.appendChild(item, checkbox);
            this.renderer.appendChild(item, label);
            this.renderer.appendChild(item, fileInput);
            this.renderer.appendChild(lista, item);
          });

          const guardarBtn = this.renderer.createElement('ion-button');
          guardarBtn.textContent = 'Guardar';
          guardarBtn.setAttribute('color', 'primary');
          guardarBtn.setAttribute('expand', 'block');
          guardarBtn.addEventListener('click', async () => {
            this.tableroService.actualizarTarea(tarea._id, { checklist }).subscribe({
              next: async () => {
                const alert = await this.alertController.create({
                  header: 'Felicidades',
                  message: 'Se guardó con éxito',
                  buttons: ['OK']
                });
                await alert.present();
              },
              error: async () => {
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: 'No se pudo guardar',
                  buttons: ['OK']
                });
                await alert.present();
              }
            });
          });

          this.renderer.appendChild(header, title);
          this.renderer.appendChild(card, header);
          this.renderer.appendChild(card, content);
          this.renderer.appendChild(card, lista);
          this.renderer.appendChild(card, guardarBtn);
          this.renderer.appendChild(cont, card);
        });
      },
      error: (err) => console.error('Error al cargar tareas:', err)
    });
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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
      this.cargarMisTableros();
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
volver() {
  this.router.navigate(['/login']);
}

}
