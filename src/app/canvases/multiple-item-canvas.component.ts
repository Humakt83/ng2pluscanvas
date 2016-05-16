import { Component, ViewChild, ElementRef, AfterViewChecked, Input } from 'angular2/core';

@Component({
    selector: 'multipleitemcanvas',
    template: `<canvas #multipleitemcanvas (mousewheel)="zoom($event)" (click)="toggle($event)"></canvas>`
})
export class MultipleItemCanvas implements AfterViewChecked {
    
    @ViewChild('multipleitemcanvas') canvasElement : ElementRef;
    @Input() amount : number;
    
    private circles : any[] = [];
    
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
        let yAxis = 100;
        let xAxis = 200;
        let modulo = this.amount > 999 ? 20: 10; 
        for (let i = 0; i < this.amount; i++) {
            if (i % modulo === 0) { 
                yAxis += 20;
                xAxis = 200;
            } else {
                xAxis += 20;
            }
            let myCircle = new this.simplePaper.Path.Circle(new this.simplePaper.Point(xAxis, yAxis), 8);
            myCircle.fillColor = new paper.Color(Math.random(), Math.random(), Math.random());
            this.circles.push(myCircle);
        }        
        this.simplePaper.view.draw();
    }
    
    zoom(event: MouseWheelEvent) {
        let zoomOut = event.wheelDeltaY < 0;
        if (zoomOut) {
            this.simplePaper.view.zoom = this.simplePaper.view.zoom / 1.25;
        } else {
            this.simplePaper.view.zoom = this.simplePaper.view.zoom * 1.25;
        }
        this.circles.forEach(circle => circle.fillColor = new this.simplePaper.Color(Math.random(), Math.random(), Math.random()));
        this.simplePaper.view.draw();
    }
    
    toggle(event: MouseEvent) {
        this.circles.forEach(circle => {
            if (circle.contains(this.getPoint(event))) {
                if (circle.picked) {
                    circle.fillColor = new this.simplePaper.Color(Math.random(), Math.random(), Math.random());
                } else {
                    circle.fillColor = 'blue';
                }
                circle.picked = !circle.picked;
            }
        });      
        this.simplePaper.view.draw();        
    }    
        
    private getPoint(event: MouseEvent) : any {
        return new this.simplePaper.Point(event.layerX, event.layerY);
    }
    
}