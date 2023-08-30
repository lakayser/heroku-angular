import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[customButton]',
  standalone: true
})
export class CustomButtonDirective implements OnInit {

  private el              : ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private _colorsText     : string = 'text-white';
  private _bgColor        : string = '';
  private _borderType     : string = 'rounded-full';
  private _borderColor    : string = 'border-white';
  private _widthResponsive: string = 'lg:px-[4rem]';
  private _width          : string = 'px-[2rem]';

  @Input() set borderColor(value: string) {
    this._borderColor = value;
    this.setStyle();
  };
  @Input() set widthResponsive(value: string) {
    this._widthResponsive = value;
    this.setStyle();
  };
  @Input() set width(value: string) {
    this._width = value;
    this.setStyle();
  };
  @Input() set bg(value: string) {
    this._bgColor = value;
    this.setStyle();
  };

  ngOnInit(): void {
    this.setStyle();
  };

  public setStyle(): void {
    if(!this.el) return;
    this.el.nativeElement.className = `
      ${this._colorsText} ${this._bgColor} ${this._borderType} ${this._borderColor}
      ${this._widthResponsive} ${this._width}
      focus:outline-none focus:ring-1 border
      font-medium text-sm py-2.5 mr-2 mb-2 mt-4 opacity-100
    `;
  }; 

};