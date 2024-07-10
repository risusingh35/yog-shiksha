import Carousel from "@/component/carousel/Carousel"; // Adjust the path based on your project structure
import { FC } from "react";

const HomePage: FC = () => {
  const slides = [
    { id: 1, image: "/img/slides/slide1.jpg" },
    { id: 2, image: "/img/slides/slide2.jpg" },
    { id: 3, image: "/img/slides/slide3.jpg" },
    { id: 4, image: "/img/slides/slide4.jpg" },
    { id: 5, image: "/img/slides/slide5.jpg" },
    { id: 6, image: "/img/slides/slide6.jpg" },
  ];

  return (
    <div>
      <h1>Welcome to My Carousel</h1>
      <Carousel slides={slides} />
    </div>
  );
};

export default HomePage;
