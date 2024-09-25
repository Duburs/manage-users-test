import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss',
})
export class ButtonToggleComponent {
  value = false;

  @Output() isTicked = new EventEmitter(false);

  emit(): void {
    this.isTicked.emit(this.value);
  }
}
