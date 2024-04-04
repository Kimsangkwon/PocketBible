export class Bible{
  id: number | undefined
  name: string = "";
  chapter: string = "";
  text: string[] = [];
  constructor(name:string, chapter: string, text: string[]) {
    this.name = name;
    this.chapter = chapter;
    this.text = text
  }
}
