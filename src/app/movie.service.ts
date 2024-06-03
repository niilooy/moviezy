import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:3000/movies';

  baseImageUrl =
    'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png';

  getMoviesList(): Observable<Movie[]> {
    return this._httpClient.get<Movie[]>(`${this.baseUrl}`);
  }

  addMovie(movie: Movie): Observable<Object> {
    return this._httpClient.post(`${this.baseUrl}`, movie);
  }

  getMovieById(id: number): Observable<Movie> {
    return this._httpClient.get<Movie>(`${this.baseUrl}/${id}`);
  }

  updateMovie(id: number, movie: Movie): Observable<Object> {
    return this._httpClient.put(`${this.baseUrl}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }
  // getRecommendedMoviesList(): Observable<Array<Movie>> {

  // }

  isValidUrl(string: string) {
    const input = document.createElement('input');
    input.type = 'url';
    input.value = string;
    return input.checkValidity();
  }
}
