function readFileNames(folderPath){
    async function getImageFileNames(folderPath) {
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

	(async () => {
		try {
			let x = await getImageFileNames(folderPath);
			console.log('Image file names for folder 1:', x);
		} catch (error) {
			console.error('Error for folder 1:', error);
		}
	})();
}
const folderPath1 = 'img/competition/';
readFileNames(folderPath1);
