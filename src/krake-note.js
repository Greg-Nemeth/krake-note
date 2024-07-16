import { LitElement, html, css } from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


class KrakeNote extends LitElement {
  static properties = {
    _fileHandle: {
      state: true,
      type: Object
    },
    _content: {
      state:true,
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

  render() {
    return html`
      <main >
      <div id='kraken-div1'>${unsafeHTML(this._content)}</div>
      <button @click=${this._selectFile}>
        <i>add</i>
      </button>
      </main>
    `;
  }
}

customElements.define('krake-note', KrakeNote);
