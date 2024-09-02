/**
 * Extracts parent information from markdown files.
 */
export class Parser {
	/**
	 * Reads every file in the Vault and attempts to calculate the parents.
	 */
	static async all() {
		const data = await Promise.all(
			app.vault.getMarkdownFiles().map(async (file: any) => {
				let content = await app.vault.cachedRead(file);
				let parents = this.extractParents(content);

				return { file, parents: parents ?? [] };
			})
		);

		let persons = data.map((person) => {
			return {
				name: person.file.basename,
				parents: [] as any[],
				children: [],
			};
		});

		// Link parents
		persons.forEach((person) => {
			const originalData = data.find(
				(p) => p.file.basename == person.name
			);
			if (originalData) {
				person.parents = originalData.parents
					.map((parentName) => {
						return (
							persons.find((x) => x.name == parentName) || null
						);
					})
					.filter((parent) => parent !== null); // Remove any null entries
			}
		});

		// Link children
		persons.forEach((person: any) => {
			person.children = persons.filter((child: any) =>
				child.parents.find((p: any) => p.name == person.name)
			);
		});

		return persons;
	}

	/**
	 * Attempts to extract the parents from markdown.
	 * @param markdown
	 * @returns An array of the parents if found.
	 */
	static extractParents(markdown: string) {
		const regex = /Eltern: (.*)/g;

		let regexResult = markdown.match(regex);

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
