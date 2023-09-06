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

// main function
function slide(id, folderPath){
    folderPath = folderPath.replace(/^\/+|\/+$/g, '');    // remove first and last "/"; "img/folder/subfolder"
    
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
			slideHTML = format(id, folderPath, files);			// format the html
			const HTML_slide = document.getElementById(id);		// select element
			HTML_slide.outerHTML = slideHTML;
			console.log("html: " + slideHTML);
		} catch (error) {
			console.error('Error: ', error);
		}
	})();
}

// format
function format(id, folderPath, files){
    folderPath = folderPath.replace(/^\/+|\/+$/g, '');    // remove first and last "/"; "img/folder/subfolder"

    let folderClass = folderPath.replace(/\//g, "-");

    let HTML_begin = "<div class=\"slideshow-container\" id=\"" + id + "\">" + "<div class=\"image-slideshow\">";

    let HTML_images = "";
    for(let i in files){
        HTML_images = HTML_images.concat("<div class=\"" + folderClass + " fade\">" + "<img src=\"" + folderPath + "/" + files[i] + "\" alt=\"" + files[i] + "\"></div>");
    }

    let HTML_script = "<script>showSlide(\"" + folderClass + "\")</script>"

    let HTML_complete = HTML_begin + HTML_images + "</div>" + HTML_script + "</div>";
    return HTML_complete
}