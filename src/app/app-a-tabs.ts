import { GemElement, html } from '@mantou/gem';
import routes from './routes';

import { Link } from '@mantou/gem/elements/link';
import '@mantou/gem/elements/link';

declare global {
  interface HTMLElementTagNameMap {
    'gem-link': Link;
  }
}

const tabs = routes.filter(e => !e.tabIgnore);

class Tabs extends GemElement {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          line-height: 2;
        }
        gem-link {
          margin: 0 1em;
          padding: 0 0.5em;
          border-bottom: 4px solid transparent;
          text-decoration: none;
          color: black;
        }
        gem-link[active] {
          border-bottom-color: blue;
        }
      </style>
      ${tabs.map(
        route =>
          html`
            <gem-link path=${route.pattern}>${route.title}</gem-link>
          `,
      )}
    `;
  }
}
customElements.define('app-a-tabs', Tabs);
