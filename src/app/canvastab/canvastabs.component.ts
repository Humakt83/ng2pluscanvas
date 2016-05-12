import { Component, ContentChildren, QueryList, AfterContentInit } from 'angular2/core';
import { CanvasTab } from './canvastab.component';

@Component({
    selector: 'canvastabs',
    template: `
        <ul class="nav nav-tabs">
            <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
                <a href="#">{{tab.tabTitle}}</a>
            </li>
        </ul>
        <ng-content></ng-content>
    `,
})
export class CanvasTabs implements AfterContentInit {

    @ContentChildren(CanvasTab) tabs: QueryList<CanvasTab>;

    ngAfterContentInit() {    
        let activeTabs = this.tabs.filter((tab)=>tab.active);
        if(activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }



    selectTab(tab: CanvasTab) {    
        this.tabs.toArray().forEach(tab => tab.active = false);
        tab.active = true;
    }
}
