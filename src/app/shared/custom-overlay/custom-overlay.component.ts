import { Component, Inject, Injector, OnInit } from '@angular/core';
import { CONTAINER_DATA, OverlayDisplayService } from '../services/overlay-display.service';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.css']
})
export class CustomOverlayComponent implements OnInit {

  message : String;

  constructor(private overlayDisplayService : OverlayDisplayService,
              @Inject(CONTAINER_DATA) message) {
                this.message = message;                
               }

  ngOnInit(): void {
  }

  public hideOverlayDisplay() {
    this.overlayDisplayService.hideOverlay();
  }
}
