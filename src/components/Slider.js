import React, { useEffect, useState } from "react";
import "./Slider.css";
import next from "../assets/next.svg";
import prev from "../assets/prev.svg";

const Slider = ({ slides, isLoading }) => {
  const [translateX, setMovement] = useState(0);

  const renderSlides =
    slides.length > 0
      ? slides.map((slide) => {
          return (
            <div
              className="slide-container"
              key={slide.id}
              style={{
                transform: `translateX(-${translateX}%)`,
                transition: "all 0.5s ease-in",
              }}
            >
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          );
        })
      : null;
  const renderCircles = slides.map((slide, index) => {
    return (
      <div
        className={`circle ${translateX === index * 100 ? "active" : ""}`}
        key={index}
        onClick={() => setMovement(index * 100)}
      ></div>
    );
  });
  useEffect(() => {
    if (slides.length < 2) {
      return;
    }
    const timer = setTimeout(() => {
      switch (translateX) {
        case (slides.length - 1) * 100:
          setMovement(0);
          break;

        default:
          setMovement(translateX + 100);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [translateX, slides.length, setMovement]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const prevSlideShow = () => {
    switch (translateX) {
      case 0:
        setMovement((slides.length - 1) * 100);
        break;

      default:
        setMovement(translateX - 100);
    }
  };

  const nextSlideShow = () => {
    switch (translateX) {
      case (slides.length - 1) * 100:
        setMovement(0);
        break;

      default:
        setMovement(translateX + 100);
    }
  };

  return (
    <>
      {slides.length > 0 ? (
        <>
          <div className="slider-box">
            <div className="button-container">
              <img
                className="slider-button"
                src={prev}
                alt="previous slide button"
                onClick={prevSlideShow}
              />
            </div>

            <div className="slider-container">{renderSlides}</div>
            <div className="button-container">
              <img
                className="slider-button"
                src={next}
                alt="next slide button"
                onClick={nextSlideShow}
              />
            </div>
          </div>
          <div className="circle-container">{renderCircles}</div>
        </>
      ) : null}
    </>
  );
};

// const Slider = ({ translateX, setMovement }) => {
//

// };

export default Slider;
