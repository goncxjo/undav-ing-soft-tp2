import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent implements OnInit {
  searchText
  MODULES = [
    { route: "users", name: "Usuarios", icon: "fa fa-users fa-4x" },
    { route: "roles", name: "Roles", icon: "fa fa-user-tag fa-4x" },
  ]

  constructor() {}

  ngOnInit() {}
}
