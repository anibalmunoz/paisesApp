import { Component } from '@angular/core';
import { Country } from '../../intefaces/pais-interface';
import { PaisService } from '../../services/pais.service';

type Region = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';
@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  getClase(region: string) {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this._buscar(this.regionActiva);
  }

  private _buscar(termino: string) {
    this.paisService.buscarRegion(termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        console.log('Error');
        this.paises = [];
        console.info(err);
      }
    );
  }
}
