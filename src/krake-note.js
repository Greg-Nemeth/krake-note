import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import font from "https://fonts.googleapis.com/icon?family=Material+Icons" with { type: 'css' };
import beer from "https://cdn.jsdelivr.net/npm/beercss@3.6.8/dist/cdn/beer.min.css" with {type: 'css'};

class KrakeNote extends LitElement {
  static styles = [
    beer, font
  ]
  static properties = {
    _fileHandle: {
      state: true,
      type: Object
    },
    _content: {
      state: true,
      type: String
    },
    _worker: {
      state: true,
      type: Object
    },
  }

  constructor() {
    super();
    this._worker = new Worker('./dist/worker.bundle.js');
    this._worker.addEventListener('message', (event) => this._content = event.data);
  }

  async _selectFile(_event) {
    const handle = await window.showOpenFilePicker();
    this._worker.postMessage(handle)
    this._fileHandle = handle;
  }

  populateDiv(arg) {
    return arg ? unsafeHTML(arg) : html`<p>svg will be here</p>`
  }

  render() {
    return html`
      <main class='max'>
      <slot name='display-md'>${this.populateDiv(this._content)}</slot>
      <button @click=${this._selectFile}>
        <i>add</i>
      </button>
      </main>
    `;
  }
}

customElements.define('krake-note', KrakeNote);
