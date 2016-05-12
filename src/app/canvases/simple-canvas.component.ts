import { Component, ViewChild, ElementRef, AfterViewChecked } from 'angular2/core';

@Component({
    selector: 'simplecanvas',
    template: `<canvas #canvas></canvas>`
})
export class SimpleCanvas implements AfterViewChecked {
    
    @ViewChild('canvas') canvasElement : ElementRef;
    
    private rendered : boolean = false;
    
    ngAfterViewChecked() {
        if (this.rendered) return;
        this.rendered = true;
        let simplePaper = new paper.PaperScope();
        simplePaper.setup(this.canvasElement.nativeElement);
        let path = new simplePaper.Path();
	    path.strokeColor = 'white';
	    path.moveTo(new simplePaper.Point(10, 10));
	    path.lineTo(new simplePaper.Point(100, 100));
        let rect = new simplePaper.Path.Rectangle(new simplePaper.Point(200, 200), new simplePaper.Size(200, 100));
        rect.fillColor = 'red';
        rect.strokeColor = 'white';
        rect.strokeWidth = 3;
        let myCircle = new simplePaper.Path.Circle(new simplePaper.Point(300, 200), 50);
        myCircle.fillColor = 'blue';
        simplePaper.view.draw();
    }
    
}