import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'drawingcanvas',
    template: `<canvas #canvas (mousedown)="startDrawing($event)" (mouseup)="stopDrawing($event)"></canvas>`
})
export class DrawingCanvas implements AfterViewChecked {
    
    @ViewChild('canvas') canvasElement : ElementRef;
    
    private rendered : boolean = false;
    private simplePaper : any;
    private path : any;
    
    ngAfterViewChecked() {
        if (this.rendered) return;
        this.rendered = true;
        this.simplePaper = new paper.PaperScope();
        this.simplePaper.setup(this.canvasElement.nativeElement);
        this.simplePaper.view.draw();
    }
    
    startDrawing(event: MouseEvent) {
        console.log(event);
        this.path = new this.simplePaper.Path();
        this.path.strokeColor = 'white';        
        this.path.moveTo(this.getPoint(event));
    }
    
    stopDrawing(event: MouseEvent) {
        this.path.lineTo(this.getPoint(event));
        this.path.closed = true;
        this.path.smooth();
        this.simplePaper.view.draw();
    }
    
    private getPoint(event: MouseEvent) : any {
        return new this.simplePaper.Point(event.layerX, event.layerY);
    }
    
}
