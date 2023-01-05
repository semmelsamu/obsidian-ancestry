
import { Util } from "./util";

export class Siblings
{
	static calculate(person: string, parentList: any[string])
	{
		let siblings: any[string] = [];
		
		parentList[person].forEach((parent: string) => 
		{
			for(let child in parentList)
			{
				if(!parentList[child] || !parentList[child].includes(parent) || child == person)
					continue
					
				let parentsSorted = parentList[child].sort();
				
				let key: string = "";
				
				parentsSorted.forEach((parent: string) => 
				{
					key += parent;
				});
				
				if(!siblings[key])
					siblings[key] = Array();
					
				if(siblings[key].includes(child))	
					continue
				
				siblings[key].push(child);
			}
		});
		
		return siblings;
	}
	
	static render(person: string, parentList: any[string], el: HTMLElement)
	{
		let siblings = this.calculate(person, parentList);
		
		let key = "";
		
		parentList[person].sort().forEach((parent: string) => 
		{
			key += parent;
		});
		
		let real_siblings = siblings[key];
		
		delete siblings[key];
		
		if(real_siblings.length > 0)
		{
			el.createEl("span", { text: "Geschwister: "});
			
			Util.renderPersons(real_siblings, el);
		}
		
		if(Object.keys(siblings).length > 0 && real_siblings.length > 0)
			el.createEl("br");
		
		if(Object.keys(siblings).length > 0)
		{
			el.createEl("span", {text: "Halbgeschwister: "})
			
			for(let key in siblings)
			{
				let last = Util.renderPersons(siblings[key], el)
				
				el.createEl("span", {text: " (von "})
				
				console.log(parentList[last]);
				
				Util.renderPersons(parentList[last].filter((e: string) => {return parentList[person].includes(e)}), el)
				
				el.createEl("span", {text: ")"})
			}
		}
		
		
	}
}