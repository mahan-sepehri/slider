import React, { useState, useEffect, useCallback } from "react";
import "./AddSlide.css";

const AddSlide = ({ slides, setSlides }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);

  const fetchSlides = useCallback(async () => {
    const response = await fetch(
      "https://react-test-1f2d2-default-rtdb.firebaseio.com/slides.json"
    );
    const data = await response.json();
    const loadedSlides = [];

    for (const key in data) {
      loadedSlides.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
      });
    }
    setSlides(loadedSlides);
  }, [setSlides]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const onSlideSubmit = async (e) => {
    e.preventDefault();
    const newSlide = { title: title, description: description };

    const response = await fetch(
      "https://react-test-1f2d2-default-rtdb.firebaseio.com/slides.json",
      {
        method: "POST",
        body: JSON.stringify(newSlide),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchSlides();
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <form className="input-container" onSubmit={onSlideSubmit}>
        <label htmlFor="slide-title">Slide Title</label>
        <input
          id="slide-title"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="slide-description">Slide Description</label>
        <input
          id="slide-description"
          type="text"
          value={description}
          onChange={onDescriptionChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddSlide;
