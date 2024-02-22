import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';

@Component({
  standalone: true,
  templateUrl: './cadastro-usuarios-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CadastroUsuariosDeleteDialogComponent {
  cadastroUsuarios?: ICadastroUsuarios;

  constructor(
    protected cadastroUsuariosService: CadastroUsuariosService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cadastroUsuariosService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
