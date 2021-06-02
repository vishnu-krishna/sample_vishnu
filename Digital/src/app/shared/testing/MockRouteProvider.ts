import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

export class MockActivatedRoute extends ActivatedRoute {
  public params: Observable<Params>;

  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = Observable.of(parameters);
  }
}

export class MockRouter {
  // navigate = jasmine.createSpy('navigate');

  public navigate(urls: string[]) {
      return urls[0];
  }

  public navigateByUrl(url: string) { return url;  }
}
