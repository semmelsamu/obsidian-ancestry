import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import { Children } from 'modules/children';
import { Siblings } from 'modules/siblings';

export default class Ancestry extends Plugin 
{
	ancestryList : any[string];
	
	public postprocessor = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => 
	{
		let person = ctx.sourcePath.substring(0, ctx.sourcePath.length - 3);
		
		Children.renderChildren(person, el, this.ancestryList);
	}
	
	async onload() 
	{
    	console.log('Loading ancestry');
		
		this.addRibbonIcon("reset", "Recalculate ancestry", async () => 
		{
			this.calculateAncestryList();
		});
		
		this.calculateAncestryList();
		
		this.registerMarkdownCodeBlockProcessor("ancestry", this.postprocessor);
  	}
	
  	async onunload() 
	{
    	console.log('Unloading ancestry');
  	}
	
	async calculateAncestryList()
	{
		this.ancestryList = Array();
		
		const { vault } = this.app;
		const files = vault.getMarkdownFiles()
		
		for (let i = 0; i < files.length; i++) 
		{
			let content = await vault.cachedRead(files[i]);
			let match = this.getParents(content);
			
			this.ancestryList[files[i].basename] = match;
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
}
