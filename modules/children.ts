
import { Util } from "./util";

export class Children
{
    static calculate(person: string, parentList: any[string])
    {
        let children: any[string] = [];
        
        for(let child in parentList)
		{
			if(parentList[child] && parentList[child].includes(person))
			{
				let parentsSorted = parentList[child].sort();
				
				let childrenKey: string = "";
				
				parentsSorted.forEach((otherParent: string) => 
				{
					if(otherParent != person)
						childrenKey += otherParent;
				});
				
				if(!children[childrenKey])
					children[childrenKey] = Array();
					
				children[childrenKey].push(child);
			}
		}
        
        return children;
    }
    
    static render(person: string, parentList: any[string], el: HTMLElement)
	{
		let children = this.calculate(person, parentList);
		
		if(Object.keys(children).length == 0)
			return
		
		let html = el.createEl("span", { text: "Kinder: "});
		
		let index = 0;
		
		for(let otherParents in children)
		{
			let lastIndex = 0;
			
			for(var i = 0; i < children[otherParents].length; i++)
			{
				Util.createLink(children[otherParents][i], html);
			
				if(i < children[otherParents].length - 1)
					html.createEl("span", {text: ", "});
					
				lastIndex = i;
			}
			
			let otherParentsList = parentList[children[otherParents][lastIndex]];
			
			html.createEl("span", {text: " (mit "});
			
			for(var i = 0; i < otherParentsList.length; i++)
			{
				if(otherParentsList[i] != person)
					Util.createLink(otherParentsList[i], html);
				
				if(i < otherParentsList.length - 2)
					Util.createLink(", ", html);
			}
			
			html.createEl("span", {text: ")"});
			
			if(index < Object.keys(children).length - 1)
				html.createEl("span", {text: "; "});
				
			index++;
		}
		
		el.createEl("br");
	}
}