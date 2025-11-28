import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // importa RouterModule también
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
    RouterModule   // necesario para que funcione la inyección de Router
  ]
})
export class TablerosytareasPage implements OnInit {
  tablero1 = { nombre: 'Tablero 1', descripcion: 'Gestión de proyectos', fecha: new Date('2025-11-01') };
  tablero2 = { nombre: 'Tablero 2', descripcion: 'Tareas de marketing', fecha: new Date('2025-11-15') };
  tablero3 = { nombre: 'Tablero 3', descripcion: 'Planificación anual', fecha: new Date('2025-11-20') };

  constructor(private router: Router) {}

  ngOnInit() {}

  irATareasPendientes() {
    this.router.navigate(['/tareaspendientes']); // redirige a la ruta definida en tu app-routing.module.ts
  }
}