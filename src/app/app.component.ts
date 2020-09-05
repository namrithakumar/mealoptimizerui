import { Component } from '@angular/core';
import { UserInputService } from './shared/services/user-input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actionSelected : String;

  constructor(private userInputService : UserInputService) {
    this.userInputService.onActionSelected.subscribe((action : String) => this.actionSelected=this.actionSelected);
  }
}