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
		return Ancestry.instance.loadData();
	}

	public static async getPerson(name: string) {
		return (await this.getIndex()).find(
			(person: any) => person.name == name
		);
	}
}
