import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParksService, ThemePark } from '../../shared';

@Component({
  selector: 'app-theme-park-details',
  templateUrl: './theme-park-details.component.html',
  styleUrls: ['./theme-park-details.component.css']
})
export class ThemeParkDetailsComponent implements OnInit {

  themePark: ThemePark;

  constructor(
    private route: ActivatedRoute,
    private parksService: ParksService
  ) { }

  canDeactivate(): Promise<boolean> | boolean {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm('Are you sure you\'re ready to leave the park?'));
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.parksService.getParkDetailsFake(params['parkId']))
      .subscribe(
        (park: ThemePark) => {
          this.themePark = park;
        },
        error => {
          console.log('site does not exist', error);
        });
  }

}
