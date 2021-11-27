import React, { useState, useEffect, useCallback, useRef } from "react";
import "./AddSlide.css";

const AddSlide = ({ setSlides, setIsLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [isValid, setIsValid] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();

  const setActiveStyle = (elRef, active) => {
    if (active) {
      elRef.current.classList.add("form-field--is-active");
    } else {
      elRef.current.classList.remove("form-field--is-active");
      elRef.current.value === ""
        ? elRef.current.classList.remove("form-field--is-filled")
        : elRef.current.classList.add("form-field--is-filled");
    }
  };

  const validate = (input) => {
    if (input.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const isValid = validate(title) && validate(description);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const fetchSlides = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [setSlides, setIsLoading]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const onSlideSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      console.log("there is a problem");
      return;
    }

    setIsLoading(true);

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
    <div className="add-slide-container">
      <form className="input-container" onSubmit={onSlideSubmit}>
        <div className="form-field" ref={titleRef}>
          <div className="form-field__control">
            <label className="form-field__label" htmlFor="slide-title">
              Slide Title
            </label>
            <input
              className="form-field__input"
              id="slide-title"
              type="text"
              value={title}
              onChange={onTitleChange}
              onFocus={() => setActiveStyle(titleRef, true)}
              onBlur={() => setActiveStyle(titleRef, false)}
            />
          </div>
        </div>
        <div className="form-field" ref={descriptionRef}>
          <div className="form-field__control">
            <label className="form-field__label" htmlFor="slide-description">
              Slide Description
            </label>
            <textarea
              className="form-field__textarea"
              id="slide-description"
              type="text"
              value={description}
              onChange={onDescriptionChange}
              onFocus={() => setActiveStyle(descriptionRef, true)}
              onBlur={() => setActiveStyle(descriptionRef, false)}
            />
          </div>
        </div>
        <button className="add-slide-button" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSlide;
