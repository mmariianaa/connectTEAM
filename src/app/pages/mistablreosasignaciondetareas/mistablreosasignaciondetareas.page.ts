import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {}

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
    console.log('Datos guardados correctamente');
    this.router.navigate(['/integrantes']); //  redirige a la página de Integrantes
  }
}