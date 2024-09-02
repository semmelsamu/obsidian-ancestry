import { Notice, Plugin } from "obsidian";
import { Indexer } from "src/Indexer";
import { Renderer } from "src/Renderer";

export default class Ancestry extends Plugin {
	public static instance: Ancestry;

	async onload() {
		console.log(`Loading ${this.manifest.name} v${this.manifest.version}`);

		Ancestry.instance = this;

		await this.saveData(null);

		this.app.workspace.onLayoutReady(() => {
			new Notice("Indexing vault...");
			Indexer.indexVault();
			new Notice("Done");
		});

		this.registerEvent(
			this.app.vault.on("modify", () => {
				Indexer.indexVault();
			})
		);

		this.registerEvent(
			this.app.vault.on("delete", () => {
				Indexer.indexVault();
			})
		);

		this.registerEvent(
			this.app.vault.on("rename", () => {
				Indexer.indexVault();
			})
		);

		this.registerMarkdownCodeBlockProcessor("ancestry", Renderer.render);
	}
}
