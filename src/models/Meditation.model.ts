export class Meditation{
  id: number | undefined
  Title: string = "";
  BibleName: string = "";
  Chapter: string = "";
  Verse: string = "";
  dateOfMeditation: string = "";
  meditationText: string = "";
  constructor(title:string, bibleName: string, chapter: string, verse:string, dateOfMeditation: string, meditationText:string) {
    this.Title = title;
    this.BibleName = bibleName;
    this.Chapter = chapter;
    this.Verse = verse;
    this.dateOfMeditation = dateOfMeditation;
    this.meditationText = meditationText;

  }
}
