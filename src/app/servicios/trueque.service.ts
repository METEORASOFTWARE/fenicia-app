import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TruequeService {

	constructor(private http: HttpClient,
		private authService: AuthService,
		private sharedService:SharedService
		) { }

	getTrueque(): Observable<any> {

		var token = localStorage.getItem('token');
		
		const headers = new HttpHeaders({
			"Authorization": "Bearer "+token,
			"Content-Type": "application/x-www-form-urlencoded"
		});

		return this.http.get(`http://fenicia.meteoracolombia.co:8010/4p1/GrupoElementosController.php`,{headers}).pipe(
			catchError(this.sharedService.handleErrorResponse)
		);
	}
}