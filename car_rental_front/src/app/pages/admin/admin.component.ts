import { Component } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { envrionement } from 'src/environement/environement';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  cars : Car[] = []
  filteredCars : Car[] = []
  photourl : string = envrionement.uploadsUrl
  constructor(private api : ApiService){
    this.getallcars()
  }

  getallcars(){
    this.api.getallcar().subscribe((cars) => {
      this.cars = cars
      this.filteredCars = cars
    })
  }

  deleteCar(car : Car){
    this.api.deletecar(car).subscribe((res) => {
      this.cars = this.cars.filter((c) => c.id !== car.id)
      this.filteredCars = this.filteredCars.filter((c) => c.id !== car.id)
    })
  }

  searchCars(searchTerm: string) {
    if (!searchTerm) {
      this.filteredCars = this.cars
      return
    }
    searchTerm = searchTerm.toLowerCase()
    this.filteredCars = this.cars.filter(car => 
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.year.toString().includes(searchTerm)
    )
  }
}
