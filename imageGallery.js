let connectionCount = 0;
function genPopoverId () {return `imageGallery-image-display-${connectionCount}`;}
function not (x) {return !x;}

function connect (element,document, cssText) {
const popoverId = genPopoverId();
connectionCount += 1;

let thumbnails, imageDisplay, style;

if (cssText) {
(style = document.createElement("style"))
.textContent = cssText;
element.insertAdjacentElement("afterBegin", style);
} // if

(thumbnails = document.createElement("ul", popoverId));
thumbnails.className = "thumbnails";
element.appendChild(thumbnails);

(imageDisplay = document.createElement("dialog"))
.insertAdjacentHTML("beforeEnd", `
<div><button autofocus popoverTarget="${popoverId}" popoverAction="hide">Close</button></div>
<div class="image" aria-hidden="true"><img src="" alt=""></div>
<div class="long-description"></div>
`);
imageDisplay.id = popoverId;
imageDisplay.popover = "auto";
imageDisplay.className = "image-display";
element.appendChild(imageDisplay);
imageDisplay.addEventListener("beforetoggle", updateImageDisplay);

if (element.dataset.src) {
loadImageData (element.dataset.src, thumbnails, popoverId);
}else {
wrapThumbnails([...element.children].filter(element => element.matches("img")), thumbnails, popoverId);
} // if
} // connect

async function loadImageData (src, thumbnails, id) {
try {
const imageData = await import(src, {with: {type: "json"}});
createThumbnails (imageData.default, thumbnails, id);
return;

} catch (e) {
console.log(`outer catch: ${e}`);
const imageData = await fetch(src);
try {
console.log(`inner catch: ${e}`);
debugger;

} catch (e) {
alert (`cannot parse json: ${e}`);
throw (e);
} // try
} // try
} // async loadImageData


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

