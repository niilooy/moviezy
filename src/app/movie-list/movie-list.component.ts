import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Movie } from '../movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies() {
    this._movieService.getMoviesList().subscribe((data) => {
      this.movies = data;
    });
  }

  updateMovie(id: number) {
    this._router.navigate(['update-movie', id]);
  }

  deleteMovie(id: number) {
    if (
      confirm('Are you sure you want to remove this movie from the watchlist?')
    ) {
      this._movieService.deleteMovie(id).subscribe({
        next: () => {
          this.getMovies();
          this._toastr.success('Movie Removed from Watchlist');
        },
        error: (error) => {
          alert(error);
        },
      });
    }
  }

  movieDetails(id: number) {
    this._router.navigate(['movie-details', id]);
  }

  setBadgeColor(value: number): string {
    if (value >= 0 && value < 5) {
      return 'badge rounded-pill text-bg-danger';
    } else if (value >= 5 && value < 8) {
      return 'badge rounded-pill text-bg-warning';
    } else {
      return 'badge rounded-pill text-bg-success';
    }
  }
}
