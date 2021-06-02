import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { SafeHtmlPipe } from '../../../pipes/safeHtml.pipe';
import { DidYouKnowComponent } from './didYouKnow.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Tracker Did You Know Component', () => {
    let comp: DidYouKnowComponent;
    let fixture: ComponentFixture<DidYouKnowComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DidYouKnowComponent,
                SafeHtmlPipe
            ],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }]
        });

        fixture = TestBed.createComponent(DidYouKnowComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('Should create DidYouKnowComponent component', () => {
        // ASSERT
        expect(comp).toBeDefined();

    });

    it('Should DidYouKnowComponent have as many containers as input list length', () => {
        // ARRANGE
        comp.didYouKnowViewModel = {didYouKnowTitle: 'Did you Know?', didYouKnowMsgList: [{ description: 'des1', heading: 'heading1', icon: 'test.img' },
        { description: 'des2', heading: 'heading2', icon: 'test.img' },
        { description: 'des3', heading: 'heading3', icon: 'test.img' },
        { description: 'des4', heading: 'heading4', icon: 'test.img' }]};

        // ACT
        fixture.detectChanges();
        let containers = de.queryAllNodes(By.css('.didyouknow__container'));

        // ASSERT
        expect(containers.length).toEqual(comp.didYouKnowViewModel.didYouKnowMsgList.length);
    });
});
