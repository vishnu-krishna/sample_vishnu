import { ComponentFixture, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { WhatHappensNextComponent } from './whatHappensNext.component';

import { DebugElement } from '@angular/core';

describe('Tracker Page WhatHappensNextComponent ', () => {
    let comp: WhatHappensNextComponent;
    let fixture: ComponentFixture<WhatHappensNextComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WhatHappensNextComponent]
        });
        fixture = TestBed.createComponent(WhatHappensNextComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe('Test getColValue ', () => {
        it('should return correct value for 1 item content', () => {
            // Assert
            let whatHappensNextContent = getWhatHappensNextContent(1);
            comp.whatHappensNextContent = whatHappensNextContent;
            expect(comp.getColValue()).toBe(12);
        });
        it('should return correct value for 2 item contents', () => {
            // Assert
            let whatHappensNextContent = getWhatHappensNextContent(2);
            comp.whatHappensNextContent = whatHappensNextContent;
            expect(comp.getColValue()).toBe(6);
        });
        it('should return correct value for 3 item contents', () => {
            // Assert
            let whatHappensNextContent = getWhatHappensNextContent(3);
            comp.whatHappensNextContent = whatHappensNextContent;
            expect(comp.getColValue()).toBe(4);
        });
        it('should return correct value for 4 item contents', () => {
            // Assert
            let whatHappensNextContent = getWhatHappensNextContent(4);
            comp.whatHappensNextContent = whatHappensNextContent;
            expect(comp.getColValue()).toBe(4);
        });
        it('should return correct value for 5 item contents', () => {
            // Assert
            let whatHappensNextContent = getWhatHappensNextContent(5);
            comp.whatHappensNextContent = whatHappensNextContent;
            expect(comp.getColValue()).toBe(4);
        });
    });

    function getWhatHappensNextContent(count: number) {
        let whatHappensNextContent = [
            {
                description: 'description 1.',
                heading: 'header 1',
                icon: 'img/bluecircle.png'
            },
            {
                description: 'description 2.',
                heading: 'header 2',
                icon: 'img/bluecircle.png'
            },
            {
                description: 'description 3.',
                heading: 'header 3',
                icon: 'img/bluecircle.png'
            },
            {
                description: 'description 3.',
                heading: 'header 3',
                icon: 'img/bluecircle.png'
            },
            {
                description: 'description 3.',
                heading: 'header 3',
                icon: 'img/bluecircle.png'
            }
        ];
        return whatHappensNextContent.slice(0, count);
    }
});
