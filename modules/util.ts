
export class Util 
{
    static createLink(href: string, el: HTMLElement)
    {
        return el.createEl("a", {text: href, href: href, cls: "internal-link"});
    }
    
    static renderPersons(list: string[], el: HTMLElement)
    {
        let value: any
        
        for(var i = 0; i < list.length; i++)
        {
            value = list[i]
            
            Util.createLink(value, el);
        
            if(i < list.length - 1)
                el.createEl("span", {text: ", "});
        }
        
        return value
    }
}