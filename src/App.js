import React, { useState } from "react";
import AddSlide from "./components/AddSlide";
import Slider from "./components/Slider";

const App = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <Slider slides={slides} isLoading={isLoading} />
      <AddSlide
        slides={slides}
        setSlides={setSlides}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default App;
