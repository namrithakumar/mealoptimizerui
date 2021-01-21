import { Component, OnInit } from '@angular/core';
import { OverlayDisplayService } from '../services/overlay-display.service';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.css']
})
export class CustomOverlayComponent implements OnInit {

  constructor(private overlayDisplayService : OverlayDisplayService) { }

  ngOnInit(): void {
  }

  public hideOverlayDisplay() {
    this.overlayDisplayService.hideOverlay();
  }
}
