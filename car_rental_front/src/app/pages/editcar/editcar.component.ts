import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
})
export class EditcarComponent implements OnInit {
  car: Car | null = null;
  selectedFile: File | null = null;
  originalPhoto: any = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.apiService.getCarById(id).subscribe(car => {
      this.car = car;
      this.originalPhoto = car.photo;
      // Si la photo est une URL, on la garde telle quelle
      if (typeof car.photo === 'string') {
        this.car.photo = car.photo;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Créer une URL temporaire pour la prévisualisation
    if (this.selectedFile && this.car) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.car!.photo = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    if (this.car) {
      const updatedCar = form.value;
      // Si aucun nouveau fichier n'est sélectionné, on garde la photo originale
      if (!this.selectedFile) {
        updatedCar.photo = this.originalPhoto;
      }
      this.apiService.updateCar(this.car.id!, updatedCar, this.selectedFile).subscribe(response => {
        console.log('Voiture mise à jour:', response);
        this.router.navigate(['/admin']);   
      });
    }
  }
} 