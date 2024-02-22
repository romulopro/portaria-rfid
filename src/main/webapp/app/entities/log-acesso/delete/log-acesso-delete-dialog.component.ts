import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogAcesso } from '../log-acesso.model';
import { LogAcessoService } from '../service/log-acesso.service';

@Component({
  standalone: true,
  templateUrl: './log-acesso-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogAcessoDeleteDialogComponent {
  logAcesso?: ILogAcesso;

  constructor(
    protected logAcessoService: LogAcessoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logAcessoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
