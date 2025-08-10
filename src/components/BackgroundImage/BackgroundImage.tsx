interface BackgroundImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ src, alt, style }) => (
  <img 
    src={src} 
    alt={alt} 
    style={style} 
    width="997" 
    height="1280" 
    loading="lazy" 
  />
);

export default BackgroundImage;