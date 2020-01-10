import { GemElement, html, render } from '@mantou/gem';

import '@mantou/gem/elements/route';

import './app-a-tabs';

import routes from './routes';

export default class App extends GemElement {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
        }
      </style>
      <app-a-tabs></app-a-tabs>
      <gem-route .routes=${routes}></gem-route>
    `;
  }
}
customElements.define('app-a-root', App);

render(
  html`
    <style>
      body {
        margin: 0;
      }
    </style>
    <app-a-root></app-a-root>
  `,
  document.body,
);
