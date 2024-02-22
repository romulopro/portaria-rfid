import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IUsuariosRegistrados } from '../usuarios-registrados.model';
import { UsuariosRegistradosService } from '../service/usuarios-registrados.service';

@Component({
  standalone: true,
  templateUrl: './usuarios-registrados-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class UsuariosRegistradosDeleteDialogComponent {
  usuariosRegistrados?: IUsuariosRegistrados;

  constructor(
    protected usuariosRegistradosService: UsuariosRegistradosService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuariosRegistradosService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
