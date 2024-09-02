export class ChildrenCalculator {
	private data: any;

	constructor(data: any) {
		this.data = data;
	}

	public all() {
		return this.data.map((person: any) => this.for(person));
	}

	public for(person: any) {
		let children = [];

		for (const entry of this.data) {
			if (entry.parents.includes(person.name)) children.push(entry.name);
		}

		return { ...person, children };
	}
}
