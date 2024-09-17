import { Util } from "src/Util";

export class ChildrenRenderer {
	public static render(person: any, el: any) {
		if (person.children.length < 1) return;

		const childrenParagraph = el
			.createEl("div")
			.createEl("p", { text: "Kinder: " });

		let children: any = [];

		person.children.forEach((child: any) => {
			const [otherParent] = child.parents
				.filter((parent: any) => parent.name != person.name)
				.map((parent: any) => parent.name);

			if (!children[otherParent]) children[otherParent] = [];

			children[otherParent].push(child);
		});

		console.log(children);

		Object.entries(children).forEach(([key, value]: any, index) => {
			Util.renderWikilinks(
				value.map((person: any) => person.name),
				childrenParagraph
			);

			if (!key || key == "undefined") {
				childrenParagraph.appendChild(
					document.createTextNode(" (unbekanntes anderes Elternteil)")
				);
			} else {
				childrenParagraph.appendChild(
					document.createTextNode(" (mit ")
				);

				Util.renderWikilink(key, childrenParagraph);

				childrenParagraph.appendChild(document.createTextNode(")"));
			}

			if (index < Object.entries(children).length - 1) {
				childrenParagraph.appendChild(document.createTextNode("; "));
			}
		});
	}
}
