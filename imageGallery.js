import { imageData } from "./imageData.js";

document.body.insertAdjacentHTML("beforeEnd", `
<dialog popover id="image-display">
<div><button autofocus popoverTarget="image-display" popoverAction="hide">Close</button></div>
<div class="image" aria-hidden="true"><img src="" alt=""></div>
<div class="long-description"></div>
`);

createThumbnails (imageData, document.querySelector(".image-gallery"));
document.querySelector("#image-display").addEventListener("beforetoggle", updateImageDisplay);

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
