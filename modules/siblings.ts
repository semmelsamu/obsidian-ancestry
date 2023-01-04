

export class Siblings
{
	renderSiblings(person: string, el: HTMLElement, ancestryList: any[string])
	{
		let siblings: any = [];
		
		let thisParents = ancestryList[person];
		
		thisParents.forEach((parent: string) => 
		{
			for(let key in ancestryList)
			{
				if(
					ancestryList[key] && 
					ancestryList[key].includes(parent) && 
					key != person && 
					!siblings.includes(key)
				)
					siblings.push(key);
			}
		});
		
		
		let html = el.createEl("span", { text: "Geschwister: "});
		
		for (var i = 0; i < siblings.length; i++)
		{
			html.createEl("a", {text: siblings[i]});
			
			if(i < siblings.length - 1)
				html.createEl("span", {text: ", "});
		}
	}
}