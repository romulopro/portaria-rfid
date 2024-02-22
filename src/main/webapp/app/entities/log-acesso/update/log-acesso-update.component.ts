import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogAcesso } from '../log-acesso.model';
import { LogAcessoService } from '../service/log-acesso.service';
import { LogAcessoFormService, LogAcessoFormGroup } from './log-acesso-form.service';

@Component({
  standalone: true,
  selector: 'jhi-log-acesso-update',
  templateUrl: './log-acesso-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogAcessoUpdateComponent implements OnInit {
  isSaving = false;
  logAcesso: ILogAcesso | null = null;

  editForm: LogAcessoFormGroup = this.logAcessoFormService.createLogAcessoFormGroup();

  constructor(
    protected logAcessoService: LogAcessoService,
    protected logAcessoFormService: LogAcessoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logAcesso }) => {
      this.logAcesso = logAcesso;
      if (logAcesso) {
        this.updateForm(logAcesso);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logAcesso = this.logAcessoFormService.getLogAcesso(this.editForm);
    if (logAcesso.id !== null) {
      this.subscribeToSaveResponse(this.logAcessoService.update(logAcesso));
    } else {
      this.subscribeToSaveResponse(this.logAcessoService.create(logAcesso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogAcesso>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(logAcesso: ILogAcesso): void {
    this.logAcesso = logAcesso;
    this.logAcessoFormService.resetForm(this.editForm, logAcesso);
  }
}
