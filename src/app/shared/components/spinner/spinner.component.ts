import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template : '<div class = "overlay" *ngIf = "isLoading$ | async" ><div class="lds-hourglass"></div></div>',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{

  isLoading$ = this.spinnerSVC.isLoading$;

  constructor(private spinnerSVC : SpinnerService){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
