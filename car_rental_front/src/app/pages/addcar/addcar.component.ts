import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss']
})
export class AddcarComponent {
  selectedFile: File | null = null;
  previewCar: Car = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    photo: null,
    price: 0,
    description: '',
    available: true,
    likes: 0,
    reservedFrom: new Date(),
    reservedTo: new Date()
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Créer une URL temporaire pour la prévisualisation
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewCar.photo = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    const car = form.value;
    this.apiService.createcar(car, this.selectedFile).subscribe(response => {
      console.log(response);
      form.reset();
      this.router.navigate(['/admin']);
    });
  }
}
