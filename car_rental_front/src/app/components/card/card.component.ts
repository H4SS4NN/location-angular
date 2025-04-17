import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/models/car';
import { envrionement } from 'src/environement/environement';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() car!: Car;
  @Input() showActions: boolean = false;
  @Input() isPreview: boolean = false;
  @Output() onDelete = new EventEmitter<Car>();
  @Output() onLike = new EventEmitter<Car>();
  photoUrl: string = envrionement.uploadsUrl;

  constructor() {
    console.log(this.photoUrl)
  }

  getPhotoUrl(): string {
    if (this.isPreview && this.car.photo && typeof this.car.photo === 'string') {
      return this.car.photo;
    }
    if (this.car.photo && this.car.photo.toString().startsWith('http')) {
      return this.car.photo.toString();
    }
    if (this.car.photo && this.car.photo.toString().startsWith('data:')) {
      return this.car.photo.toString();
    }
    return `${this.photoUrl}${this.car.photo}`;
  }

  formatPrice(price: number): string {
    return `${price}€ / jour`;
  }

  likeCar() {
    this.onLike.emit(this.car);
  }
}
