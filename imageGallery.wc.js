import { imageData } from "./imageData.js";

class ImageGallery extends HTMLElement {

constructor () {
super();
} // constructor

connectedCallback () {
let thumbnails, imageDisplay;

(thumbnails = document.createElement("ul"));
this.appendChild(thumbnails);

(imageDisplay = document.createElement("dialog"))
.insertAdjacentHTML("beforeEnd", `
<div><button autofocus popoverTarget="image-display" popoverAction="hide">Close</button></div>
<div class="image" aria-hidden="true"><img src="" alt=""></div>
<div class="long-description"></div>
`);
imageDisplay.id = "image-display";
imageDisplay.popover = "auto";
this.appendChild(imageDisplay);
imageDisplay.addEventListener("beforetoggle", updateImageDisplay);

import(this.dataset.images, {with: {type: "json"}})
.then (imageData => {
debugger;
createThumbnails (imageData.default, thumbnails)
});
} // connectedCallback

  connectedMoveCallback() {
    console.log("Custom move-handling logic here.");
  }
} // class ImageGallery

customElements.define("image-gallery", ImageGallery);

function createThumbnails (imageData, gallery) {
for (const data of imageData) {
gallery.insertAdjacentHTML("beforeEnd", `
<li><button popoverTarget="image-display" popoverAction="show">
<img
alt="${data.alt || "decorative"}"
src="${data.url? data.url : data/path}"
data-description="${data.description}"
></button></li>
`);
} // for
} // importImageData

function updateImageDisplay (e) {
console.log("before popup ", e.target, e);
const thumbnail = e.source.querySelector("img");
const descriptionText = thumbnail.dataset.description;
const longDescription = e.target.querySelector(".long-description");
const image = e.target.querySelector(".image img");

image.src="thumbnail.src";
longDescription.innerHTML = descriptionText;
} // updateImageDisplay
