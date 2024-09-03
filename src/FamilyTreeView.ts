import { ItemView, WorkspaceLeaf } from "obsidian";

export const FAMILY_TREE_VIEW = "family-tree-view";

export class FamilyTreeView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return FAMILY_TREE_VIEW;
	}

	getDisplayText(): string {
		return "Family Tree";
	}

	getIcon(): string {
		return "network"; // Change "star" to the name of the icon you want to use
	}

	async onOpen(): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();
	}

	async onClose(): Promise<void> {
		// Cleanup or additional logic when the view is closed
	}
}
