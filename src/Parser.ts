/**
 * Extracts parent information from markdown files.
 */
export class Parser {
	/**
	 * Reads every file in the Vault and attempts to calculate the parents.
	 */
	static async all() {
		return Promise.all(
			app.vault.getMarkdownFiles().map(async (file: any) => {
				let content = await app.vault.cachedRead(file);
				let parents = this.extractParents(content);

				return { name: file.basename, parents: parents ?? [] };
			})
		);
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
