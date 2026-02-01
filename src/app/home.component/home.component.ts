import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // Añadimos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingLocation } from '../HousingLocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  private housingService: HousingService = inject(HousingService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef); // Inyectamos el detector

  async ngOnInit() {
    try {
      const data = await this.housingService.getAllHousingLocations();
      this.housingLocationList = data;

      // ¡ESTO ES LA CLAVE!
      // Le decimos a Angular: "He recibido datos, redibuja la pantalla ahora mismo"
      this.cdr.detectChanges();

      console.log('Pantalla actualizada con:', this.housingLocationList.length, 'casas');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
