import { Component } from 'angular2/core';
import { CanvasTabs } from '../canvastab/canvastabs.component';
import { CanvasTab } from '../canvastab/canvastab.component';
import { SimpleCanvas } from '../canvases/simple-canvas.component';

@Component({
  selector: 'main',
  templateUrl: 'app/main/main.html',
  directives: [CanvasTabs, CanvasTab, SimpleCanvas]
})
export class MainComponent {
}
