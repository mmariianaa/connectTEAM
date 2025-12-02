import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableroService } from '../../services/tablero.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mistablreosasignaciondetareas',
  templateUrl: './mistablreosasignaciondetareas.page.html',
  styleUrls: ['./mistablreosasignaciondetareas.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonIcon,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule  
  ]
})
export class MistablreosasignaciondetareasPage implements OnInit {
  // referencia al contenedor en el HTML
  @ViewChild('contenedorCampos', { static: true }) contenedorCampos!: ElementRef;
  colaboradorId = '';
  tableroId = '';
  constructor(private renderer: Renderer2, private router: Router,private route:ActivatedRoute, private tableroService: TableroService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.colaboradorId = params['colaboradorId'] || '';
    this.tableroId = params['tableroId'] || '';
    console.log('Asignando tareas a colaborador:', this.colaboradorId, 'en tablero:', this.tableroId);
  });
  }

  // método para agregar dinámicamente un campo
  agregarCampo() {
    const item = this.renderer.createElement('ion-item');
    const input = this.renderer.createElement('ion-input');

    input.setAttribute('placeholder', 'Escribe algo...');
    input.setAttribute('type', 'text');

    this.renderer.appendChild(item, input);
    this.renderer.appendChild(this.contenedorCampos.nativeElement, item);
  }

  // método para guardar y regresar a integrantes
  guardar() {
  const campos: NodeListOf<HTMLInputElement> = this.contenedorCampos.nativeElement.querySelectorAll('ion-input');
  const tareas: string[] = [];

  campos.forEach((input: any) => {
    const valor = input.value || '';
    if (valor.trim()) tareas.push(valor.trim());
  });

  this.tableroService.asignarTareas(this.tableroId, this.colaboradorId, tareas).subscribe({
    next: (res) => {
      console.log('Tareas guardadas:', res);
      this.router.navigate(['/integrantes', this.tableroId]);
    },
    error: (err) => console.error('Error al guardar tareas:', err)
  });
  }
}