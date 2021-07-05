import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  searchText
  MODULES = [
    { route: "surveys", name: "Encuestas", icon: "fa fa-file-alt fa-4x" },
    { route: "reports", name: "Reportes", icon: "fa fa-chart-pie fa-4x" },
    // { route: "admin", name: "Administración", icon: "fa fa-tools fa-4x", disabled: false },
    { route: "security", name: "Seguridad", icon: "fa fa-user-shield fa-4x" },
  ]

  constructor() {}

  ngOnInit() {}
}
