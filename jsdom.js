import {JSDOM} from "jsdom";

import {cutil} from "@ghasemkiani/base";
import {DOM as DOMBase} from "@ghasemkiani/dom";
import {iwdom} from "@ghasemkiani/dom";

class DOM extends DOMBase {
	static {
		cutil.extend(this, {
			defaultText: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body></body></html>',
			defaultTextH40: '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head></head><body></body></html>',
			defaultMime: "application/xml",
			isGlobal: false,
			_window: null, // singleton
			get window() {
				if (cutil.na(this._window)) {
					this.create();
				}
				return this._window;
			},
			set window(window) {
				this._window = window;
				if (this.isGlobal) {
					cutil.global().window = window;
				}
			},
		});
	}
	static get() {
		return this.window;
	}
	static global(isGlobal = true) {
		this.isGlobal = isGlobal;
		return this;
	}
	static create(text = this.defaultText, mime = this.defaultMime) {
		let {window} = new JSDOM(text, {contentType: mime});
		if (cutil.na(this._window)) {
			this.window = window;
		}
		return window;
	}
	static createH(text = this.defaultText, mime = "text/html") {
		return this.create(text, mime);
	}
	static createH40(text = this.defaultTextH40, mime = "text/html") {
		return this.create(text, mime);
	}
}

const iwjsdom = cutil.extend({}, iwdom, {
	DOM,
	defaultText: DOM.defaultText,
	defaultMime: DOM.defaultMime,
	useSingletonWindow: false,
	getWindow() {
		if (!this.useSingletonWindow || cutil.na(this.DOM._window)) {
			return this.DOM.create(this.defaultText, this.defaultMime);
		}
		return this.DOM.get();
	},
});

const iwjsdomH40 = cutil.extend({}, iwjsdom, {
	dfns: "http://www.w3.org/TR/REC-html40",
	defaultText: DOM.defaultTextH40,
});

export {DOM, iwjsdom, iwjsdomH40};
