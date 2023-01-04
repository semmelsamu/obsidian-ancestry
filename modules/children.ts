
export class Children
{
    public static renderChildren(person: string, el: HTMLElement, ancestryList: any[string])
	{
		let children: any = [];
		
		for(let key in ancestryList)
		{
			if(ancestryList[key] && ancestryList[key].includes(person))
				children.push(key);
		}
		
		let html = el.createEl("span", { text: "Kinder: "});
		
		for (var i = 0; i < children.length; i++) 
		{
			html.createEl("a", {text: children[i]});
			
			if(i < children.length - 1)
				html.createEl("span", {text: ", "});
		}
	}
}