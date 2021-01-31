import { Component, Inject, OnInit } from '@angular/core';
import { CONTAINER_DATA } from '../../services/display.service';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.css']
})
export class CustomNotificationComponent implements OnInit {

  message : String;

  constructor(@Inject(CONTAINER_DATA) message) { 
    this.message = message;
  }

  ngOnInit(): void {
  }

}