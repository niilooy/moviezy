import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Movie } from '../movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  movie: Movie = new Movie();

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  onSubmit() {
    //console.log(this.movie);
    if (
      !this.movie.imageUrl ||
      !this._movieService.isValidUrl(this.movie.imageUrl)
    ) {
      this.movie.imageUrl = this._movieService.baseImageUrl;
    }
    this.saveMovie();
  }

  saveMovie() {
    this._movieService.addMovie(this.movie).subscribe({
      next: () => {
        this.gotoMoviesList();
        this._toastr.success('Added to Watchlist');
      },
      error: () => this._toastr.error('Internal Server Error'),
    });
  }

  gotoMoviesList() {
    this._router.navigate(['/movies']);
  }

  getStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '⭐';
    }
    return stars;
  }
}
