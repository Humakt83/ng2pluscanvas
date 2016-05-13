import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'multiplecanvas',
    template: `<canvas #firstcanvas (click)="selectFirst($event)"></canvas>
               <canvas #secondcanvas (click)="selectSecond($event)"></canvas>`
})
export class MultipleCanvas implements AfterViewChecked {
    
    @ViewChild('firstcanvas') firstCanvasElement : ElementRef;
    @ViewChild('secondcanvas') secondCanvasElement : ElementRef;
    
    private rendered : boolean = false;
    private circle : any;
    private firstPaper : any;
    private secondPaper : any;
    
    ngAfterViewChecked() {
        if (this.rendered) return;
        this.rendered = true;
        this.firstPaper = new paper.PaperScope();
        this.setupPaper(this.firstPaper, this.firstCanvasElement.nativeElement);
        this.secondPaper = new paper.PaperScope();
        this.setupPaper(this.secondPaper, this.secondCanvasElement.nativeElement)
    }
    
    selectFirst(event: MouseEvent) {
        this.moveCircle(event, this.firstPaper);
    }
    
    selectSecond(event: MouseEvent) {
        this.moveCircle(event, this.secondPaper);
    }
    
    private moveCircle(event: MouseEvent, paper: any) {
        this.circle.remove();
        paper.activate();
        this.circle = new paper.Path.Circle(this.getPoint(event, paper), 50);
        this.circle.fillColor = 'teal';
        this.redraw();
    }
    
    private setupPaper(paper : any, canvas: any) {
        canvas.height = 600;
        canvas.width = 600;
        paper.setup(canvas);
        if (!this.circle) {
            this.circle = new paper.Path.Circle(new paper.Point(200, 100), 50);
            this.circle.fillColor = 'teal';
        }
        paper.view.draw();
    }
    
    private getPoint(event: MouseEvent, paper: any) : any {
        return new paper.Point(event.layerX, event.layerY);
    }
    
    private redraw() {
        this.firstPaper.view.draw();
        this.secondPaper.view.draw();
    }
    
}