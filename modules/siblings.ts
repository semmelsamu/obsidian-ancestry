
import { Util } from "./util";

export class Siblings
{
	static calculate(person: string, parentList: any[string])
	{
		let siblings: any[string] = [];
		
		let parents = parentList[person];
		
		if(!parents)
			return
		
		parents.forEach((parent: string) => 
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
		
		
		// Get real siblings
		
		let key = "";
		let parents = parentList[person];
		
		if(!parents)
			return
		
		parents.sort().forEach((parent: string) => {
			key += parent;
		});
		
		let real_siblings = siblings[key];
		
		// siblings only contains step siblings
		delete siblings[key];
		
		
		let hasRealSiblings = real_siblings.length > 0;
		let hasStepSiblings = Object.keys(siblings).length;
		
		
		if(hasRealSiblings)
		{
			el.createEl("span", { text: "Geschwister: "});
			
			Util.renderPersons(real_siblings, el);
		}
		
		if(hasRealSiblings && hasStepSiblings)
			el.createEl("br");
		
		if(hasStepSiblings)
		{
			el.createEl("span", {text: "Halbgeschwister: "})
			
			let index = 0;
			
			for(let key in siblings)
			{
				let last = Util.renderPersons(siblings[key], el)
				
				el.createEl("span", {text: " (von "})
				
				console.log(parentList[last]);
				
				Util.renderPersons(parentList[last].filter((e: string) => {return parentList[person].includes(e)}), el)
				
				el.createEl("span", {text: ")"})
			}
			
			if(index < Object.keys(siblings).length - 1)
				el.createEl("span", {text: "; "});
				
			index++;
		}
		
		return hasStepSiblings || hasRealSiblings;
		
	}
}