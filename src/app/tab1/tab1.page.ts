import { Component } from '@angular/core';
import { IonFab, IonIcon,IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonFab,IonIcon,IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  constructor() {
     addIcons({ add });
  }
}
