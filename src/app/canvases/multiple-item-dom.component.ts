import { Component, ViewChild, ElementRef, OnInit, Input } from 'angular2/core';

@Component({
    selector: 'multipleitemdom',
    template: `<div *ngFor="let item of items" class="item" [class.itemSelected]="item.selected" (click)="clickItem(item)">{{item.val}}</div>`
})
export class MultipleItemDom implements OnInit {
    
    items : any[] = [];
    
    ngOnInit() {
        for (let i = 0; i < 10000; i++) {
            this.items.push({val: i});
        }
    }
    
    clickItem(item) {
        item.selected = !item.selected;
    }
    
}