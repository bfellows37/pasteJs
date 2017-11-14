import { Component, OnInit, Input } from '@angular/core';
import { Thread } from '../../types/thread';
import { DomSanitizer, SafeStyle, SafeHtml } from '@angular/platform-browser';
import { ClientStateService } from '../../services/client-state.service';
import { UiState } from "../../types/ui-state";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() reply: Thread;
  isSelected: Boolean;
  isReplying: Boolean;

  constructor(
    private domSanitizer: DomSanitizer,
    private clientStateService: ClientStateService
  ) { }

  ngOnInit() {
    this.followUiState();
  }

  private followUiState() {
    this.clientStateService.uiState$
      .subscribe((uiState) => {
        this.isSelected = (uiState.selectedPost === this.reply._id);
        if (this.isReplying && !this.isSelected) {
          this.isReplying = false;
        }
      });
  }

  transformTags(content: string): SafeHtml {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    content = content.replace(urlRegex, (url) => {
      return `<a target="_blank" href='${url}'>${url}</a>`;
    });

    content = content.replace('\n','<br>');

    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }

  dynamicIndent(indent): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`${indent*10}px`);
  };

  selectPost(): void {
    this.clientStateService.setSelectedPost(this.reply._id);
  }

  toggleIsReplying(): void {
    this.isReplying = !this.isReplying;
  }
}
