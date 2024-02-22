import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogAcessoDetailComponent } from './log-acesso-detail.component';

describe('LogAcesso Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAcessoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogAcessoDetailComponent,
              resolve: { logAcesso: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogAcessoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load logAcesso on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogAcessoDetailComponent);

      // THEN
      expect(instance.logAcesso).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
