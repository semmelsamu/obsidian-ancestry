export class Util {
	/**
	 * Create a wikilink and append it to the node.
	 * @param href The href / text of the wikilink
	 * @param el The element to append the created wikilink to
	 */
	public static renderWikilink(href: string, el: HTMLElement) {
		return el.createEl("a", {
			text: href,
			href: href,
			cls: "internal-link",
		});
	}

	/**
	 * Create wikilinks and append them to the node.
	 * @param list The hrefs / texts of the wikilinks
	 * @param el The element to append the created wikilinks to
	 */
	public static renderWikilinks(list: string[], el: HTMLElement) {
		list.forEach((href) => this.renderWikilink(href, el));
	}
}
