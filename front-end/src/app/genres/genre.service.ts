import { Injectable }    from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Genre } from './genre';
import { Movie } from '../movies/movie';

@Injectable()
export class GenreService {
  private genresServiceUrl = 'http://online-movies.azurewebsites.net/api/Genres/';
  private getGenreUrl = this.genresServiceUrl + 'GetGenre/';
  private getGenresUrl = this.genresServiceUrl + 'GetGenres/';

  constructor(private http: Http) {

  }

  getGenre(genreId: number): Promise<Genre> {
    return this.http.get(this.getGenreUrl + genreId)
      .toPromise()
      .then(response => response.json() as Genre)
      .catch(this.handleError);
  }

  getGenres(): Promise<Genre[]> {
    return this.http.get(this.getGenresUrl)
      .toPromise()
      .then(response => response.json() as Genre[])
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}