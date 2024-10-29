import { useState } from "react";
import styles from "./header.module.css";
import { setUnit, setCurrentCity } from "../app/slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const isCelsius = useSelector((state) => state.unit === "metric");

  return (
    <div className={styles.header}>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(setCurrentCity(inputValue));
          }}
        >
          Search City
        </button>
      </div>
      <div>
        <span className={styles.label}>Celsius</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={!isCelsius}
            onChange={(event) => {
              dispatch(setUnit(event.target.checked ? "imperial" : "metric"));
            }}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.label}>Fahrenheit</span>
      </div>
    </div>
  );
};
