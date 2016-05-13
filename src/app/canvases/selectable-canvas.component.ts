import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'selectablecanvas',
    template: `<canvas #selectablecanvas (click)="toggle($event)"></canvas>`
})
export class SelectableCanvas implements AfterViewChecked {
    
    @ViewChild('selectablecanvas') canvasElement : ElementRef;
    
    private rendered : boolean = false;
    private rect : any;
    private circle : any;
    private simplePaper : any;
    
    ngAfterViewChecked() {
        if (this.rendered) return;
        this.rendered = true;
        this.simplePaper = new paper.PaperScope();
        let canvas= this.canvasElement.nativeElement;
        canvas.height = 600;
        canvas.width = 600;
        this.simplePaper.setup(canvas);
        this.rect = new this.simplePaper.Path.Rectangle(new this.simplePaper.Point(100, 100), new this.simplePaper.Size(200, 100));
        this.rect.fillColor = 'green';
        this.rect.strokeColor = 'white';
        this.rect.strokeWidth = 3;
        this.circle = new this.simplePaper.Path.Circle(new this.simplePaper.Point(200, 100), 50);
        this.circle.fillColor = 'teal';
        this.simplePaper.view.draw();
    }
    
    toggle(event: MouseEvent) {
        if (this.rect.contains(this.getPoint(event))) {
            if (this.rect.selected) {
                this.rect.fillColor = 'green';
            } else {
                this.rect.fillColor = 'orange';
            }
            this.rect.selected = !this.rect.selected;
        }
        if (this.circle.contains(this.getPoint(event))) {
            if (this.circle.selected) {
                this.circle.fillColor = 'teal';
            } else {
                this.circle.fillColor = 'white';
            }
            this.circle.selected = !this.circle.selected;
        }
        this.simplePaper.view.draw();
        
    }
    
    private getPoint(event: MouseEvent) : any {
        return new this.simplePaper.Point(event.layerX, event.layerY);
    }
    
}