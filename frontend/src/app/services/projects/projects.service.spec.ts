import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Projects } from '../models/projects';
import { Storage } from '@ionic/storage';
import { ProjectsService } from './projects.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { of } from 'rxjs';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpClientSpy: { get: jasmine.Spy };



  beforeEach(() => {
    // TestBed.configureTestingModule({});

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProjectsService(httpClientSpy as any, Storage as any, localStorage as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  fit('porjects-get', () => {
    const mockProjects: Projects[] = [
      {
        id: 1,
        seasons_id: 3,
        nameProject: "azul",
        startDateProject: new Date("2021-11-21"),
        endDateProject: new Date("2021-11-21"),
        published: true,
        orchestrationProject: "1/2/1",
        season: {
          id: 3,
          name: "primavera",
          starDate: new Date("2021-11-01"),
          endDate: new Date("2021-11-07"),
          noteSeason: "adios",
        }
      },
      {
        id: 7,
        seasons_id: 2,
        nameProject: "verde",
        startDateProject: new Date("2021-10-15"),
        endDateProject: new Date("2021-10-21"),
        published: true,
        orchestrationProject: "3/2/1",
        season: {
          id: 2,
          name: "varano",
          starDate: new Date("2021-11-10"),
          endDate: new Date("2021-11-17"),
          noteSeason: "buenos dias",
        }
      }
    ];
    httpClientSpy.get.and.returnValue(of(mockProjects));

  });

  fit('should return an error when the server returns a 404', async (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    (await service.getProjects()).subscribe(
      project => done.fail('expected an error, not project'),
      error => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    );
  });


});
