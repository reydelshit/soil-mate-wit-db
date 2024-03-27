import { useEffect, useState } from "react";
import { Buffer } from 'buffer';



const Image = ({ plantImage  } : {plantImage : any} ) => {

    const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Assuming plant_image is the object containing image data
    const yeah = {
      plant_image: {
        data: plantImage.data
      }
    };

    // Convert array of data to Buffer object
    const bufferObject = Buffer.from(yeah.plant_image.data);

    // Convert buffer to base64 string
    const base64String = bufferObject.toString('base64');

    // Set base64 string as image source
    setImageSrc(`data:image/jpeg;base64,${base64String}`);
  }, []);


  return  <img src={imageSrc} alt="Plant" />
};

export default Image;