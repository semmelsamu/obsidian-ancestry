
export class Children
{
    static calculateChildren(person: string, ancestryList: any[string])
    {
        let children = [];
        
        for(let key in ancestryList)
		{
			if(ancestryList[key] && ancestryList[key].includes(person))
				children.push(key);
		}
        
        return children;
    }
    
    static renderChildren(person: string, el: HTMLElement, ancestryList: any[string])
	{
		let children = this.calculateChildren(person, ancestryList);
		
		let html = el.createEl("span", { text: "Kinder: "});
		
		for (var i = 0; i < children.length; i++) 
		{
			html.createEl("a", {text: children[i]});
			
			if(i < children.length - 1)
				html.createEl("span", {text: ", "});
		}
	}
}