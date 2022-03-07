import { TestBed } from '@angular/core/testing';

import { SchedulesService } from './schedule.service';

describe('ScheduleService', () => {
  let service: SchedulesService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    // TestBed.configureTestingModule({});

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SchedulesService(httpClientSpy as any, Storage as any, localStorage as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should make a schedule', () => {
    service.deleteSchedule(1).then(o => {
      o.subscribe(res => {
        expect(res).toBe(1);

      })
    })
  

      

});


});
