import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogAcesso } from '../log-acesso.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../log-acesso.test-samples';

import { LogAcessoService, RestLogAcesso } from './log-acesso.service';

const requireRestSample: RestLogAcesso = {
  ...sampleWithRequiredData,
  dataAcesso: sampleWithRequiredData.dataAcesso?.format(DATE_FORMAT),
};

describe('LogAcesso Service', () => {
  let service: LogAcessoService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogAcesso | ILogAcesso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LogAcessoService);
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

    it('should create a LogAcesso', () => {
      const logAcesso = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logAcesso).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogAcesso', () => {
      const logAcesso = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logAcesso).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogAcesso', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogAcesso', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogAcesso', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogAcessoToCollectionIfMissing', () => {
      it('should add a LogAcesso to an empty array', () => {
        const logAcesso: ILogAcesso = sampleWithRequiredData;
        expectedResult = service.addLogAcessoToCollectionIfMissing([], logAcesso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logAcesso);
      });

      it('should not add a LogAcesso to an array that contains it', () => {
        const logAcesso: ILogAcesso = sampleWithRequiredData;
        const logAcessoCollection: ILogAcesso[] = [
          {
            ...logAcesso,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogAcessoToCollectionIfMissing(logAcessoCollection, logAcesso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogAcesso to an array that doesn't contain it", () => {
        const logAcesso: ILogAcesso = sampleWithRequiredData;
        const logAcessoCollection: ILogAcesso[] = [sampleWithPartialData];
        expectedResult = service.addLogAcessoToCollectionIfMissing(logAcessoCollection, logAcesso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logAcesso);
      });

      it('should add only unique LogAcesso to an array', () => {
        const logAcessoArray: ILogAcesso[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logAcessoCollection: ILogAcesso[] = [sampleWithRequiredData];
        expectedResult = service.addLogAcessoToCollectionIfMissing(logAcessoCollection, ...logAcessoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logAcesso: ILogAcesso = sampleWithRequiredData;
        const logAcesso2: ILogAcesso = sampleWithPartialData;
        expectedResult = service.addLogAcessoToCollectionIfMissing([], logAcesso, logAcesso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logAcesso);
        expect(expectedResult).toContain(logAcesso2);
      });

      it('should accept null and undefined values', () => {
        const logAcesso: ILogAcesso = sampleWithRequiredData;
        expectedResult = service.addLogAcessoToCollectionIfMissing([], null, logAcesso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logAcesso);
      });

      it('should return initial array if no LogAcesso is added', () => {
        const logAcessoCollection: ILogAcesso[] = [sampleWithRequiredData];
        expectedResult = service.addLogAcessoToCollectionIfMissing(logAcessoCollection, undefined, null);
        expect(expectedResult).toEqual(logAcessoCollection);
      });
    });

    describe('compareLogAcesso', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogAcesso(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogAcesso(entity1, entity2);
        const compareResult2 = service.compareLogAcesso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogAcesso(entity1, entity2);
        const compareResult2 = service.compareLogAcesso(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogAcesso(entity1, entity2);
        const compareResult2 = service.compareLogAcesso(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
