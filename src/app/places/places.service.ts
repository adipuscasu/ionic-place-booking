import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Array<Place> = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://wp.zillowstatic.com/streeteasy/2/shutterstock_695847865-bcd2e5.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'aab3'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'Romantic place in Paris!',
      'https://media.istockphoto.com/photos/eiffel-tour-and-paris-cityscape-picture-id1133449890?k=6&m=1133449890&s=612x612&w=0&h=Eq8_p2SS4OcOxVUhHDFmZtZIAolCuy94Hhi03BP3W20=',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'as3ds'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://i.pinimg.com/originals/f5/31/1e/f5311e6f15baedcc714091858bfa8a24.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'adsdf '
    ),
  ];
  public placesChanged$ = new  BehaviorSubject<Array<Place>>(this._places);
  public places$ = this.placesChanged$.asObservable();


  constructor(private authService: AuthService) {}

  public getPlace(placeId: string) {
    return [...this._places].find((p) => p.id === placeId);
  }
  public addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    console.log('addPlace got called: ', title, price);
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://media.istockphoto.com/photos/eiffel-tour-and-paris-cityscape-picture-id1133449890?k=6&m=1133449890&s=612x612&w=0&h=Eq8_p2SS4OcOxVUhHDFmZtZIAolCuy94Hhi03BP3W20=',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this._places.push({...newPlace});
    this.placesChanged$.next(this._places);
  }

  public savePlace(updatedPlace: Place) {
    this._places.map((place) => {
      if (place.id === updatedPlace.id) {
        place.title = updatedPlace.title;
        place.description = updatedPlace.description;
        return place;
      }
    });
    this.placesChanged$.next(this._places);
  }
}
