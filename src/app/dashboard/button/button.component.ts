import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() showForm: boolean | undefined;
  @Output() buttonClickedEvent = new EventEmitter();

  buttonClicked() {
    this.buttonClickedEvent.emit();
  }
}
