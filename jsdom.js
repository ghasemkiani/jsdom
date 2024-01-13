import {JSDOM} from "jsdom";

import {cutil} from "@ghasemkiani/base";
import {DOM as DOMBase} from "@ghasemkiani/dom";

class DOM extends DOMBase {
	static {
		cutil.extend(this, {
			defaultText: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body></body></html>',
			defaultMime: "application/xml",
			_window: null,
			get window() {
				if (cutil.na(this._window)) {
					this.create();
				}
				return this._window;
			},
			set window(window) {
				this._window = window;
			},
		});
	}
	static get() {
		return this.window;
	}
	static create(text = this.defaultText, mime = this.defaultMime) {
		let {window} = new JSDOM(text, {contentType: mime});
		if (cutil.na(this._window)) {
			this._window = window;
		}
		return window;
	}
	static createH(text = this.defaultText, mime = "text/html") {
		return this.create(text, mime);
	}
}

export {DOM};
