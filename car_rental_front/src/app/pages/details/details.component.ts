// src/app/details/details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Car } from '../../models/car';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { envrionement } from 'src/environement/environement';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  apiUrl = envrionement.uploadsUrl;
  car: Car | null = null;

  // Formulaire de réservation
  reservationForm: FormGroup;
  showReservationForm = false;

  // Sélection courante
  selectedDates = { start: null as Date | null, end: null as Date | null };
  numberOfDays = 0;
  totalPrice = 0;

  // Options simplifiées du calendrier
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'fr',
    selectable: true,
    selectMirror: true,
    // n'autorise pas la sélection de dates passées
    selectAllow: (selectInfo) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectInfo.start >= today;
    },
    select: this.handleDateSelect.bind(this),
    events: []  // on remplira après chargement de la voiture
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.api.getCarById(id).subscribe(car => {
      this.car = car;
      // on ajoute l'événement « Réservé » existant
      if (car.reservedFrom && car.reservedTo) {
        this.calendarOptions.events = [{
          title: 'Réservé',
          start: car.reservedFrom,
          end:   car.reservedTo,
          color: '#ff4444'
        }];
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if (!this.car) return;

    const start = new Date(selectInfo.startStr);
    const end   = new Date(selectInfo.endStr);
    // nombre de jours (exclut la fin)
    const diffMs = end.getTime() - start.getTime();
    this.numberOfDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    this.totalPrice   = this.numberOfDays * (this.car.price || 0);

    this.selectedDates = { start, end };
    this.showReservationForm = true;
  }

  cancelSelection() {
    this.showReservationForm = false;
    // on peut aussi vider la sélection via l'API du calendrier si besoin
  }

  onSubmitReservation() {
    if (!this.car || this.reservationForm.invalid) return;
    
    // Vérification que les dates sont bien définies
    if (!this.selectedDates.start || !this.selectedDates.end) {
      alert('Veuillez sélectionner une période valide');
      return;
    }

    const data = {
      available: false,
      customerName: this.reservationForm.value.customerName,
      customerEmail: this.reservationForm.value.customerEmail,
      reservedFrom: this.selectedDates.start,
      reservedTo: this.selectedDates.end
    };

    this.api.updateReservation(this.car.id!, data).subscribe(updated => {
      this.car = updated;
      // on met à jour l'event du calendrier
      this.calendarOptions.events = [{
        title: 'Réservé',
        start: updated.reservedFrom,
        end: updated.reservedTo,
        color: '#ff4444'
      }];
      this.showReservationForm = false;
      alert('Réservation confirmée ! Vous allez recevoir un email.');
    }, err => {
      console.error(err);
      alert('Erreur lors de la réservation.');
    });
  }
}
