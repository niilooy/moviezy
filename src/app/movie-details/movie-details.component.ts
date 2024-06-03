import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { GeminiService } from '../gemini.service';
import { environment } from '../environments/environment.local';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  url!: string;
  id!: number;
  movie: Movie = new Movie();

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _geminiService: GeminiService
  ) { }


  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this._movieService.getMovieById(this.id).subscribe({
        next: (data) => {
          this.movie = data;
          // this._geminiService.generateRecommendations(`${environment.geminiPrompt} ${this.movie.title}. ${environment.geminiPromptSpecifics}`);
        },
        error: (error) => {
          alert(error);
        },
      });
    });
  }
  updateMovie(id: number) {
    this._router.navigate(['update-movie', id]);
  }
}
