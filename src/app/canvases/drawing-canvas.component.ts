import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'drawingcanvas',
    template: `<canvas #drawingcanvas (mousedown)="startDrawing($event)" (mouseup)="stopDrawing($event)"></canvas>`
})
export class DrawingCanvas implements AfterViewChecked {
    
    @ViewChild('drawingcanvas') canvasElement : ElementRef;
    
    private rendered : boolean = false;
    private simplePaper : any;
    private path : any;
    
    ngAfterViewChecked() {
        if (this.rendered) {
            this.simplePaper.activate(); 
            return;
        }
        this.rendered = true;
        this.simplePaper = new paper.PaperScope();
        let canvas = this.canvasElement.nativeElement;
        canvas.height = 600;
        canvas.width = 600;
        this.simplePaper.setup(canvas);
        this.simplePaper.view.draw();
    }
    
    startDrawing(event: MouseEvent) {
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
