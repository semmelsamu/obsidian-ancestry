import { Plugin, Notice } from 'obsidian';

export default class ancestry extends Plugin 
{
	ancestry: string[];
	
	async onload() 
	{
    	console.log('Loading ancestry')
		
		this.addRibbonIcon("reset", "Recalculate ancestry", async () => 
		{
			new Notice("Recalculating ancestry")
			this.recalculateAncestry();
		});
		
		this.registerMarkdownCodeBlockProcessor("ancestry", (source, el, ctx) => 
		{
			el.createEl("p", { text: "Hello" });
		});
  	}
	
	async recalculateAncestry()
	{
		const { vault } = this.app;
		
		const fileContents: string[] = await Promise.all(
      		vault.getMarkdownFiles().map((file) => vault.cachedRead(file))
    	);
		
		const regex = 'Eltern: \[\[([^]]+)]](?>[, ]+\[\[([^]]+)]])?';
		let parents : RegExpMatchArray | null = null;
		
		fileContents.forEach((content) => {
			parents = content.match(regex);
		});
		
		console.log(parents);
	}	
	
  	async onunload() 
	{
    	console.log('Unloading ancestry')
  	}
}
