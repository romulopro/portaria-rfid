import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CadastroUsuariosDetailComponent } from './cadastro-usuarios-detail.component';

describe('CadastroUsuarios Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUsuariosDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CadastroUsuariosDetailComponent,
              resolve: { cadastroUsuarios: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CadastroUsuariosDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cadastroUsuarios on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CadastroUsuariosDetailComponent);

      // THEN
      expect(instance.cadastroUsuarios).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
