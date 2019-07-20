import { GemElement, html, ifDefined } from '@mantou/gem';
import routes from './routes';

import '@mantou/gem/elements/link';

const menus = routes;

class Sidebar extends GemElement {
  render() {
    return html`
      <style>
        :host {
          background: rgba(0, 0, 0, 0.9);
          color: white;
        }
        ol {
          margin: 1em auto;
          padding: 0;
        }
        li gem-link {
          cursor: pointer;
          display: block;
          margin: 0;
          padding: 0 1em;
          line-height: 2;
        }
        li gem-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        li gem-link[active] {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
      <ol>
        ${menus.map(
          route =>
            html`
              <li>
                <gem-link
                  path=${route.path || route.pattern}
                  pattern=${ifDefined(route.path ? route.pattern : undefined)}
                  >${route.title}</gem-link
                >
              </li>
            `,
        )}
      </ol>
    `;
  }
}
customElements.define('app-sidebar', Sidebar);
