"use client";

import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const step = 6;

    const slideTimer = setInterval(() => {
      if (slider) {
        slider.scrollLeft += step;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
    }, 100);

    return () => {
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <div ref={sliderRef} className="relative overflow-hidden whitespace-nowrap">
      {images.map((image: string, index: number) => (
        <Image
          key={index}
          src={image}
          width={1000}
          height={1000}
          alt="images"
          className="inline-block w-24 h-48 mx-5 rounded-lg opacity-75 cursor-pointer hover:opacity-60"
        />
      ))}
      {images.map((image: string, index: number) => (
        <Image
          key={index}
          width={1000}
          height={1000}
          src={image}
          alt="images"
          className="inline-block w-24 h-48 mx-5 rounded-lg cursor-pointer hover:opacity-60"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
