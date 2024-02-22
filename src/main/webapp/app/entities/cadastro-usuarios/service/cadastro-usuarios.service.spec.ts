import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cadastro-usuarios.test-samples';

import { CadastroUsuariosService, RestCadastroUsuarios } from './cadastro-usuarios.service';

const requireRestSample: RestCadastroUsuarios = {
  ...sampleWithRequiredData,
  dataInclusao: sampleWithRequiredData.dataInclusao?.format(DATE_FORMAT),
};

describe('CadastroUsuarios Service', () => {
  let service: CadastroUsuariosService;
  let httpMock: HttpTestingController;
  let expectedResult: ICadastroUsuarios | ICadastroUsuarios[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CadastroUsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CadastroUsuarios', () => {
      const cadastroUsuarios = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cadastroUsuarios).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CadastroUsuarios', () => {
      const cadastroUsuarios = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cadastroUsuarios).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CadastroUsuarios', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CadastroUsuarios', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CadastroUsuarios', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCadastroUsuariosToCollectionIfMissing', () => {
      it('should add a CadastroUsuarios to an empty array', () => {
        const cadastroUsuarios: ICadastroUsuarios = sampleWithRequiredData;
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing([], cadastroUsuarios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cadastroUsuarios);
      });

      it('should not add a CadastroUsuarios to an array that contains it', () => {
        const cadastroUsuarios: ICadastroUsuarios = sampleWithRequiredData;
        const cadastroUsuariosCollection: ICadastroUsuarios[] = [
          {
            ...cadastroUsuarios,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing(cadastroUsuariosCollection, cadastroUsuarios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CadastroUsuarios to an array that doesn't contain it", () => {
        const cadastroUsuarios: ICadastroUsuarios = sampleWithRequiredData;
        const cadastroUsuariosCollection: ICadastroUsuarios[] = [sampleWithPartialData];
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing(cadastroUsuariosCollection, cadastroUsuarios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cadastroUsuarios);
      });

      it('should add only unique CadastroUsuarios to an array', () => {
        const cadastroUsuariosArray: ICadastroUsuarios[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cadastroUsuariosCollection: ICadastroUsuarios[] = [sampleWithRequiredData];
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing(cadastroUsuariosCollection, ...cadastroUsuariosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cadastroUsuarios: ICadastroUsuarios = sampleWithRequiredData;
        const cadastroUsuarios2: ICadastroUsuarios = sampleWithPartialData;
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing([], cadastroUsuarios, cadastroUsuarios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cadastroUsuarios);
        expect(expectedResult).toContain(cadastroUsuarios2);
      });

      it('should accept null and undefined values', () => {
        const cadastroUsuarios: ICadastroUsuarios = sampleWithRequiredData;
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing([], null, cadastroUsuarios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cadastroUsuarios);
      });

      it('should return initial array if no CadastroUsuarios is added', () => {
        const cadastroUsuariosCollection: ICadastroUsuarios[] = [sampleWithRequiredData];
        expectedResult = service.addCadastroUsuariosToCollectionIfMissing(cadastroUsuariosCollection, undefined, null);
        expect(expectedResult).toEqual(cadastroUsuariosCollection);
      });
    });

    describe('compareCadastroUsuarios', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCadastroUsuarios(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCadastroUsuarios(entity1, entity2);
        const compareResult2 = service.compareCadastroUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCadastroUsuarios(entity1, entity2);
        const compareResult2 = service.compareCadastroUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCadastroUsuarios(entity1, entity2);
        const compareResult2 = service.compareCadastroUsuarios(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
