import { Component, OnInit } from '@angular/core';
import { Country } from '../../intefaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: String = '';

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paises = this.paisService.cacheStores.byCapital.countries;
    this.initialValue = this.paisService.cacheStores.byCapital.term;
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.isLoading = true;

    this.paisService.buscarCapital(this.termino).subscribe((paises) => {
      this.paises = paises;
      this.hayError = paises.length == 0;
      this.isLoading = false;
    });
  }
}
