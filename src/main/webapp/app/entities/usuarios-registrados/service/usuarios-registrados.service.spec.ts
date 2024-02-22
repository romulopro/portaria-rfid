import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuariosRegistrados } from '../usuarios-registrados.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../usuarios-registrados.test-samples';

import { UsuariosRegistradosService } from './usuarios-registrados.service';

const requireRestSample: IUsuariosRegistrados = {
  ...sampleWithRequiredData,
};

describe('UsuariosRegistrados Service', () => {
  let service: UsuariosRegistradosService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuariosRegistrados | IUsuariosRegistrados[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuariosRegistradosService);
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

    it('should create a UsuariosRegistrados', () => {
      const usuariosRegistrados = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuariosRegistrados).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UsuariosRegistrados', () => {
      const usuariosRegistrados = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuariosRegistrados).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UsuariosRegistrados', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UsuariosRegistrados', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UsuariosRegistrados', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuariosRegistradosToCollectionIfMissing', () => {
      it('should add a UsuariosRegistrados to an empty array', () => {
        const usuariosRegistrados: IUsuariosRegistrados = sampleWithRequiredData;
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing([], usuariosRegistrados);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuariosRegistrados);
      });

      it('should not add a UsuariosRegistrados to an array that contains it', () => {
        const usuariosRegistrados: IUsuariosRegistrados = sampleWithRequiredData;
        const usuariosRegistradosCollection: IUsuariosRegistrados[] = [
          {
            ...usuariosRegistrados,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing(usuariosRegistradosCollection, usuariosRegistrados);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UsuariosRegistrados to an array that doesn't contain it", () => {
        const usuariosRegistrados: IUsuariosRegistrados = sampleWithRequiredData;
        const usuariosRegistradosCollection: IUsuariosRegistrados[] = [sampleWithPartialData];
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing(usuariosRegistradosCollection, usuariosRegistrados);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuariosRegistrados);
      });

      it('should add only unique UsuariosRegistrados to an array', () => {
        const usuariosRegistradosArray: IUsuariosRegistrados[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuariosRegistradosCollection: IUsuariosRegistrados[] = [sampleWithRequiredData];
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing(usuariosRegistradosCollection, ...usuariosRegistradosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuariosRegistrados: IUsuariosRegistrados = sampleWithRequiredData;
        const usuariosRegistrados2: IUsuariosRegistrados = sampleWithPartialData;
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing([], usuariosRegistrados, usuariosRegistrados2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuariosRegistrados);
        expect(expectedResult).toContain(usuariosRegistrados2);
      });

      it('should accept null and undefined values', () => {
        const usuariosRegistrados: IUsuariosRegistrados = sampleWithRequiredData;
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing([], null, usuariosRegistrados, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuariosRegistrados);
      });

      it('should return initial array if no UsuariosRegistrados is added', () => {
        const usuariosRegistradosCollection: IUsuariosRegistrados[] = [sampleWithRequiredData];
        expectedResult = service.addUsuariosRegistradosToCollectionIfMissing(usuariosRegistradosCollection, undefined, null);
        expect(expectedResult).toEqual(usuariosRegistradosCollection);
      });
    });

    describe('compareUsuariosRegistrados', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuariosRegistrados(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuariosRegistrados(entity1, entity2);
        const compareResult2 = service.compareUsuariosRegistrados(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuariosRegistrados(entity1, entity2);
        const compareResult2 = service.compareUsuariosRegistrados(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuariosRegistrados(entity1, entity2);
        const compareResult2 = service.compareUsuariosRegistrados(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
