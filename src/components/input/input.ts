import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
  input: HTMLInputElement;
  name: string;
  value: string;
  required: boolean;
  regex: RegExp;
  error: HTMLElement;
  type: string;
  onChange: () => void;

  constructor(element: ComponentProps, onChange: () => void) {
    super(element);

    this.input = this.nRoot.querySelector('input');
    this.name = this.input.name;
    this.value = this.input.value;
    this.required = this.input.hasAttribute('data-required');
    this.onChange = onChange;
    this.regex;
    this.type = this.input.type;
    this.error = this.getElement('error');

    fromEvent(this.input, 'input').subscribe(this.onChangeInput);
  }

  getValue = () => this.input.value;

  validateEmail = (email: string) => {
    return this.regex.test(email);
  };

  onChangeInput = (e: Event) => {
    this.onChange();

    if (this.type === 'email') {
      this.regex = /\S+@\S+\.\S+/;

      if (this.validateEmail(this.getValue())) {
        this.setError('');
      } else {
        this.setError('Неверный email');
      }
    }

    if ((<HTMLInputElement>e.target)?.value?.length) {
      this.nRoot.classList.add('fill');
    } else {
      this.nRoot.classList.remove('fill');
    }
  };

  setError = (message: string) => {
    this.error.innerHTML = message;
  };

  destroy = () => {};
}
