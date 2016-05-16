import { Component } from 'angular2/core';
import { CanvasTabs } from '../canvastab/canvastabs.component';
import { CanvasTab } from '../canvastab/canvastab.component';
import { SimpleCanvas } from '../canvases/simple-canvas.component';
import { DrawingCanvas } from '../canvases/drawing-canvas.component';
import { SelectableCanvas } from '../canvases/selectable-canvas.component';
import { MultipleCanvas } from '../canvases/multiple-canvas.component';
import { ZoomingCanvas } from '../canvases/zooming-canvas.component';
import { MultipleItemCanvas } from '../canvases/multiple-item-canvas.component';

@Component({
  selector: 'main',
  templateUrl: 'app/main/main.html',
  directives: [CanvasTabs, CanvasTab, SimpleCanvas, DrawingCanvas, SelectableCanvas, MultipleCanvas, ZoomingCanvas, MultipleItemCanvas]
})
export class MainComponent {
}
