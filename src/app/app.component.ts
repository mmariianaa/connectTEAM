import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
  async ngOnInit() {
    // Esperar a que todo esté listo
    await this.initializeApp();
    
    // Ocultar splash screen
    await SplashScreen.hide();
  }

  private async initializeApp(): Promise<void> {
    // Tu lógica de inicialización aquí
    return Promise.resolve();
  }
}
