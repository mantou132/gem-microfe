import { GemElement } from '@mantou/gem';
import { Route } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/route';
import './app-a-tabs';
declare global {
    interface HTMLElementTagNameMap {
        'gem-route': Route;
    }
}
export default class App extends GemElement {
    render(): import("@mantou/gem").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map