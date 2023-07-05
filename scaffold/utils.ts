export function convertComponentNameToClassName(componentName: string) {
  assertComponentNameIsValid(componentName);
  // Convert to PascalCase and remove hyphens at beginning/end of string
  return componentName.split("-").map(part => part[0].toUpperCase() + part.substring(1).toLowerCase()).join("");
}

export function generateComponentFileContent(componentName: string) {
  assertComponentNameIsValid(componentName);
  const className = convertComponentNameToClassName(componentName);
  let content = `
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('${componentName}')
export class ${className} extends LitElement {
  @property()
  text = 'Text';

  render() {
    return html\`<p>\${this.text}</p>\`;
  }
}`;
  return `${content}\n`
}

export function assertComponentNameIsValid(componentName: string) {
  if (!isValidComponentName(componentName)) {
    throw new Error(`${componentName}: Invalid name format\nComponent name must be kebab-case`);
  }
}
export function isValidComponentName(componentName: string) {
  return /^[a-z]+(-?[a-z]+)*$/i.test(componentName)
}