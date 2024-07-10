import { FC, useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
}

const ImageComponent: FC<{ slide: Slide }> = ({ slide }) => {
  return (
    <img
      src={slide.image}
      alt={`Slide ${slide.id}`}
      className="absolute inset-0 object-cover w-full h-full"
    />
  );
};

interface CarouselProps {
  slides: Slide[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 flex items-center justify-center ">
        {slides.map((slide, index) => {
          let slideClass = "absolute w-64 h-64 transition-opacity duration-500 opacity-0 pointer-events-none";
          if (index === currentIndex) {
            slideClass = "absolute w-64 h-64 transition-opacity duration-500 opacity-100";
          } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            slideClass = "relative w-64 h-64 transition-opacity duration-500 opacity-100 left-0";
          } else if (index === (currentIndex + 1) % slides.length) {
            slideClass = "relative w-64 h-64 transition-opacity duration-500 opacity-100 right-0";
          }
          return (
            <div key={slide.id} className={slideClass}>
              <ImageComponent slide={slide} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
