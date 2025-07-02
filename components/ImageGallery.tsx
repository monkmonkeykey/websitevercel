import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import styles from '../app/styles/ImageGallery.module.css';

type ImageGalleryProps = {
  images: string[];
};

const CustomImageGallery = ({ images }: ImageGalleryProps) => {
  const galleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return <ImageGallery items={galleryImages} additionalClass={styles.customImageGallery} />;
};

export default CustomImageGallery;
