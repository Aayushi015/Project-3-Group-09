import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HttpClient } from "../../services/HttpClient";

//Pages
import { CO } from "./CO";
import { SO2 } from "./SO2";
import { O3 } from "./O3";
import { NO2 } from "./NO2";

export interface PollutantProps {
  states: { id: number; state: String }[];
  counties: { id: number; county: String }[];
  cities: { id: number; city: String }[];
}

//Main component of pollutants page
const Main = () => {
  return <div>main</div>;
};

const Pollutants = () => {
  let [states, setStates] = useState<{ id: number; state: String }[]>([]);
  let [counties, setCounties] = useState<{ id: number; county: String }[]>([]);
  let [cities, setCities] = useState<{ id: number; city: String }[]>([]);

  useEffect(() => {
    let client = new HttpClient();
    client.get_states().then((data) => {
      setStates(data);
    });
    client.get_counties().then((data) => {
      setCounties(data);
    });
    client.get_cities().then((data) => {
      setCities(data);
    });
  }, []);

  return (
    <div className="mt-13 min-h-screen bg-slate-200 p-6 flex flex-col items-center">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/o3"
          element={<O3 states={states} counties={counties} cities={cities} />}
        ></Route>
        <Route
          path="/co"
          element={<CO states={states} counties={counties} cities={cities} />}
        ></Route>
        <Route
          path="/so2"
          element={<SO2 states={states} counties={counties} cities={cities} />}
        ></Route>
        <Route
          path="/no2"
          element={<NO2 states={states} counties={counties} cities={cities} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Pollutants;
