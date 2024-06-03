import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss'],
})
export class UpdateMovieComponent {
  id!: number;
  movie: Movie = new Movie();

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];

    this._movieService.getMovieById(this.id).subscribe({
      next: (data) => {
        this.movie = data;
      },
      error: () => this._toastr.error('Internal Server Error'),
    });
  }

  onSubmit() {
    if (
      !this.movie.imageUrl ||
      !this._movieService.isValidUrl(this.movie.imageUrl)
    ) {
      this.movie.imageUrl = this._movieService.baseImageUrl;
    }
    this._movieService.updateMovie(this.id, this.movie).subscribe({
      next: () => {
        this.gotoMoviesList();
        this._toastr.success('Movie Updated');
      },
      error: () => this._toastr.error('Internal Server Error'),
    });
  }

  gotoMoviesList() {
    this._router.navigate(['/movies']);
  }

  getStars(num: number): string {
    let stars = '';
    for (let i = 0; i < num; i++) {
      stars += '⭐';
    }
    return stars;
  }
}
