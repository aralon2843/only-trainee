import { getComponent } from './../../app/js/component';
import Component, { ComponentProps, getComponents } from '../../app/js/component';
import Input from '../input/input';
import FormButton from '../form-button/form-button';

export default class Form extends Component.Default {
  nInputs: Input[];
  nFormButton: FormButton;

  constructor(element: ComponentProps) {
    super(element);

    this.nInputs = getComponents('input', this.nRoot).map(
      (component) => new Input(component, this.setStateButton)
    );
    this.nFormButton = new FormButton(getComponent('form-button', this.nRoot));
    this.nRoot.addEventListener('submit', (e) => this.onSubmit(e));
  }

  setStateButton = () => {
    this.nFormButton.setDisabled(
      !this.nInputs.every((input) => {
        if (input.required) {
          return input.error.innerHTML ? false : input.getValue();
        }

        return true;
      })
    );
  };

  onSubmit = (e: Event) => {
    e.preventDefault();

    let data: any = {};
    this.nInputs.forEach((input) => {
      data[input.name] = input.getValue();
    });
    console.log(data);
  };

  destroy = () => {
    // Destroy functions
  };
}
