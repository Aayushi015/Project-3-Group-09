import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { HttpClient } from "../../services/HttpClient";

//Pages
import { CO } from "./CO";
import { SO2 } from "./SO2";
import { O3 } from "./O3";
import { NO2 } from "./NO2";
import AqiTable from "../../Components/AqiTable";

export interface PollutantProps {
  states: { id: number; state: String }[];
  counties: { id: number; county: String }[];
  cities: { id: number; city: String }[];
}

//Main component of pollutants page
const Main = () => {
  return(
  <>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Understanding the Air Quality Index (AQI)
      </h2>
      <div className="mt-5">
            <section className="text-lg text-gray-600 max-w-4xl mb-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                What is the AQI?
              </h3>
              <p className="text-gray-600 mb-4">
                The Air Quality Index (AQI) is a standardized system used to measure and communicate 
                how polluted the air currently is or how polluted it is forecast to become. It translates
                complex air quality data into an easy-to-understand scale from 0 to 500.
              </p>
            </section>

      <AqiTable/>


      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          How is AQI Measured?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-700 mb-3">Measurement Process</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Monitoring stations measure concentrations of key pollutants</li>
              <li>Data is averaged over specific time periods (1-24 hours)</li>
              <li>Raw measurements converted to AQI values using EPA formulas</li>
              <li>The highest individual pollutant AQI determines the overall AQI</li>
            </ol>
          </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
          <div className="space-y-2 text-yellow-700">
            <p>✓ AQI values below 100 are generally considered acceptable</p>
            <p>✓ Values above 100 mean air quality is unhealthy</p>
            <p>✓ Different countries may use slightly different scales</p>
            <p>✓ Hourly updates are crucial for accurate readings</p>
          </div>
        </div>
        </div>
      </section>
      <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Key Pollutants:
        </h3>
        <section className="mt-5">
  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
    <NavLink
      to="/pollutants/o3"
      className={`card text-xl text-gray-700 font-bold bg-gray-100 p-4 rounded-lg shadow-lg hover:text-gray-50 
                  hover:bg-slate-400 transition-colors duration-200 flex items-center justify-center h-24`}
    >
      Ozone
    </NavLink>
    
    <NavLink
      to="/pollutants/so2"
      className={`card text-xl text-gray-700 font-bold bg-gray-100 p-4 rounded-lg shadow-lg hover:text-gray-50 
                  hover:bg-slate-400 transition-colors duration-200 flex items-center justify-center h-24`}
    >
      Sulfur Dioxide
    </NavLink>
    
    <NavLink
      to="/pollutants/no2"
      className={`card text-xl text-gray-700 font-bold bg-gray-100 p-4 rounded-lg shadow-lg hover:text-gray-50 
                  hover:bg-slate-400 transition-colors duration-200 flex items-center justify-center h-24`}
    >
      Nitrogen Dioxide
    </NavLink>
    
    <NavLink
      to="/pollutants/co"
      className={`card text-xl text-gray-700 font-bold bg-gray-100 p-4 rounded-lg shadow-lg hover:text-gray-50 
                  hover:bg-slate-400 transition-colors duration-200 flex items-center justify-center h-24`}
    >
      Carbon Dioxide
    </NavLink>
  </div>
</section>
      </div>
  </>
  )
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
    <div className="mt-13 min-h-screen text-justify bg-slate-200 p-6 flex flex-col items-center">
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
