import { Component } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol,
  IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonList, IonButton, IonIcon 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-tablero',
  templateUrl: './tareaspendientes.page.html',
  styleUrls: ['./tareaspendientes.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonList, IonIcon,
    IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonLabel, IonItem,
    IonCol, IonRow, IonGrid,
    IonContent, IonHeader, IonTitle, IonToolbar
  ]
})
export class TareaspendientesPage {

  mostrarMonica: boolean = false;
  mostrarDario: boolean = false;
  mostrarEmily: boolean = false;

  // ✅ ESTADOS DE BORRADO (TACHADO)
  monicaT1 = false;
  monicaT2 = false;

  darioT1 = false;
  darioT2 = false;

  emilyT1 = false;
  emilyT2 = false;

  verMonica() {
    this.resetear();
    this.mostrarMonica = true;
  }

  verDario() {
    this.resetear();
    this.mostrarDario = true;
  }

  verEmily() {
    this.resetear();
    this.mostrarEmily = true;
  }

  resetear() {
    this.mostrarMonica = false;
    this.mostrarDario = false;
    this.mostrarEmily = false;
  }

  // ✅ FUNCIONES DE BORRADO
  borrarMonicaT1() { this.monicaT1 = true; }
  borrarMonicaT2() { this.monicaT2 = true; }

  borrarDarioT1() { this.darioT1 = true; }
  borrarDarioT2() { this.darioT2 = true; }

  borrarEmilyT1() { this.emilyT1 = true; }
  borrarEmilyT2() { this.emilyT2 = true; }

}
