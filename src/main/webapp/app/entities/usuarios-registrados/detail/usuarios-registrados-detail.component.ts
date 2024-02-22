import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IUsuariosRegistrados } from '../usuarios-registrados.model';

@Component({
  standalone: true,
  selector: 'jhi-usuarios-registrados-detail',
  templateUrl: './usuarios-registrados-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class UsuariosRegistradosDetailComponent {
  @Input() usuariosRegistrados: IUsuariosRegistrados | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
