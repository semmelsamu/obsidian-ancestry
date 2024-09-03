/*
import { Util } from "./util";

export class Children
{
	static hasChildren(person: string, parentList: any[string])
	{
		return Object.keys(this.calculate(person, parentList)).length > 0;
	}
	
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
		
		el.createEl("span", { text: "Kinder: "});
		
		let index = 0;
		
		for(let otherParents in children)
		{
			let lastIndex = Util.renderPersons(children[otherParents], el);
			
			let otherParentsList = parentList[lastIndex].filter((e: string) => {return e != person});
			
			if(otherParentsList.length == 0)
				continue
			
			el.createEl("span", {text: " (mit "});
			
			Util.renderPersons(otherParentsList, el)
			
			el.createEl("span", {text: ")"});
			
			if(index < Object.keys(children).length - 1)
				el.createEl("span", {text: "; "});
				
			index++;
		}
		
		return true;
	}
}
*/
