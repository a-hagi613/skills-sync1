import React from "react";
import ImageSlider from "./CompanyLogos";

export default function CompanySection() {
  const images = [
    "google-icon.svg",
    "netflix-2-logo.svg",
    "apple-black-logo.svg",
    "airbnb-2-logo.svg",
    "amazon-2-logo.svg",
    "ferrari-logo.svg",
    "linkedin-icon.svg",
    "nasa-6-logo-.svg",
    "nike-3.svg",
    "nvidia-logo.svg",
    "samsung-logo.svg",
    "spotify-logo.svg",
    "tesla-icon.svg",
    "tiktok-icon.svg",
  ];
  return (
    <div className="mt-24 text-center">
      <ImageSlider images={images} />
      <h6 className="text-lg text-gray-400">
        Tailor craft your resume and cover letters to land your dream job!
      </h6>
    </div>
  );
}
