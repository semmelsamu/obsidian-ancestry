import { Util } from "src/Util";

export class ChildrenRenderer {
	public static render(data: any, el: any) {
		if (data.children.length < 1) return;

		const childrenParagraph = el
			.createEl("div")
			.createEl("p", { text: "Kinder: " });

		Util.renderWikilinks(data.children, childrenParagraph);
	}
}
