//ESTE LO CODIFICO EMILY PARA MOSTRAR LOS TABLEROS DEL COLABORADOR
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonLabel, IonList, IonAvatar, IonButtons} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

interface Tablero {
  nombre: string;
  id: number;
}

@Component({
  selector: 'app-mistableroscolaborador',
  templateUrl: './mistableroscolaborador.page.html',
  styleUrls: ['./mistableroscolaborador.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButtons, IonList, 
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
    FormsModule]
})
export class MistableroscolaboradorPage implements OnInit {

  constructor(private route: Router) { }

  colaborador = "";
  tableros: Tablero[] = [
    {id: 1, nombre: "Proyecto Matematicas"},
    {id: 2, nombre: "Proyecto Algebra"},
    {id: 3, nombre: "Proyecto X"},
    {id: 4, nombre: "Proyecto Programacion"},
    {id: 5, nombre: "Proyecto Lectura"},
    {id: 6, nombre: "Proyecto Biologia"}
  ]
  codigoRandom: string = "";

  ngOnInit() {
  
  }

  verTablero(id: number){
    console.log("Ver tablero", id);
    this.route.navigate(['/tablero', id]);
  }

  misTableros(){
    this.route.navigate(['/mistableroscolaborador']);
  }

  volverPerfilColaborador(){
    this.route.navigate(['/perfilcolaborador']);
  }

  agregarTablero(){
    if (!this.codigoRandom||this.codigoRandom.trim() === ""){
      console.log("Codigo vacio");
      return;
    }
    const nuevoTablero = {
      id: Date.now(), //ID unico 
      nombre: this.codigoRandom.toUpperCase()
    };
    this.tableros.push(nuevoTablero);
    this.codigoRandom = ''; // Para limpiar imput
    console.log('Nuevo tablero agragado', nuevoTablero);
  }

}
