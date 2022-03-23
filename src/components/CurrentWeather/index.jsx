import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { shade } from "polished";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { Container } from "./styles";

export function CurrentWeather({ toggleTheme, darkMode }) {
  const { colors, title } = useContext(ThemeContext);
  const [data, setData] = useState({});
  const [activities, setActivities] = useState([]);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [filter, setFilter] = useState([]);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b2a40f5e2790d4e2c5ce115e26cf370e&lang=pt_br`;

  const activitiesUrl =
    "https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json";

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=b2a40f5e2790d4e2c5ce115e26cf370e&lang=pt_br`).then((response) => {
      setData(response.data);
    });
  }, [coordinates]);

  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setData(response.data);
    });
    axios.get(activitiesUrl).then((response) => {
      setActivities(response.data);
    });
  }, [location]);

  useEffect(() => {
    const filterActivities = activities.filter(
      (activity) =>
        activity.suggested_weather_conditions === data.weather[0].main
    );
    setFilter(filterActivities);
  }, [data]);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;
    setCoordinates({ latitude, longitude });
  }

  return (
    <Container>
      <div className={`header ${darkMode ? "darkMode" : ""}`}>
        <div className="headerBox">
          <h1 className="logo">
            weather<strong>.app</strong>
          </h1>
          <Switch
            className="switch"
            onChange={toggleTheme}
            checked={title === "dark"}
            checkedIcon={<LightModeIcon />}
            uncheckedIcon={<DarkModeIcon className="light" />}
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={25}
            width={50}
            handleDiameter={20}
            offColor={shade(0.15, colors.primary)}
            onColor={colors.secundary}
          />
        </div>
      </div>
      <div className="content">
        <div className="searchBarBox">
          <SearchIcon />
          <input
            className="searchBar"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            placeholder="Local"
            type="text"
          />
        </div>
        <div>
          <div className="boxTemp">
            <div>
              <div>
                {data.name ? (
                  <div className="name">
                    <PlaceIcon fontSize="large" />
                    <h1>{data.name}</h1>
                  </div>
                ) : null}
              </div>
              <div className="country">
                {data.sys ? <p>{data.sys.country}</p> : null}
              </div>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              <div>
                {data.weather ? (
                  <p>
                    {data.weather[0].main.charAt(0).toUpperCase() +
                      data.weather[0].main.slice(1)}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {data.name !== undefined && (
            <div className="boxDetails">
              <div className="text">
                {data.main ? (
                  <p>
                    <strong>Feels like:</strong>{" "}
                    {data.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
              </div>
              <div className="text">
                {data.main ? (
                  <p>
                    <strong>Humidity:</strong> {data.main.humidity}%
                  </p>
                ) : null}
              </div>
            </div>
          )}

          <div className="activities">
            <h2>Recommended activities:</h2>
            {filter.map((activity) => {
              return <p key={activity.id}>{activity.activity_title}</p>;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
