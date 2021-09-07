import Component, { ComponentProps } from '../../app/js/component';

export default class FormButton extends Component.Default {
  constructor(element: ComponentProps) {
    super(element);
  }

  setDisabled = (disabled: Boolean) => {
    const disabledClass = `${this.nRootName}--disabled`;
    if (disabled) {
      this.nRoot.classList.add(disabledClass);
      this.nRoot.setAttribute('disabled', 'true')
    } else {
      this.nRoot.classList.remove(disabledClass);
      this.nRoot.removeAttribute('disabled')
    }
  };

  destroy = () => {
    // Destroy functions
  };
}
