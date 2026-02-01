import { Injectable } from '@angular/core';
import { HousingLocation } from './HousingLocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly url = 'http://localhost:3000/locations';
  // Requisito 4: API Key de WeatherAPI
  readonly weatherApiKey = '354ddfdbd26a439093d120713260801';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('Error en la red: ' + response.statusText);
    }
    return await response.json();
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? undefined;
  }

  // Solución al error TS2339
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Solicitud recibida: ${firstName} ${lastName}, ${email}.`);
  }

  async getWeather(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.weatherApiKey}&q=${lat},${lon}&lang=es`
      );
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo el clima:', error);
      return null;
    }
  }
}
