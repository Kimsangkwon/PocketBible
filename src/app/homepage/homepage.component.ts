import {Component, inject} from '@angular/core';
import {Bible} from "../../models/Bible.model";
import {BibleDalService} from "../../services/bible-dal.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
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
  selector: 'app-homepage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  selectedBible: string = "";
  selectedChapter: string ="";
  chaptercount : number[] =[];
  bibles: Bible[] = []
  dal = inject(BibleDalService);
  router = inject(Router);
  imgsrc = "../../assets/img/bible.png";
  CheckData(){
    this.dal.selectAll().then(data=>{
      this.bibles = data;
    }).catch(e=>{
      console.error(e);
      this.bibles = [];
    })
  }
  onBibleChange() {
    // @ts-ignore
    const chapters = BIBLE_CHAPTERS_COUNT[this.selectedBible];
    if (chapters) {
      this.chaptercount = Array.from({ length: chapters }, (_, i) => i + 1);
    } else {
      this.chaptercount = [];
    }
  }
  onSearchClick() {
    if (this.selectedBible && this.selectedChapter) {

      this.router.navigate(['/scripture'], { queryParams: { name: this.selectedBible, chapter: this.selectedChapter } });
    }
  }
  constructor(){
    this.CheckData();
  }

}
