import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage : String;
  
  constructor(private router:Router,  private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( (data: {errorMessage: String} ) => {
      this.errorMessage = data['errorMessage'];
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/app-info','home']);
  }
}