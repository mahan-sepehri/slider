import React, { useState } from "react";
import AddSlide from "./components/AddSlide";
import Slider from "./components/Slider";

const App = () => {
  const [slides, setSlides] = useState([]);
  return (
    <div className="container">
      <Slider slides={slides} setSlides={setSlides} />
      <AddSlide slides={slides} setSlides={setSlides} />
    </div>
  );
};

export default App;
