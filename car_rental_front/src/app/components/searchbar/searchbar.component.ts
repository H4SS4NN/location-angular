import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Output() search = new EventEmitter<string>()
  recherche : string = ''
  
  onSearch(event : Event){
    const target = event.target as HTMLInputElement
    const value = target.value
    this.recherche = value
    this.search.emit(value)
  }
  searchCar(){
    console.log(this.recherche)
  }
}
