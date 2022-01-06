import Quill from 'quill';

interface EmbedBlot {
  new(...args: any[]): EmbedBlot;
  domNode: any;
  format(name, value);
}

const Image: EmbedBlot = Quill.import('formats/image');
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
];

export class StyledImage extends Image {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}