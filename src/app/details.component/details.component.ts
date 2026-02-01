import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Añade ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../HousingLocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  private cdr = inject(ChangeDetectorRef); // 2. Inyéctalo aquí

  housingLocation: HousingLocation | undefined;

  weatherData: any = null;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  async ngOnInit() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = await this.housingService.getHousingLocationById(housingLocationId);

    // Si la casa tiene coordenadas, pedimos el clima
    if (this.housingLocation?.coordinate) {
      this.weatherData = await this.housingService.getWeather(
        this.housingLocation.coordinate.latitude,
        this.housingLocation.coordinate.longitude
      );
    }

    // Obtenemos los datos
    this.housingLocation = await this.housingService.getHousingLocationById(housingLocationId);

    // 3. ¡IMPORTANTE! Forzamos a Angular a detectar el cambio para que desaparezca el "Loading..."
    this.cdr.detectChanges();

    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
      this.applyForm.patchValue(JSON.parse(savedData));
      // Volvemos a detectar cambios tras rellenar el formulario
      this.cdr.detectChanges();
    }
  }

  submitApplication() {
    if (this.applyForm.valid) {
      localStorage.setItem('applicationData', JSON.stringify(this.applyForm.value));

      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
    }
  }
}
