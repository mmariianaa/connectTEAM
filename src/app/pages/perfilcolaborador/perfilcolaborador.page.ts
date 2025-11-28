import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  IonButton, IonLabel, IonCheckbox, IonItem, IonCol, IonList, IonInput, IonRow, IonGrid } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfilcolaborador',
  templateUrl: './perfilcolaborador.page.html',
  styleUrls: ['./perfilcolaborador.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonInput, IonList, IonCol, IonItem, IonCheckbox, IonLabel, 
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

  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {}

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
