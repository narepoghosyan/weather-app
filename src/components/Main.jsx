import styles from "./main.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "../app/slices/weatherSlice";

export const Main = () => {
  const [cityCoord, setCityCoord] = useState({ lon: 44.5136, lat: 40.1811 });

  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.unit);
  const currentCity = useSelector((state) => state.currentCity);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=487935c43683abc99dec337548b294e5`
      )
      .then((res) => {
        setCityCoord(res.data.coord);
      })
      .catch((error) => {
        alert(error);
        dispatch(setWeather([]));
      });
  }, [currentCity, unit]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoord.lat}&lon=${cityCoord.lon}&units=${unit}&appid=487935c43683abc99dec337548b294e5`
      )
      .then((res) => {
        dispatch(setWeather(res.data.list));
      })
      .catch((error) => {
        alert(error);
      });
  }, [cityCoord]);

  return (
    <div className={styles.main}>
      <span>{currentCity}</span>
      <table>
        <thead>
          <tr>
            <th className={styles.border}>Day</th>
            <th className={styles.border}>Hour</th>
            <th className={styles.border}>
              Temperature ({unit === "metric" ? "Celsius" : "Fahrenheit"})
            </th>
          </tr>
        </thead>
        <tbody>
          {weather.map((item, index) => {
            return (
              <tr key={index}>
                <td className={styles.border}>{item.dt_txt.split(" ")[0]}</td>
                <td className={styles.border}>{item.dt_txt.split(" ")[1]}</td>
                <td className={styles.border}>{item.main.temp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
