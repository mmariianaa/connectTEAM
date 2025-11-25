import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IntegrantesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
