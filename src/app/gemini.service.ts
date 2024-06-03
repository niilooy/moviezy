import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from './environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private genAi: GoogleGenerativeAI;
  constructor() {
    this.genAi = new GoogleGenerativeAI(environment.geminiKey);
  }

  // To generate movie recommendations. Will be implementing it later in movie details section.
  async generateRecommendations(prompt: string) {
    const model = this.genAi.getGenerativeModel({model: 'gemini-pro'});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Remove numerical bullet points and split into an array
    let movies = text.split('\n').map(movie => movie.replace(/^\d+\.\s*/, '').trim());

    // If there are more than 8 movies, slice the array to get only the first 8
    if (movies.length > 8) {
      movies = movies.slice(0, 8);
    }

    console.log(movies);
    return movies;
  }
}
