import {cutil} from "@ghasemkiani/base";
import {DOM} from "./jsdom.js";

const jshost = {
	defaultText: DOM.defaultText,
	defaultMime: DOM.defaultMime,
	getWindow() {
		if (cutil.na(DOM._window)) {
			DOM.create(this.defaultText, this.defaultMime);
		}
		return DOM.get();
	},
};

export {jshost};
