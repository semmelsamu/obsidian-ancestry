import { Util } from "src/Util";

export class ChildrenRenderer {
	public static render(data: any, el: any) {
		const childrenParagraph = el
			.createEl("div")
			.createEl("p", { text: "Loading..." });

		childrenParagraph.textContent = "Kinder: ";
		Util.renderWikilinks(data.children, childrenParagraph);
	}
}
