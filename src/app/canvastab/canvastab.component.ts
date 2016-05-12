import { Component, Input } from 'angular2/core';

@Component({
    selector: 'canvastab',
    template: `
        <div [hidden]="!active" class="pane">
            <ng-content></ng-content>
        </div>
    `
})
export class CanvasTab {

    @Input('tabTitle') tabTitle: string;
    @Input() active = false;
  
}