import { useEffect, useState } from "react";
import axios from "axios";

import { Container } from "./styles";

export function CurrentWeather() {
  const [data, setData] = useState({});
  const [activities, setActivities] = useState([]);
  const [location, setLocation] = useState("Anapolis");
  const [filter, setFilter] = useState([]);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0ac97b448704a8c95bcec812c95ac3b9&lang=pt_br`;

  const activitiesUrl =
    "https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json";

  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setData(response.data);
    });
    axios.get(activitiesUrl).then((response) => {
      setActivities(response.data);
    });

    const filterActivities = activities.filter(
      (activity) =>
        activity.suggested_weather_conditions === data.weather[0].main
    );
    setFilter(filterActivities)
  }, [location, data]);

  return (
    <Container>
      <div className="searchBar">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Local"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? (
              <h1>{data.name}</h1>
            ) : (
              <h1 className="start">Para começar, informe o local desejado</h1>
            )}
          </div>
          <div>{data.sys ? <p>{data.sys.country}</p> : null}</div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p>
                {data.weather[0].description.charAt(0).toUpperCase() +
                  data.weather[0].description.slice(1)}
              </p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Sensação Térmica</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Umidade</p>
            </div>
          </div>
        )}

        <div>
          {filter.map((activity) => {
            return <p key={activity.id}>{activity.activity_title}</p>;
          })}
        </div>
      </div>
    </Container>
  );
}
