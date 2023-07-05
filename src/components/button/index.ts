import { LitElement, html, customElement, property } from 'lit-element';
import styles from './styles';

@customElement('simple-btn')
export class SimpleButton extends LitElement {
  static styles = styles;

  @property()
  text = 'Text';

  @property()
  size: 'sm' | 'md' | 'lg' = 'md';

  render() {
    return html`<button class="btn-${this.size}">${this.text}</button>`;
  }
}