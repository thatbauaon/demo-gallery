"use client";

import { useEffect, useRef, useState } from "react";
import ImageMosaic from "@/components/ImageMosaic";

export interface ImageComponentInterface {
  id: string;
  imageSrc: string;
  name: string;
  tag: string;
  href?: string;
}

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [images, setImages] = useState<ImageComponentInterface[]>([
    // 🔽 รูปภาพชุดเริ่มต้น
    {
      id: "img1",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      name: "Image 1",
      tag: "Tag 1",
    },
    {
      id: "img2",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      name: "Image 2",
      tag: "Tag 2",
    },
    {
      id: "img3",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      name: "Image 3",
      tag: "Tag 3",
    },
    {
      id: "img4",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      name: "Image 4",
      tag: "Tag 4",
    },
    {
      id: "img5",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      name: "Image 5",
      tag: "Tag 5",
    },
    {
      id: "img6",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      name: "Image 6",
      tag: "Tag 6",
    },
    {
      id: "img7",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      name: "Image 7",
      tag: "Tag 7",
    },
    {
      id: "img8",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      name: "Image 8",
      tag: "Tag 8",
    },
    {
      id: "img9",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      name: "Image 9",
      tag: "Tag 9",
    },
    {
      id: "img10",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      name: "Image 10",
      tag: "Tag 10",
    },
    {
      id: "img11",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      name: "Image 11",
      tag: "Tag 11",
    },
    {
      id: "img12",
      imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      name: "Image 12",
      tag: "Tag 12",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef(false);

  const filteredImages = selectedTag
    ? images.filter((img) => img.tag === selectedTag)
    : images;

  const loadMoreImages = async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setShowModal(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newImages: ImageComponentInterface[] = Array.from({ length: 6 }, (_, i) => ({
      id: `img-${images.length + i + 1}`,
      imageSrc: `https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${Math.floor(Math.random() * 11) + 1}.jpg`,
      name: `Image ${images.length + i + 1}`,
      tag: `Tag ${Math.floor(Math.random() * 11) + 1}`,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setShowModal(false);
    loadingRef.current = false;
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
      loadMoreImages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images]);

  return (
    <div className="p-8">
      {selectedTag && (
        <div className="mb-4">
          <button
            className="btn btn-sm bg-gray-200 text-black"
            onClick={() => setSelectedTag(null)}
          >
            Show All
          </button>
        </div>
      )}
      <div className="gallery mx-2">
        {
          filteredImages && filteredImages.map((image, index) => (
            <ImageMosaic key={index} image={image} onTagClick={(tag) => setSelectedTag(tag)} />
          ))
        }
      </div>

      <dialog id="loading_modal" className="modal" open={showModal}>
        <div className="modal-box flex flex-col items-center">
          <span className="loading loading-spinner loading-lg mb-4"></span>
          <h3 className="font-bold text-lg">กำลังโหลดรูปภาพ...</h3>
        </div>
      </dialog>
    </div>
  );
}
