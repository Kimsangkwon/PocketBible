import {Component, inject, OnInit} from '@angular/core';
import {BibledatabaseService} from "../../services/bibledatabase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BibleDalService} from "../../services/bible-dal.service";
import {Bible} from "../../models/Bible.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
const BIBLE_CHAPTERS_COUNT = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1Samuel": 31,
  "2Samuel": 24,
  "1Kings": 22,
  "2Kings": 25,
  "1Chronicles": 29,
  "2Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Songs": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1Corinthians": 16,
  "2Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1Thessalonians": 5,
  "2Thessalonians": 3,
  "1Timothy": 6,
  "2Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1Peter": 5,
  "2Peter": 3,
  "1John": 5,
  "2John": 1,
  "3John": 1,
  Jude: 1,
  Revelation: 22
};
@Component({
  selector: 'app-scripturepage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './scripturepage.component.html',
  styleUrl: './scripturepage.component.css'
})
export class ScripturepageComponent{
  bibleText: string[] = [];
  dal = inject(BibleDalService);
  activatedRoute = inject(ActivatedRoute);
  bibles:Bible[] = [];
  selectedName = "";
  selectedChapter = "";
  text = "";
  chaptercount : number[] =[1];
  selectedVerses: string[] = [];
  router = inject(Router);


  constructor() {
    this.activatedRoute.queryParams.subscribe(params=>{
    this.selectedName = params['name'];
    this.selectedChapter = params['chapter'];
      this.onBibleChange();
      console.log(this.bibleText);
  });
    this.dal.selectAll().then(data=>{
      this.bibles = data;
      let selectedNameAndChapter = this.selectedName + this.selectedChapter;
      console.log("selectedNameAndChapter" + selectedNameAndChapter);
      for(let i =0; i<this.bibles.length; i++){
        let nameAndChapter = this.bibles[i].name + this.bibles[i].chapter;
        if(nameAndChapter == selectedNameAndChapter){
          this.bibleText = Object.values(this.bibles[i].text);
          console.log(this.bibleText);
        }
      }
    });


  }

  onBibleChange() {
    // @ts-ignore
    const chapters = BIBLE_CHAPTERS_COUNT[this.selectedName];
    if (chapters) {
      this.chaptercount = Array.from({ length: chapters }, (_, i) => i + 1);
    } else {
      this.chaptercount = [];
    }
    console.log(this.chaptercount)
  }
  onSearchClick(){
    this.dal.selectAll().then(data=>{
      this.bibles = data;
      let selectedNameAndChapter = this.selectedName + this.selectedChapter;
      console.log("selectedNameAndChapter" + selectedNameAndChapter);
      for(let i =0; i<this.bibles.length; i++){
        let nameAndChapter = this.bibles[i].name + this.bibles[i].chapter;
        if(nameAndChapter == selectedNameAndChapter){
          this.bibleText = Object.values(this.bibles[i].text);
        }
      }
    });
  }
  toggleVerseSelection(verse: string, index: number) {
    const verseWithNumber = `${index + 1} ${verse}`;
    const verseIndex = this.selectedVerses.indexOf(verseWithNumber);

    if (verseIndex > -1) {
      this.selectedVerses.splice(verseIndex, 1);
    } else {
      this.selectedVerses.push(verseWithNumber);
      this.selectedVerses.sort((a, b) => {
        return parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0]);
      });
    }
    console.log(this.selectedVerses);

  }

  isSelected(index: number): boolean {
    const verseWithNumber = `${index + 1} ${this.bibleText[index]}`;
    return this.selectedVerses.includes(verseWithNumber);
  }
  onMeditateClick(){
    localStorage.setItem('selectedVerses', JSON.stringify(this.selectedVerses));
    localStorage.setItem('selectedBibleName', this.selectedName);
    localStorage.setItem('selectedChapter', this.selectedChapter);
    localStorage.setItem('selectedDate', "");
    this.router.navigate(['/addMeditation']);
  }

  protected readonly Number = Number;
}
