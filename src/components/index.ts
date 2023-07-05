export * from './button';
const appElement = document.getElementById('app');

if (appElement instanceof HTMLDivElement) {
  appElement.innerHTML = `<simple-btn text="I'm a button" size="sm"></simple-btn>`
}