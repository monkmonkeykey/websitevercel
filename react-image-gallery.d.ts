declare module 'react-image-gallery' {
  import { Component } from 'react';

  export interface ImageGalleryProps {
    items: Array<{
      original: string;
      thumbnail?: string;
      originalClass?: string;
      thumbnailClass?: string;
      originalAlt?: string;
      thumbnailAlt?: string;
      description?: string;
      renderItem?: () => JSX.Element;
      renderThumbInner?: () => JSX.Element;
      imageSet?: Array<{
        srcSet: string;
        media: string;
      }>;
      originalTitle?: string;
      thumbnailTitle?: string;
    }>;
    showNav?: boolean;
    autoPlay?: boolean;
    lazyLoad?: boolean;
    infinite?: boolean;
    showIndex?: boolean;
    showThumbnails?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    disableThumbnailScroll?: boolean;
    disableArrowKeys?: boolean;
    slideDuration?: number;
    slideInterval?: number;
    slideOnThumbnailOver?: boolean;
    additionalClass?: string;
    useBrowserFullscreen?: boolean;
    preventDefaultTouchmoveEvent?: boolean;
    flickThreshold?: number;
    stopPropagation?: boolean;
    onErrorImageURL?: string;
  }

  class ImageGallery extends Component<ImageGalleryProps> {}

  export default ImageGallery;
}
