/*  old function
function showSlide(class_name){
	let index = 0;
	displayImages();
	function displayImages() {
	  let i;
	  const images = document.getElementsByClassName(class_name);
	  for (i = 0; i < images.length; i++) {
		images[i].style.display = "none";
	  }
	  index++;
	  if (index > images.length) {
		index = 1;
	  }
	  images[index-1].style.display = "block";
	  setTimeout(displayImages, 2000); 
	}
}
*/

let folderClass;
// format - old version
/*
function format(id, folderPath, files){
    folderPath = folderPath.replace(/^\/+|\/+$/g, '');    // remove first and last "/"; "img/folder/subfolder"

    folderClass = folderPath.replace(/\//g, "-");

    let HTML_begin = "<div class=\"slideshow-container\" id=\"" + id + "\">" + "<div class=\"image-slideshow\">";

    let HTML_images = "";
    for(let i in files){
        HTML_images = HTML_images.concat("<div class=\"" + folderClass + " fade\">" + "<img src=\"" + folderPath + "/" + files[i] + "\" alt=\"" + files[i] + "\"></div>");
    }

    let HTML_script = "<script>showSlide(\"" + folderClass + "\")</script>"

    let HTML_complete = HTML_begin + HTML_images + "</div>" + "</div>";
    return HTML_complete
}
*/

// new format for css
function format(id, folderPath, files, time){
    folderPath = folderPath.replace(/^\/+|\/+$/g, '');    // remove first and last "/"; "img/folder/subfolder"

    folderClass = folderPath.replace(/\//g, "-");

    let HTML_begin_1 = "<div class=\"slideshow-container\" id=\"" + id + "\">";
    let HTML_style = "<style>#" + id + " ul{list-style:none;padding:0;width:100%;} #" + id + " li{position: absolute;width:100%;}";
    let HTML_begin_2 = "<div class=\"image-slideshow\"><ul>";

    let HTML_images = "";
    for(let i in files){
        HTML_images = HTML_images.concat("<li>" + "<img src=\"" + folderPath + "/" + files[i] + "\" alt=\"" + files[i] + "\"></li>");
    }

    let HTML_begin = HTML_begin_1 + HTML_style + HTML_begin_2;

    let HTML_complete = HTML_begin + HTML_images + "</ul></div></div>";
    return HTML_complete
}


// main function
function slide(folderPath, time=2){
    folderPath = folderPath.replace(/^\/+|\/+$/g, '');    // remove first and last "/"; "img/folder/subfolder"
    let id = document.currentScript.id;
	
    // list images file name in a folder
    async function getImageFileNames(folderPath) {
        folderPath = folderPath;
        try {
            const response = await fetch(folderPath);
            const text = await response.text();
            const matches = text.match(/href="([^"]+\.(jpg|jpeg|png|gif))"/g);

            if (matches) {
                const fileNames = matches.map(match => {
                    return match.match(/href="([^"]+\.(jpg|jpeg|png|gif))"/)[1];
                });
                return fileNames;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching image file names:', error);
            return [];
        }
    }

	let slideHTML;
	(async () => {
		try {
			let files = await getImageFileNames(folderPath);    // ["file.png", "xd.jpg", "etc.gif"]
			slideHTML = format(id, folderPath, files, time);			// format the html
			const HTML_slide = document.getElementById(id);		// select element
			HTML_slide.outerHTML = slideHTML;
			//showSlide(folderClass);                           old function
		} catch (error) {
			console.error('Error: ', error);
		}
	})();
}