import { Component, OnInit } from '@angular/core';
import { Country } from '../../intefaces/pais-interface';
import { PaisService } from '../../services/pais.service';
import { Region } from '../../intefaces/region.type';

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
export class PorRegionComponent implements OnInit {
  regiones: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: Region = '';
  paises: Country[] = [];
  public initialRegion: Region = 'americas';

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paises = this.paisService.cacheStores.byRegion.countries;
    this.initialRegion =
      this.paisService.cacheStores.byRegion.region ?? 'americas';
    this.activarRegion(this.initialRegion);
  }

  getClase(region: string) {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: Region) {
    console.log('activando region>>>>>>>', region);
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this._buscar(this.regionActiva);
  }

  private _buscar(termino: Region) {
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
