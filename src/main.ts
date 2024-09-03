import { Notice, Plugin, WorkspaceLeaf, WorkspaceTabs } from "obsidian";
import { Indexer } from "src/Indexer";
import { Renderer } from "src/Renderer";
import { FAMILY_TREE_VIEW, FamilyTreeView } from "./FamilyTreeView";

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

		this.registerView(FAMILY_TREE_VIEW, (leaf) => new FamilyTreeView(leaf));

		const ribbonIconEl = this.addRibbonIcon(
			"network",
			"Open family tree",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				this.openFamilyTree();
			}
		);
	}

	async openFamilyTree() {
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.setViewState({
			type: FAMILY_TREE_VIEW,
			active: true,
		});
		this.app.workspace.revealLeaf(leaf);
	}
}
