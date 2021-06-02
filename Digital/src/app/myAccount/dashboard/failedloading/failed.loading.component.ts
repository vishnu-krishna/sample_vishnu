import { Component }  from '@angular/core';

@Component({
    selector: 'agl-failed-loading',
    templateUrl: './failed.loading.component.html',
    styleUrls: ['./failed.loading.component.scss']
})
export class FailedLoadingComponent {

    public images: Images[] = [
      { title: 'Pay and view bills', url: 'img/long-load-2.png' },
      { title: 'A final bill projection cost', url: 'img/long-load-4.png' },
      { title: 'View and download past bills', url: 'img/long-load-5.png' },
      { title: 'Pay and view bills', url: 'img/long-load-2.png' },
      { title: 'A final bill projection cost', url: 'img/long-load-4.png' },
    ];

    public syncLoadingError: Boolean = false;
}

interface Images {
    title: string;
    url: string;
}
