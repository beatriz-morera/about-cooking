import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface MyImageProps {
  alt: string;
  src: string;
}

const LoadImage: React.FC<MyImageProps> = ({ alt, src }) => (
  <LazyLoadImage alt={alt} effect="blur" src={src} />
);

export default LoadImage;
