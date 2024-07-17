import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  
  constructor(private router:Router){}
  items=[{
    label:'userEmail',
    icon:'pi pi-refresh',
    command: ()=>{
      this.router.navigate(['/user']);
    }
  },
  {
    label:'logout',
    icon:'pi pi-time',
    command: ()=>{
      this.router.navigate(['/logout']);
    }
  }
]

}
