/* Usage:
<image-gallery data-images="./someFile.json"></image-gallery>
<image-gallery format="inline || block || ordered || unordered" width="thumbnail width" height="thumbnail height">
<img alt="alt text" description="long description which may contain HTML">
...
</image-gallery>
*/

let dialogCount = 0;
class ImageGallery extends HTMLElement {
#popoverId = `image-gallery-image-display-${++dialogCount}`;

constructor () {
super();
} // constructor

connectedCallback () {
let thumbnails, imageDisplay;


(thumbnails = document.createElement("ul"));
thumbnails.className = "thumbnails";
this.appendChild(thumbnails);

(imageDisplay = document.createElement("dialog"))
.insertAdjacentHTML("beforeEnd", `
<div><button autofocus popoverTarget="image-display" popoverAction="hide">Close</button></div>
<div class="image" aria-hidden="true"><img src="" alt=""></div>
<div class="long-description"></div>
`);
imageDisplay.id = this.#popoverId;
imageDisplay.popover = "auto";
imageDisplay.className = "image-display";
this.appendChild(imageDisplay);
imageDisplay.addEventListener("beforetoggle", updateImageDisplay);

if (this.dataset.images) {
import(this.dataset.images, {with: {type: "json"}})
.then (imageData => {
createThumbnails (imageData.default, thumbnails, this.#popoverId)
});


}else {
wrapThumbnails([...this.children].filter(element => element.matches("img")), thumbnails, this.#popoverId);
} // if
} // connectedCallback

  connectedMoveCallback() {
    console.log("Custom move-handling logic here.");
  }
} // class ImageGallery

customElements.define("image-gallery", ImageGallery);

function createThumbnails (imageData, gallery, id) {
for (const data of imageData) {
gallery.insertAdjacentHTML("beforeEnd", `
<li><button popoverTarget="${id}" popoverAction="show">
<img
alt="${data.alt.trim() || "decorative"}"
src="${data.url.trim()? data.url : data.path}"
data-description="${data.description}"
></button></li>
`);
} // for
} // createThumbnails

function wrapThumbnails (images, thumbnails, id) {
for (const img of images) {
const li = document.createElement("li");
const button = document.createElement("button");
button.setAttribute("popovertarget",  id);
button.setAttribute("popoveraction", "show");

thumbnails.appendChild(li);
li.appendChild(button);
//img.replaceWith(li);
button.appendChild(img);
} // for

} // wrapThumbnails

function updateImageDisplay (e) {
console.log("before popup ", e.target, e);
const thumbnail = e.source.querySelector("img");
const descriptionText = thumbnail.dataset.description;
const longDescription = e.target.querySelector(".long-description");
const image = e.target.querySelector(".image img");

image.src="thumbnail.src";
longDescription.innerHTML = descriptionText;
} // updateImageDisplay
