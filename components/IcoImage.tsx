import React, { useState, useEffect } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageResizeMode } from 'react-native';

interface IcoImageProps {
  source: ImageSourcePropType;
  style: any;
  resizeMode: ImageResizeMode;
  fallbackSource: ImageSourcePropType;
}

const IcoImage: React.FC<IcoImageProps> = ({ source, style, resizeMode, fallbackSource }) => {
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(source);
  
  useEffect(() => {
    // Check if the source is an .ico file
    const sourceString = JSON.stringify(source);
    if (sourceString.includes('.ico')) {
      // Use the fallback source
      setImageSource(fallbackSource);
    }
  }, [source, fallbackSource]);
  
  return <Image source={imageSource} style={style} resizeMode={resizeMode} />;
};

export default IcoImage; 