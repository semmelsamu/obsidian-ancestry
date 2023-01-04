import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class ancestry extends Plugin 
{
	parents : any[string];
	
	async onload() 
	{
    	console.log('Loading ancestry')
		
		this.addRibbonIcon("reset", "Recalculate ancestry", async () => 
		{
			this.recalculateAncestry();
		});
		
		this.recalculateAncestry();
		
		this.registerMarkdownCodeBlockProcessor("ancestry", (source, el, ctx) => 
		{
			let currentPerson = source.trim();
			
			let result: any = [];
			
			for(let key in this.parents)
			{
				if(this.parents[key] && this.parents[key].includes(currentPerson))
					result.push(key);
			}
			
			el.createEl("p", { text: "Kinder: " + String(result).valueOf() });
		});
  	}
	
	async recalculateAncestry()
	{
		this.parents = Array();
		
		const { vault } = this.app;
		const files = vault.getMarkdownFiles()
		
		for (let i = 0; i < files.length; i++) 
		{
			let content = await vault.cachedRead(files[i]);
			let match = this.match(content);
			
			this.parents[files[i].basename] = match;
		}
	}
	
	match(content: string)
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
	
  	async onunload() 
	{
    	console.log('Unloading ancestry');
  	}
}
