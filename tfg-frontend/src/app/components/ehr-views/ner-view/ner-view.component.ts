import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { NamedEntityRecognition } from 'src/app/models/health-record.model';

interface TaggedText {
  text: string,
  tag: string,
  backgroundColor: string,
  startIndex: number,
  lastIndex: number
}

interface Tag {
  name: string,
  backgroundColor: string
}

@Component({
  selector: 'app-ner-view',
  templateUrl: './ner-view.component.html',
  styleUrls: ['./ner-view.component.scss']
})
export class NerViewComponent {

  @Input() text!: string;
  @Input() ner!: NamedEntityRecognition[];

  nerText: TaggedText[] = [];
  tags: Tag[] = [];
  showTags: boolean = false;
  backgroundColors: string[] = ["#8E24AA", "#3F51B5", "#D32F2F", "#66BB6A", "#FF9800", "#8034f3", "#26A69A", "#29B6F6",
   "#897efa", "#922b22", "#1b7b70", "#e85e13"];

  constructor() { }

  getIndicesOf(searchStr: string, str: string, caseSensitive: boolean) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    let updatedNERValue: NamedEntityRecognition[] = changes['ner'].currentValue;
    let text: string = changes['text'].currentValue;
    let tags: Tag[] = []
    let taggedText: TaggedText[] = [];
    let auxTaggedText: TaggedText[] = [];

    let tagColorIndex = 0
    for (let recognition of updatedNERValue) {
      for (let tag of recognition.tags) {
        if (tagColorIndex >= this.backgroundColors.length) tagColorIndex = 0;
        // Background color for all the entities detected with this tag
        let backgroundColor = this.backgroundColors[tagColorIndex++]
        //let backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
        tags.push({ name: tag.name, backgroundColor: backgroundColor })

        if (tag.detected_entities) {
          for (let entity of tag.detected_entities) {
            // Get indices
            let firstIndices = this.getIndicesOf(entity, text, false)
            for (let index of firstIndices) {
              let entityInText: TaggedText = {
                backgroundColor: backgroundColor,
                startIndex: index,
                lastIndex: index + entity.length,
                text: entity,
                tag: tag.name
              }
              taggedText.push(entityInText);
              auxTaggedText.push(entityInText);
            }
          }
        }
      }
    }
    this.tags = tags;

    // Tag non-entity parts of the text
    taggedText.sort((a, b) => a.startIndex - b.startIndex);
    for (let index = 0; index < taggedText.length - 1; index++) {
      let taggedEntity0 = taggedText[index];
      let taggedEntity1 = taggedText[index + 1];
      let textSubstring = text.substring(taggedEntity0.lastIndex + 1, taggedEntity1.startIndex)
      let taggedSubstring: TaggedText = {
        backgroundColor: "",
        startIndex: taggedEntity0.lastIndex + 1,
        lastIndex: taggedEntity1.startIndex,
        tag: "None",
        text: textSubstring
      }
      auxTaggedText.push(taggedSubstring)
    }
    // Rest of text
    let lastEntityIndex = taggedText[taggedText.length - 1].lastIndex + 1;
    let restOfText = text.substring(lastEntityIndex)
    auxTaggedText.push({
      backgroundColor: "",
      startIndex: lastEntityIndex,
      lastIndex: text.length,
      tag: "None",
      text: restOfText
    })

    // Assign to component variable
    this.nerText = auxTaggedText;
    this.nerText.sort((a, b) => a.startIndex - b.startIndex)
    console.log(this.nerText)
  }

  toggleTags() {
    this.showTags = !this.showTags;
  }
}