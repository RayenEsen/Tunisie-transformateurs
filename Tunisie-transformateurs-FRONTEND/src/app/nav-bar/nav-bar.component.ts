import { Component, OnInit } from '@angular/core';
import { SessionService } from '../utils/session-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public ServiceS : SessionService) { }

  ngOnInit() {
  }

  Disconnect()
  {
    this.ServiceS.sessionDestroy();
  }
}
