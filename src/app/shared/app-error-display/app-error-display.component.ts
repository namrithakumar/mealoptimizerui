import { Component, OnInit } from '@angular/core';
import { ErrorDisplayService } from '../services/error-display.service' ;

@Component({
  selector: 'app-app-error-display',
  templateUrl: './app-error-display.component.html',
  styleUrls: ['./app-error-display.component.css']
})
export class AppErrorDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public hideErrorDisplay() : void {
    console.log('Hide overlay called');
    //this.errorDisplayService.hideOverlay();
  }
}
