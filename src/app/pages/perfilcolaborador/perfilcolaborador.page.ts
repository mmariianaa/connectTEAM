import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfilcolaborador',
  templateUrl: './perfilcolaborador.page.html',
  styleUrls: ['./perfilcolaborador.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonCardContent, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardHeader, 
    IonCard, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
  ]
})
export class PerfilcolaboradorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  irTableros() {
    this.router.navigate(['/tableros']);
  }

  irTareas() {
    this.router.navigate(['/tareas-pendientes']);
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }

}
