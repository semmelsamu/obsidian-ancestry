import { Plugin, MarkdownPostProcessorContext } from "obsidian";
import { Children } from "modules/children";
import { Siblings } from "modules/siblings";

export default class Ancestry extends Plugin {
	parentList: any[string];

	public postprocessor = (
		source: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) => {
		let person = ctx.sourcePath.substring(0, ctx.sourcePath.length - 3);

		if (
			Siblings.render(person, this.parentList, el) &&
			Children.hasChildren(person, this.parentList)
		) {
			el.createEl("br");
			el.createEl("br");
		}

		Children.render(person, this.parentList, el);
	};

	async onload() {
		console.log("Loading ancestry");

		this.addRibbonIcon("reset", "Recalculate ancestry", async () => {
			this.calculateParentList();
		});

		await this.calculateParentList();

		this.registerMarkdownCodeBlockProcessor("ancestry", this.postprocessor);
	}

	async onunload() {
		console.log("Unloading ancestry");
	}

	async calculateParentList() {
		this.parentList = Array();

		const { vault } = this.app;
		const files = vault.getMarkdownFiles();

		for (let i = 0; i < files.length; i++) {
			let content = await vault.cachedRead(files[i]);
			let match = this.getParents(content);

			this.parentList[files[i].basename] = match;
		}
	}

	getParents(content: string) {
		const regex = /Eltern: (.*)/g;

		let regexResult = content.match(regex);

		if (!regexResult) return;

		let match = regexResult[0];

		match = match.substring(8);

		let result = [];

		let in_bracket = false;

		let match_start = 0;
		let match_end = 0;

		for (var i = 0; i < match.length; i++) {
			if (!in_bracket) {
				if (match.charAt(i) == "[" && match.charAt(i + 1) == "[") {
					in_bracket = true;
					match_start = i + 2;
				}
			} else {
				if (match.charAt(i) == "]" && match.charAt(i + 1) == "]") {
					in_bracket = false;
					match_end = i;

					result.push(match.substring(match_start, match_end));
				}
			}
		}

		return result;
	}
}
