import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

  export class IntegrantesPage implements OnInit {
  usuarios: string[] = ['Juan Pérez', 'María López', 'Carlos García', 'Ana Torres'];
  usuarioRandom: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.seleccionarUsuarioRandom();
  }

  seleccionarUsuarioRandom() {
    const index = Math.floor(Math.random() * this.usuarios.length);
    this.usuarioRandom = this.usuarios[index];
  }

  irAsignacionTareas() {
    this.router.navigate(['/mistablreosasignaciondetareas']);
  }
}


