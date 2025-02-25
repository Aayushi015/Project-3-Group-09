import { useState, useEffect } from "react";
import Heatmap from "../../../Components/HeatMap";
import LineChart from "../../../Components/LineChart";
import BarChart from "../../../Components/BarChart";

import { PollutantProps } from "../index";
import {
  HttpClient,
  SearchParams,
  PollutantType,
  PollutantInfo,
} from "../../../services/HttpClient";

const displayRecordTable =(pollutantHeatData:any)=>{return (<>
  <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
  Example of O3 heat Record 
  </h2>
  <div className="max-h-80 overflow-y-auto rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">City</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Latitude</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Longitude</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">AQI</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* @ts-ignore */}
          {pollutantHeatData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{item.location.city}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.location.latitude.toFixed(4)}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.location.longitude.toFixed(4)}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{item.aqi.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</>
)}

const O3 = (Props: PollutantProps) => {
  let [pollutantHeatData, setPollutantHeatData] = useState<any>(null);
  let [aqiData,setAqiData] = useState<any>([]);
  let [cleanestCities,setCleanestCities] = useState<any>(null);
  let [dirtiestCities,setDirtiestCities] = useState<any>(null);
  let [displayData, setDisplayData] = useState<any>(null);



  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedState, setSelectedState] = useState<string>("");

 

  // Handle year selection
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(String(event.target.value));
  };

 

  useEffect(() => {
    let client = new HttpClient();

    let search: SearchParams = {
      year: selectedYear,
      month: selectedMonth,
      state: selectedState,
    };

    client.get_pollutants_info(search, PollutantType.O3).then((data) => {
      let heatdata: [number, number, number][] = [];
      let displayRecords: PollutantInfo[] = []

      data.map((p) => {
        let point: [number, number, number] = [
          p.location.latitude,
          p.location.longitude,
          p.aqi,
        ];

        heatdata.push(point);

        displayRecords.push(p)
      });

      setPollutantHeatData(heatdata);
      setDisplayData(displayRecords)
    });
  }, [selectedYear, selectedMonth, selectedState]);

  useEffect(() => {
    let client = new HttpClient();

    client.get_pollutant_timeline(PollutantType.O3).then((data) => {
      setAqiData(data)
    });

    client.get_pollutant_cleanest_cities(PollutantType.O3).then((data) => {
      setCleanestCities(data)
    });

    client.get_pollutant_dirtiest_cities(PollutantType.O3).then((data) => {
      setDirtiestCities(data)
    });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Overview of Ground-Level Ozone (O₃)
      </h1>
      <div className="mt-5">
        <section className="text-lg text-gray-600 max-w-4xl mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What is Ozone (O₃)?
          </h2>
          <p className="text-gray-700">
            Ozone (O₃) is a gas composed of three oxygen atoms. While
            stratospheric ozone (in the upper atmosphere) protects life on Earth
            from UV radiation, ground-level ozone is a harmful air pollutant and
            a key component of smog. It forms when nitrogen oxides (NOₓ) and
            volatile organic compounds (VOCs) react chemically in the presence
            of sunlight.
          </p>
        </section>

        <section className="text-lg text-gray-600 max-w-4xl  mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Health Effects
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Respiratory Issues:</span>{" "}
              Irritation of the airways, coughing, sore throat.
            </li>
            <li>
              <span className="font-semibold">Aggravated Asthma:</span>{" "}
              Increased frequency of asthma attacks.
            </li>
            <li>
              <span className="font-semibold">Reduced Lung Function:</span>{" "}
              Shortness of breath, especially during physical activity.
            </li>
            <li>
              <span className="font-semibold">Chronic Lung Damage:</span>{" "}
              Long-term exposure may lead to diseases like bronchitis.
            </li>
            <li>
              <span className="font-semibold">Increased Mortality Risk:</span>{" "}
              Linked to premature deaths in vulnerable populations (elderly,
              children, those with pre-existing conditions).
            </li>
          </ul>
        </section>

        <section className="text-lg text-gray-600 max-w-4xl mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Main Sources of O₃
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Industrial Facilities:</span>{" "}
              Factories, power plants, and refineries.
            </li>
            <li>
              <span className="font-semibold">Chemical Products:</span> Paints,
              solvents, and gasoline vapors.
            </li>
            <li>
              <span className="font-semibold">Natural Sources:</span> Wildfires
              and vegetation (minor contributors).
            </li>
          </ul>
        </section>

        <section className="text-lg text-gray-600 max-w-4xl mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Environmental Impact
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Crop Damage:</span> Reduces
              agricultural yields (e.g., soybeans, wheat).
            </li>
            <li>
              <span className="font-semibold">Ecosystem Harm:</span> Damages
              forests and sensitive plants.
            </li>
            <li>
              <span className="font-semibold">Climate Contributor:</span> Acts
              as a greenhouse gas, exacerbating global warming.
            </li>
          </ul>
        </section>

        <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
          <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
            Average O3 AQI in USA
          </h2>
          {pollutantHeatData !==null ? <Heatmap states={Props.states} selectedState={selectedState} selectedMonth={selectedMonth} selectedYear={selectedYear} handleYearChange={handleYearChange} handleStateChange={handleStateChange} handleMonthChange={handleMonthChange} points={pollutantHeatData} />:<></>}
          <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
            Average O3 AQI Timeline
          </h2>
          <LineChart aqi_data={aqiData}/>
        </section>

        <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
          <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
            Cities with the Best O3 AQI
          </h2>
        {cleanestCities !==null ?<BarChart aqi_data={cleanestCities}/>:<></>} 
          <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
          Cities with the Worst O3 AQI
          </h2>
        {dirtiestCities !==null ?<BarChart aqi_data={dirtiestCities}/>:<></>} 
        </section>
        {displayData !==null ?displayRecordTable(displayData) : <></>}     
      </div>
    </>
  );
};

export { O3 };
