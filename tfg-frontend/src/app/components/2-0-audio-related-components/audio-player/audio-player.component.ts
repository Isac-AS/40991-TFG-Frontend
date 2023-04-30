import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnChanges {

  @Input() audioBlob: any;
  blobURL: any;

  debug: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    public globalService: GlobalService
  ) {
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.audioBlob = changes['audioBlob'].currentValue;
    let url = URL.createObjectURL(this.audioBlob)
    this.blobURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    if (this.debug) {
      console.log("[DEBUG] - [AUDIO-PLAYER-COMPONENT]: Cambios en el reproductor de audio: ");
      console.log(changes);
      console.log("*---*")
      console.log("[DEBUG] - [AUDIO-PLAYER-COMPONENT]: audioBlob: ");
      console.log(this.audioBlob);
      console.log("*---*")
      console.log("[DEBUG] - [AUDIO-PLAYER-COMPONENT]: blobURL: ");
      console.log(this.blobURL);
      console.log("*---*")
    }
    //this.cdRef.detectChanges();
  }
}
