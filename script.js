const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded =0;
let totalImages=0;

let photosArray = [];


// Unsplash API
const count=10;
const apiKEy='ADgb1L_4E5DmsTcKGVRb_283C1ZNyfoL7gg0octBwvc';
const apiURL =`https://api.unsplash.com/photos/random/?client_id=${apiKEy}&count=${count}`

// check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded=== totalImages){
        ready=true;
        loader.hidden=true
        console.log('ready=',ready)
    }
}
// Helper Function to set ttributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
} 

  
// Create Elements for links & pics , Add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('total images',totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img. for photo 
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener , check when each is finished loading
     img.addEventListener('load',imageLoaded )

        // Put <img> inside <a> , then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
   
    });
}



// Get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
       photosArray =await response.json();
       // console.log(photosArray);
        displayPhotos();
    }
    catch(error){
        // catch error here
    }
}

// Check to see if the scrolling near bottom of page , Load more Photos
window.addEventListener('scroll',()=>{
    //console.log('scrolled'); 
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000  && ready){
        getPhotos();
        ready=false;
       // console.log('load more')
         
    }
})

// On Load
getPhotos();