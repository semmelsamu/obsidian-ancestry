import { Plugin, MarkdownPostProcessorContext } from 'obsidian';

export default class ancestry extends Plugin 
{
	parents : any[string];
	
	public postprocessor = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => 
	{
		let person = ctx.sourcePath.substring(0, ctx.sourcePath.length - 3);
		this.renderChildren(person, el);
	}
	
	async onload() 
	{
    	console.log('Loading ancestry');
		
		this.addRibbonIcon("reset", "Recalculate ancestry", async () => 
		{
			this.calculateParents();
		});
		
		this.calculateParents();
		
		this.registerMarkdownCodeBlockProcessor("ancestry", this.postprocessor);
  	}
	
  	async onunload() 
	{
    	console.log('Unloading ancestry');
  	}
	
	async calculateParents()
	{
		this.parents = Array();
		
		const { vault } = this.app;
		const files = vault.getMarkdownFiles()
		
		for (let i = 0; i < files.length; i++) 
		{
			let content = await vault.cachedRead(files[i]);
			let match = this.getParents(content);
			
			this.parents[files[i].basename] = match;
		}
	}
	
	getParents(content: string)
	{
		const regex = /Eltern: (.*)/g
		
		let regexResult = content.match(regex);
		
		if(!regexResult)
			return
			
		let match = regexResult[0];
		
		match = match.substring(8);
		
		let result = [];
		
		let in_bracket = false;
		
		let match_start = 0;
		let match_end = 0;
		
		for (var i = 0; i < match.length; i++) 
		{
			if(!in_bracket)
			{
				if(match.charAt(i) == "[" && match.charAt(i+1) == "[")
				{
					in_bracket = true;
					match_start = i+2;
				}
			}
			else
			{
				if(match.charAt(i) == "]" && match.charAt(i+1) == "]")
				{
					in_bracket = false;
					match_end = i;
					
					result.push(match.substring(match_start, match_end));
				}
				
			}
		}
		
		return result;
	}
	
	renderChildren(person: string, el: HTMLElement)
	{
		let children: any = [];
		
		for(let key in this.parents)
		{
			if(this.parents[key] && this.parents[key].includes(person))
				children.push(key);
		}
		
		let html = el.createEl("p", { text: "Kinder: "});
		
		for (var i = 0; i < children.length; i++) 
		{
			html.createEl("a", {text: children[i]});
			
			if(i < children.length - 1)
				html.createEl("span", {text: ", "});
		}
		
		html.createEl("hr");
	}
}
