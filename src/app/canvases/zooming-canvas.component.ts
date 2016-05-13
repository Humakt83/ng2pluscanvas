import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'zoomingcanvas',
    template: `<canvas #zoomingcanvas (mousewheel)="zoom($event)"></canvas>`
})
export class ZoomingCanvas implements AfterViewChecked {
    
    @ViewChild('zoomingcanvas') canvasElement : ElementRef;
    
    private rendered : boolean = false;
    private simplePaper : any;
    
    ngAfterViewChecked() {
        if (this.rendered) return;
        this.rendered = true;
        this.simplePaper = new paper.PaperScope();
        let canvas = this.canvasElement.nativeElement;
        canvas.height = 600;
        canvas.width = 600;
        this.simplePaper.setup(canvas);        
        let myCircle = new this.simplePaper.Path.Circle(new this.simplePaper.Point(300, 200), 100);
        myCircle.fillColor = 'purple';
        this.simplePaper.view.draw();
    }
    
    zoom(event: MouseWheelEvent) {
        let zoomOut = event.wheelDeltaY < 0;
        if (zoomOut) {
            this.simplePaper.view.zoom = this.simplePaper.view.zoom / 1.25;
        } else {
            this.simplePaper.view.zoom = this.simplePaper.view.zoom * 1.25;
        }
        this.simplePaper.view.draw();
    }
    
}