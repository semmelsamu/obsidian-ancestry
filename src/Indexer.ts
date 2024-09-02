import Ancestry from "main";
import { Calculator } from "./Calculator";
import { Parser } from "./Parser";

/**
 * Gathers vault parsing and relation calculating.
 */
export class Indexer {
	public static async indexVault() {
		const parsedData = await Parser.all();
		const index = Calculator.all(parsedData);
		Ancestry.instance.saveData(index);
	}

	static async getIndex() {
		return (await Ancestry.instance.loadData()) ?? [];
	}

	public static async getPerson(name: string) {
		const index = await this.getIndex();
		return index.find((person: any) => person.name == name);
	}
}
