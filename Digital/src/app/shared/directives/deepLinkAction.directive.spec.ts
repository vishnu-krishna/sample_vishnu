import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DeepLinkActionDirective } from './deepLinkAction.directive';

describe('Deep Link Action Directive', () => {
  // Ideally we would use jasmine's spyOnProperty to mock and set different queryParamMap values on the injected ActivatedRoute
  // within each test. Unfortunately the current version of jasmine only supports spyOn(methods) - not spyOnProperty().
  // So use the replay subject below to publish different scenarios
  let queryParamMapSubject: ReplaySubject<ParamMap>;

  let routeValues: {};
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let funcSpy: jasmine.Spy;

  @Component({
    selector: 'agl-test-component',
    template: '<div (aglDeepLinkAction)="functionToCall($event)">This is a test component</div>'
  })
  class TestComponent {
    public functionToCall(arg): void {
      // do nothing
    }
  }

  beforeEach(async(() => {
    queryParamMapSubject = new ReplaySubject<ParamMap>();
    let activatedRouteMock = {
      queryParamMap: queryParamMapSubject
    };

    TestBed.configureTestingModule({
      declarations: [TestComponent, DeepLinkActionDirective],
      providers: [
        {
          provide: ActivatedRoute, useValue: activatedRouteMock
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;
    funcSpy = spyOn(comp, 'functionToCall');
  });

  it('should call bound function when "rdla" query param set to whitelisted value', () => {
    queryParamMapSubject.next(convertToParamMap({ rdla: 1 }));

    fixture.detectChanges();
    expect(funcSpy).toHaveBeenCalledWith('1');
    expect(funcSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call bound function when "rdla" query param set to non-whitelisted value', () => {
    queryParamMapSubject.next(convertToParamMap({ rdla: 'not in the whitelist' }));

    fixture.detectChanges();
    expect(funcSpy).not.toHaveBeenCalled();
  });

  it('should not call bound function when "rdla" query param set to falsy value', () => {
    queryParamMapSubject.next(convertToParamMap({ rdla: 0 }));

    fixture.detectChanges();
    expect(funcSpy).not.toHaveBeenCalled();
  });

  it('should not call bound function when no query param is passed', () => {
    fixture.detectChanges();
    expect(funcSpy).not.toHaveBeenCalled();
  });
});
