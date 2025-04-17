import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { envrionement } from 'src/environement/environement';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  photourl: string = envrionement.uploadsUrl;
  searchQuery: string = '';
  
  // Line drawing animation following the motion path values
  // For demo aesthetic only
  
  private searchTerms = new Subject<string>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCars();
    this.setupSearch();
  }
 
  
  loadCars(): void {
    this.api.getallcar().subscribe({
      next: (res) => {
        this.cars = res;
      },
      error: (err) => console.error('Erreur lors de la récupération des voitures:', err)
    });
  }

  setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim()) {
          return this.api.searchCars(term);
        } else {
          return this.api.getallcar();
        }
      })
    ).subscribe(cars => {
      this.cars = cars;
    });
  }

  onSearch(): void {
    this.searchTerms.next(this.searchQuery);
  }

  likeCar(car: Car) {
    if (car.id) {
      this.api.likeCar(car.id).subscribe({
        next: (updatedCar) => {
          // Mettre à jour la voiture dans le tableau
          const index = this.cars.findIndex(c => c.id === car.id);
          if (index !== -1) {
            this.cars[index] = updatedCar;
          }
        },
        error: (err) => console.error('Erreur lors du like:', err)
      });
    }
  }
}
