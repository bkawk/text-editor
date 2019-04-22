import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * `text-editor`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TextEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        @import url('https://fonts.googleapis.com/css?family=Merriweather:400,900');
        :host {
          display: block;
          font-family: 'Merriweather', serif;
          letter-spacing: 0;
          font-weight: 400;
          font-style: normal;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -moz-font-feature-settings: "liga" on;
          color: rgba(0,0,0,.84);
          font-size: 20px;
        }
        h3 {
          font-size: 42px;
          color: var(--title-color, #b3b3b1);
          margin: 12px 0;
        }
        .editable:focus{
           outline: 0;
        }
        p {
          color: var(--paragraph-color, #b3b3b1)
        }
        p:focus{
           outline: 0;
        }
      </style>
      [[focus]]
      <div contenteditable="true" id="editable" class="editable" on-keydown='_keyDown' on-keyup='_keyUp' on-mousedown='_mousedown'>
        <h3 on-mousedown="_focusMe" id="title">Title</h3>
        <p on-mousedown="_focusMe" id="para1">Tell your story…</p>
      </div>
    `;
  }
  static get properties() {
    return {
      focus: {
        type: String,
      },
    };
  }
  
  _keyDown(e) {
    if(this.focus == 'title') {
      if (this.$.title.innerText === 'Title') {
        e.preventDefault();
        if (e.key.length === 1) {
          this.$.title.innerText = e.key;
          this._cursorToOne(this.$.title);
        }
      }
      if (e.key.length === 1) {
        this.updateStyles({'--title-color': '#000000'});
      } 
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    }
    if(this.focus == 'para1') {
      if (this.$.para1.innerText === 'Tell your story…') {
        e.preventDefault();
        if (e.key.length === 1) {
          this.$.para1.innerText = e.key;
          this._cursorToOne(this.$.para1);
        }
      }
      if (e.key.length === 1) {
        this.updateStyles({'--paragraph-color': '#000000'});
      } 
    }
  }

  _changeFocus(x){
    const p = x,
    s = window.getSelection(),
    r = document.createRange();
    r.setStart(p, 0);
    r.setEnd(p, 0);
    s.removeAllRanges();
    s.addRange(r);
    this.focus = x.id;
  }
  
  _keyUp(e){
    if (this.focus == 'title' && this.$.title.innerHTML === '<br>') {
        this.$.title.innerText = 'Title';
        this.updateStyles({'--title-color': '#b3b3b1'});
    }
    if (this.focus == 'para1' && this.$.para1.innerHTML === '<br>') {
      this.$.para1.innerText = 'Tell your story…';
      this.updateStyles({'--paragraph-color': '#b3b3b1'});
    }
  }

  _mousedown(e) {
    if(this.focus == 'title' && this.$.title.innerText === 'Title') {
      e.preventDefault();
      this._cursorToStart(this.$.title);      
    }
    if(this.focus == 'para1' && this.$.para1.innerText === 'Tell your story…') {
      e.preventDefault();
      this._cursorToStart(this.$.para1);      
    }
  }


  _focusMe(e) {
    this.focus = e.path[0].id;
  }

  _cursorToStart(el) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }
  _cursorToOne(el) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }
  _test() {
    let element = document.createElement("h1")
    var selRange = document.createRange();
    var shadowRootSelection = this.shadowRoot.getSelection();

    selRange.setStart(shadowRootSelection.anchorNode, shadowRootSelection.anchorOffset);
    selRange.setEnd(shadowRootSelection.focusNode, shadowRootSelection.focusOffset);
    selRange.surroundContents(element)

  };

} window.customElements.define('text-editor', TextEditor);
