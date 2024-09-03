import { Parser } from "./Parser";
import { MarkdownView } from "obsidian";

/**
 * Gathers vault parsing and relation calculating.
 */
export class Indexer {
	static index: any = [];

	public static async indexVault() {
		let index = await Parser.all();

		this.index = index;

		app.workspace
			.getActiveViewOfType(MarkdownView)
			?.previewMode.rerender(true);
	}

	static async getIndex() {
		return this.index;
	}

	public static async getPerson(name: string) {
		const index = await this.getIndex();
		return index.find((person: any) => person.name == name);
	}
}
