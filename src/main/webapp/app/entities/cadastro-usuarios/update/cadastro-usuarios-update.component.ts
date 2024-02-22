import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';
import { CadastroUsuariosFormService, CadastroUsuariosFormGroup } from './cadastro-usuarios-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cadastro-usuarios-update',
  templateUrl: './cadastro-usuarios-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CadastroUsuariosUpdateComponent implements OnInit {
  isSaving = false;
  cadastroUsuarios: ICadastroUsuarios | null = null;

  editForm: CadastroUsuariosFormGroup = this.cadastroUsuariosFormService.createCadastroUsuariosFormGroup();

  constructor(
    protected cadastroUsuariosService: CadastroUsuariosService,
    protected cadastroUsuariosFormService: CadastroUsuariosFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadastroUsuarios }) => {
      this.cadastroUsuarios = cadastroUsuarios;
      if (cadastroUsuarios) {
        this.updateForm(cadastroUsuarios);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cadastroUsuarios = this.cadastroUsuariosFormService.getCadastroUsuarios(this.editForm);
    if (cadastroUsuarios.id !== null) {
      this.subscribeToSaveResponse(this.cadastroUsuariosService.update(cadastroUsuarios));
    } else {
      this.subscribeToSaveResponse(this.cadastroUsuariosService.create(cadastroUsuarios));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICadastroUsuarios>>): void {
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

  protected updateForm(cadastroUsuarios: ICadastroUsuarios): void {
    this.cadastroUsuarios = cadastroUsuarios;
    this.cadastroUsuariosFormService.resetForm(this.editForm, cadastroUsuarios);
  }
}
