import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envrionement } from 'src/environement/environement';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {
  apiurl = envrionement.apiUrlBack

  constructor(private http : HttpClient) {
    console.log(this.apiurl)
   }

   getallcar (): Observable<Car[]> {
    return this.http.get <Car[]> (this.apiurl)
   }

   getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiurl}/${id}`);
   }

   createcar(car: Car, picture: File | null): Observable<Car> {
    const formData = new FormData(); // On crée un objet FormData pour envoyer les données du pokemon
    if (picture) { // Si un fichier est fourni
      formData.append('photo', picture); // On ajoute le fichier à l'objet FormData
    }
    Object.keys(car).forEach(key => { // On boucle sur les clés de l'objet pokemon
      formData.append(key, car[key as keyof Car]?.toString() || ''); // On ajoute chaque clé et sa valeur à l'objet FormData
    });
    return this.http.post<Car>(this.apiurl, formData);  // On envoie la requête POST à l'API
  }

   updateCar(id: number, car: Car, picture: File | null): Observable<Car> {
    const formData = new FormData();
    if (picture) {
      formData.append('photo', picture);
    }
    Object.keys(car).forEach(key => {
      formData.append(key, car[key as keyof Car]?.toString() || '');
    });
    return this.http.put<Car>(`${this.apiurl}/${id}`, formData);
  }

   deletecar(car : Car) : Observable<Car>{
    return this.http.delete<Car>(this.apiurl + '/' + car.id)
   }

   updateReservation(id: number, reservationData: { reservedFrom: Date; reservedTo: Date }): Observable<Car> {
    return this.http.put<Car>(`${this.apiurl}/${id}`, reservationData);
  }

   searchCars(query: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiurl}/search?q=${query}`);
  }

   likeCar(id: number): Observable<Car> {
    return this.http.post<Car>(`${this.apiurl}/${id}/like`, {});
  }
}
