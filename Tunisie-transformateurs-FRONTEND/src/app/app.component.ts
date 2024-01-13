import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setupToggleMenu();
  }

  private setupToggleMenu() {
    const button = this.el.nativeElement.querySelector('.btn-toggle-menu');

    if (button) {
      this.renderer.listen(button, 'click', () => {
        const wrapper = this.el.nativeElement.querySelector('#wrapper');
        if (wrapper) {
          if (wrapper.classList.contains('toggled')) {
            this.renderer.removeClass(wrapper, 'toggled');
          } else {
            this.renderer.addClass(wrapper, 'toggled');
          }
        }
      });
    }
  }
}
