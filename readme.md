# Image Gallery: web component

This is a simple custom element that produces an accessible image gallery from either an external .json file, or a set of inline `img` elements.

## Usage

### As web component

In the `head` add a script element:
   
```
<script type="module" src="imageGallery.wc.js"></script>
```

In the body use either of these two forms:
   
```
<image-gallery data-images="./imageData.json"></image-gallery>
```

or  
 
```
<image-gallery>
<img width="20px" height="26px" src="..." data-description="html markup here...">
...
</image-gallery>
```


#### Styling

The component loads it's own default styles, but they are easily overridden via inline styles via style attribute, linked stylesheet, or inline stylesheet in the head.

Here is the default stylesheet for reference.

```
image-gallery {

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

} /* image-gallery */
```


### As normal script

In the head, load the library:

`<script src="./imageGallery.js"></script>

In the body, use either of these two form:

```
<div class="image-gallery" data-images="./imageData.json"></image-gallery>
```

or

```
<div class="image-gallery">
<img width="20px" height="26px" src="..." data-description="html markup here...">
...
</div>
```

__Note: if testing without a web server, only the inline form will work since `fetch` is not supported when using "file:" URLs.__
