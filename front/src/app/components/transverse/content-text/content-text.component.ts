import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StyledImage } from './styled-image'
import Quill from 'quill';

// or, from each individual module
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register(StyledImage, true);

@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
  styleUrls: ['./content-text.component.scss']
})
export class ContentTextComponent implements OnInit {
   
  @Input() 
  textHtml: string;
  @Output() body: EventEmitter<string> = new EventEmitter<string>();

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      //[{ 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image']                         // link and image, video => ['link', 'image', 'video'] 
    ],
    blotFormatter: {
      
      overlay: {
        className: 'blot-formatter__overlay',
        style: {
          position: 'absolute',
          boxSizing: 'border-box',
          border: '1px dashed #444',
        },
      },
      align: {
        attribute: 'data-align',
        aligner: {
          applyStyle: true,
        },
        icons: {//special tree icone style
          left: `
            <svg viewbox="0 0 18 18">
              <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
              <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
              <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
            </svg>
          `,
          center: `
            <svg viewbox="0 0 18 18">
               <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
              <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
              <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
            </svg>
          `,
          right: `
            <svg viewbox="0 0 18 18">
              <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
              <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
              <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
            </svg>
          `,
        },
        toolbar: {//style tree case alignment
          allowDeselect: true,
          mainClassName: 'blot-formatter__toolbar',
          mainStyle: {
            position: 'absolute',
            top: '-12px',
            right: '0',
            left: '0',
            height: '0',
            minWidth: '100px',
            font: '12px/1.0 Arial, Helvetica, sans-serif',
            textAlign: 'center',
            color: '#333',
            boxSizing: 'border-box',
            cursor: 'default',
            zIndex: '1',
          },
          buttonClassName: 'blot-formatter__toolbar-button',
          addButtonSelectStyle: true,
          buttonStyle: {
            display: 'inline-block',
            width: '24px',
            height: '24px',
            background: 'white',
            border: '1px solid #999',
            verticalAlign: 'middle',
          },
          svgStyle: {
            display: 'inline-block',
            width: '24px',
            height: '24px',
            background: 'white',
            border: '1px solid #999',
            verticalAlign: 'middle',
          },
        },
      },
      resize: {//rezise square style
        handleClassName: 'blot-formatter__resize-handle',
        handleStyle: {
          position: 'absolute',
          height: '12px',
          width: '12px',
          backgroundColor: 'red',
          border: '1px solid #777',
          boxSizing: 'border-box',
          opacity: '0.80',
        },
      },
    }
  };

  constructor() { }

  ngOnInit(): void {  }

  onContentChanged () {
    this.body.emit(this.textHtml)
  }

 
}

