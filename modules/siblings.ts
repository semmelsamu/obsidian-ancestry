
import { Util } from "./util";

export class Siblings
{
	static calculate(person: string, parentList: any[string])
	{
		let siblings: any = [];
		
		let thisParents = parentList[person];
		
		thisParents.forEach((parent: string) => 
		{
			for(let key in parentList)
			{
				if(
					parentList[key] && 
					parentList[key].includes(parent) && 
					key != person && 
					!siblings.includes(key)
				)
					siblings.push(key);
			}
		});
		
		return siblings;
	}
	
	static render(person: string, parentList: any[string], el: HTMLElement)
	{
		let siblings = this.calculate(person, parentList);
		
		if(siblings.length == 0)
			return
		
		let html = el.createEl("span", { text: "Geschwister: "});
		
		for (var i = 0; i < siblings.length; i++)
		{
			Util.createLink(siblings[i], html);
			
			if(i < siblings.length - 1)
				html.createEl("span", {text: ", "});
		}
	}
}