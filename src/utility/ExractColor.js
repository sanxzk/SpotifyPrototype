const extractColors = (img) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    canvas.width = img.width;
    canvas.height = img.height;
  
    context.drawImage(img, 0, 0, img.width, img.height);
  
    const imageData = context.getImageData(0, 0, img.width, img.height).data;
    const colors = {};
  
    // Loop through pixel data to count color frequency
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const color = `rgb(${r},${g},${b})`;
  
      if (colors[color]) {
        colors[color]++;
      } else {
        colors[color] = 1;
      }
    }
  
    // Find the most frequent color
    const dominantColor = Object.keys(colors).reduce((a, b) => (colors[a] > colors[b] ? a : b));
  
    return dominantColor;
  };

  export default extractColors;