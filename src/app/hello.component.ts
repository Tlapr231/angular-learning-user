import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Welcome to the {{name}}</h1>`,
  styles: [`h1 { font-family: Lato; text-align: center}`]
})
export class HelloComponent  {
  @Input() name: string;
}
