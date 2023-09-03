(async () => {
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

    // Specify the folder path where your images are located
    const folderPath = 'img/competition/';

    // Call the function to get the array of image file names
    const imageFileNames = await getImageFileNames(folderPath);

    console.log('Image file names:', imageFileNames);

    // Now you can use the 'imageFileNames' variable in the rest of your code
})();
