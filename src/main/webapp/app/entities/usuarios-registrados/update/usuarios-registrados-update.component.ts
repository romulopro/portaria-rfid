import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUsuariosRegistrados } from '../usuarios-registrados.model';
import { UsuariosRegistradosService } from '../service/usuarios-registrados.service';
import { UsuariosRegistradosFormService, UsuariosRegistradosFormGroup } from './usuarios-registrados-form.service';

@Component({
  standalone: true,
  selector: 'jhi-usuarios-registrados-update',
  templateUrl: './usuarios-registrados-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UsuariosRegistradosUpdateComponent implements OnInit {
  isSaving = false;
  usuariosRegistrados: IUsuariosRegistrados | null = null;

  editForm: UsuariosRegistradosFormGroup = this.usuariosRegistradosFormService.createUsuariosRegistradosFormGroup();

  constructor(
    protected usuariosRegistradosService: UsuariosRegistradosService,
    protected usuariosRegistradosFormService: UsuariosRegistradosFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuariosRegistrados }) => {
      this.usuariosRegistrados = usuariosRegistrados;
      if (usuariosRegistrados) {
        this.updateForm(usuariosRegistrados);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuariosRegistrados = this.usuariosRegistradosFormService.getUsuariosRegistrados(this.editForm);
    if (usuariosRegistrados.id !== null) {
      this.subscribeToSaveResponse(this.usuariosRegistradosService.update(usuariosRegistrados));
    } else {
      this.subscribeToSaveResponse(this.usuariosRegistradosService.create(usuariosRegistrados));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuariosRegistrados>>): void {
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

  protected updateForm(usuariosRegistrados: IUsuariosRegistrados): void {
    this.usuariosRegistrados = usuariosRegistrados;
    this.usuariosRegistradosFormService.resetForm(this.editForm, usuariosRegistrados);
  }
}
