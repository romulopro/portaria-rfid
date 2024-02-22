import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UsuariosRegistradosDetailComponent } from './usuarios-registrados-detail.component';

describe('UsuariosRegistrados Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosRegistradosDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: UsuariosRegistradosDetailComponent,
              resolve: { usuariosRegistrados: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(UsuariosRegistradosDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load usuariosRegistrados on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', UsuariosRegistradosDetailComponent);

      // THEN
      expect(instance.usuariosRegistrados).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
