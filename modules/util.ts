
export class Util 
{
    static createLink(href: string, el: HTMLElement)
    {
        return el.createEl("a", {text: href, href: href, cls: "internal-link"});
    }
}