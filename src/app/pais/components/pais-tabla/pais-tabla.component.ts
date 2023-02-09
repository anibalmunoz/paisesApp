import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../intefaces/pais-interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
})
export class PaisTablaComponent {
  @Input()
  paises: Country[] = [];

  constructor() {}
}
