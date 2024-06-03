import { Component, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Movie } from '../movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recommended-movie-list',
  templateUrl: './recommended-movie-list.component.html',
  styleUrls: ['./recommended-movie-list.component.scss']
})
export class RecommendedMovieListComponent {
  movieTitle!: string;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecommendedMovies();
  }
  private getRecommendedMovies() {
    this._movieService.getMoviesList().subscribe((data) => {
      this.movies = data;
    });
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
