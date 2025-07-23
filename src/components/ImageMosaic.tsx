"use client"

import { ImageComponentInterface } from "@/app/page";

interface ImageMosaicProps {
  image: ImageComponentInterface;
  onTagClick?: (tag: string) => void;
}


const ImageMosaic: React.FC<ImageMosaicProps> = ({ image, onTagClick }) => {

  return (
    <div className="relative my-2">
      <img
        className="imgshow"
        src={image.imageSrc}
        alt="gallery-photo"
      />

      <div
        className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onTagClick?.(image.tag);
        }}
      >
        {image.tag}
      </div>
    </div>

  )
}

export default ImageMosaic;