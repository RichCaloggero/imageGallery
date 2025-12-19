//import { connect } from "./imageGallery.js";

/* Usage:
<image-gallery data-images="./someFile.json"></image-gallery>
<image-gallery format="inline || block || ordered || unordered" width="thumbnail width" height="thumbnail height">
<img alt="alt text" description="long description which may contain HTML">
...
</image-gallery>
*/

const cssText = `@scope {
.thumbnails { /* style the list of thumbnails (there are properties you can use to make it look like a grid) */
list-style: none;
column-count: 3;

img { /* style the thumbnails themselves */
width: 20px;
height: 13.48px;
}

button { /* and the buttons */
}
} /* .thumbnails */

dialog {
.image {
float: left;
width: 50%;
}

.long-description {
float: right;
width: 50%;
}
} /* dialog*/

dialog::backdrop { /* style the backdrop behind dialog when opened */
}

dialog:open { /* style dialog when it is visible */
}
} /* @scope */
`;



class ImageGallery extends HTMLElement {

constructor () {
super();
} // constructor

connectedCallback () {
connect(this,document, cssText);
} // connectedCallback

  connectedMoveCallback() {
    console.log("Custom move-handling logic here.");
  }
} // class ImageGallery

customElements.define("image-gallery", ImageGallery);

