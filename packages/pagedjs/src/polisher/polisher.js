import Sheet from "./sheet";
import baseStyles from "./base";
import Hook from "../utils/hook";
import request from "../utils/request";

class Polisher {
	constructor(setup) {
		this.sheets = [];
		this.inserted = [];
		this.init = false;

		this.hooks = {};
		this.hooks.onUrl = new Hook(this);
		this.hooks.onAtPage = new Hook(this);
		this.hooks.onAtMedia = new Hook(this);
		this.hooks.onRule = new Hook(this);
		this.hooks.onDeclaration = new Hook(this);
		this.hooks.onContent = new Hook(this);
		this.hooks.onSelector = new Hook(this);
		this.hooks.onPseudoSelector = new Hook(this);

		this.hooks.onImport = new Hook(this);

		this.hooks.beforeTreeParse = new Hook(this);
		this.hooks.beforeTreeWalk = new Hook(this);
		this.hooks.afterTreeWalk = new Hook(this);

		if (setup !== false) {
			this.setup();
		}
	}

	// cleanup() {
	// 	const old = document.querySelectorAll("style[data-pagedjs-inserted-styles=\"true\"]");
	// 	Array.from(old).forEach((node) => {
	// 		if (!node.getAttribute("data-pagedjs-basestyles")) node.remove();
	// 	});
	// }

	setup() {
		// this.cleanup();
		if (!this.init) {
			this.base = this.insert(baseStyles, true);
			this.init = true;
		}
		this.styleEl = document.createElement("style");
		document.head.appendChild(this.styleEl);
		this.styleSheet = this.styleEl.sheet;
		return this.styleSheet;
	}

	async add(css) {
		// let fetched = [];
		// let urls = [];

		// for (var i = 0; i < arguments.length; i++) {
		// 	let f;

		// 	if (typeof arguments[i] === "object") {
		// 		for (let url in arguments[i]) {
		// 			let obj = arguments[i];
		// 			f = new Promise(function(resolve, reject) {
		// 				urls.push(url);
		// 				resolve(obj[url]);
		// 			});
		// 		}
		// 	} else {
		// 		urls.push(arguments[i]);
		// 		f = request(arguments[i]).then((response) => {
		// 			return response.text();
		// 		});
		// 	}


		// 	fetched.push(f);
		// }

		// return await Promise.all(fetched)
		// 	.then(async (originals) => {
		// 		let text = "";
		// 		for (let index = 0; index < originals.length; index++) {
		// 			text = await this.convertViaSheet(originals[index], urls[index]);
		// 			this.insert(text);
		// 		}
		// 		return text;
		// 	});
		return (async () => {
			this.insert(await this.convertViaSheet(css, ""));
			return css;
		})();
	}

	async convertViaSheet(cssStr, href) {
		let sheet = new Sheet(href, this.hooks);
		await sheet.parse(cssStr);

		// Insert the imported sheets first
		for (let url of sheet.imported) {
			let str = await request(url).then((response) => {
				return response.text();
			});
			let text = await this.convertViaSheet(str, url);
			this.insert(text);
		}

		this.sheets.push(sheet);

		if (typeof sheet.width !== "undefined") {
			this.width = sheet.width;
		}
		if (typeof sheet.height !== "undefined") {
			this.height = sheet.height;
		}
		if (typeof sheet.orientation !== "undefined") {
			this.orientation = sheet.orientation;
		}

		return sheet.toString();
	}

	insert(text, base){
		let head = document.querySelector("head");
		let style = document.createElement("style");
		style.type = "text/css";
		style.setAttribute("data-pagedjs-inserted-styles", "true");
		if (base) style.setAttribute("data-pagedjs-basestyles", "true");

		style.appendChild(document.createTextNode(text));

		head.appendChild(style);

		this.inserted.push(style);
		return style;
	}

	destroy() {
		try {
			this.styleEl.remove();
		} catch(err) {

		}
		this.inserted.forEach((s) => {
			s.remove();
		});

		this.inserted = [];
		this.sheets = [];
	}
}

export default Polisher;
