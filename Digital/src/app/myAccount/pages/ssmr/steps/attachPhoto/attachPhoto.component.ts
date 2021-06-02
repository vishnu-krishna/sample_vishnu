import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-attach-photo',
    templateUrl: './attachPhoto.component.html',
    styleUrls: ['./attachPhoto.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AttachPhotoComponent implements OnInit {
    public contractList: ContractDisplayViewModel[] = [];
    public isSubmitDisabled: boolean = true;
    public meterIndex = 1;
    public selectedContract: ContractDisplayViewModel;
    public meters;

    public multiple: boolean = false;
    public VALID_FILE_TYPES: string[] = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/tiff'];
    public MAX_FILE_SIZE: number = 5000000; // 5MB

    constructor(
        public ssmrService: ISsmrService,
        public elementRefService: ElementRef
    ) { }

    public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;
        this.ssmrService.selfServicePhotoReadings = this.selectedContract.ssmrModel.meters;
        this.ssmrService.selfServicePhotoReadings.map((m) => m.isThumbnailAvailable = false );
    }

    public onClickThumbnailPlaceholder(index: number) {
        let id = '#file-upload' +  index;
        let inputElement = this.elementRefService.nativeElement.querySelector(id);
        inputElement.click();
    }

    public validateFileTypeAndSize(file: File) {

        if (!file || !this.validateFileType(file.type) || !this.validateFileSize(file.size)) {
            return false;
        }

        return true;
    }

    public validateFileType(fileType: string) {
        return fileType && this.VALID_FILE_TYPES.includes(fileType);
    }

    public validateFileSize(fileSize: number) {
        return fileSize && fileSize <= this.MAX_FILE_SIZE;
    }

    public hasFileError(index: number) {
        if (!this.ssmrService.selfServicePhotoReadings[index] || !this.ssmrService.selfServicePhotoReadings[index].fileMetadata) {
            return false;
        }

        return !this.validateFileTypeAndSize(this.ssmrService.selfServicePhotoReadings[index].fileMetadata);
    }

    public onChangeFileInput(index: number) {
        let id = '#file-upload' + index;
        let inputElement = this.elementRefService.nativeElement.querySelector(id);
        let hasFile: boolean = !!inputElement.files.length;
        let file: File = inputElement.files[0];
        let formData = new FormData();
        this.ssmrService.selfServicePhotoReadings[index].fileMetadata = file;

        if (hasFile && this.validateFileTypeAndSize(file)) { // a file was selected
            formData.append('file', inputElement.files.item(0));
            this.previewFile(file, index); // We only allow one file per meter at this time. Not multiple.
        }
    }

    public previewFile( file: File, index: number) {
        let previewId = '#previewImage' + index;
        let preview;
        let reader: FileReader = new FileReader();

        reader.onloadend = () => {
            this.ssmrService.selfServicePhotoReadings[index].isThumbnailAvailable = true;
            setTimeout(() => {
                preview = this.elementRefService.nativeElement.querySelector(previewId);
                preview.src = reader.result;
                this.ssmrService.selfServicePhotoReadings[index].fileData = reader.result;
                this.isSubmitDisabled = false;
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview = document.getElementById(previewId);
            preview.src = '';
        }
    }

    public onClickCloseThumbnail(index: number) {
        let sourceId = '#file-upload' + index;
        let inputEl = this.elementRefService.nativeElement.querySelector(sourceId);
        inputEl.value = ''; // Empty files array
        this.ssmrService.selfServicePhotoReadings[index].isThumbnailAvailable = false;
        let isSomePhoto = this.ssmrService.selfServicePhotoReadings.some((m) => !!m.isThumbnailAvailable);
        this.isSubmitDisabled = !isSomePhoto;
    }

    public onClickSubmit() {
        if (!this.isSubmitDisabled) {
            this.ssmrService.submissionType = 'Photo';
            this.ssmrService.goToStep('Submitting');
        }
    }

}
