import { useState, useEffect } from "react";
import Heatmap from "../../../Components/HeatMap";
import LineChart from "../../../Components/LineChart";
import {
  HttpClient,
  SearchParams,
  PollutantType,
  PollutantInfo,
} from "../../../services/HttpClient";
import { PollutantProps} from "..";
import BarChart from "../../../Components/BarChart";


const displayRecordTable =(pollutantHeatData:any)=>{return (<>
  <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
  Example of CO heat Record 
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

const CO = (Props: PollutantProps) => {
  let [pollutantHeatData, setPollutantHeatData] = useState<[number, number, number][]>([]);
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
  
      client.get_pollutant_timeline(PollutantType.CO).then((data) => {
        setAqiData(data)
      });

      client.get_pollutant_cleanest_cities(PollutantType.CO).then((data) => {
        setCleanestCities(data)
      });
  
      client.get_pollutant_dirtiest_cities(PollutantType.CO).then((data) => {
        setDirtiestCities(data)
      });
    }, []);

  return ( 
    <>
    <h1 className="text-4xl font-bold text-gray-800 mb-6">
  Overview of Carbon Monoxide (CO)
</h1>
<div className="mt-5">
  <section className="text-lg text-gray-600 max-w-4xl mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      What is Carbon Monoxide (CO)?
    </h2>
    <p className="text-gray-700">
      Carbon Monoxide (CO) is a colorless, odorless, and tasteless flammable gas produced by incomplete combustion of carbon-containing fuels. It's often called the "silent killer" because it's undetectable without special equipment. CO binds strongly to hemoglobin in blood, reducing oxygen delivery to vital organs.
    </p>
  </section>

  <section className="text-lg text-gray-600 max-w-4xl mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Health Effects
    </h2>
    <ul className="list-disc list-inside text-gray-700">
      <li>
        <span className="font-semibold">Headaches/Dizziness:</span>{" "}
        Initial symptoms at low concentrations (50 ppm)
      </li>
      <li>
        <span className="font-semibold">Loss of Consciousness:</span>{" "}
        Occurs at concentrations above 150 ppm
      </li>
      <li>
        <span className="font-semibold">Fatal Poisoning:</span>{" "}
        Exposure to 800 ppm can cause death within 2 hours
      </li>
      <li>
        <span className="font-semibold">Chronic Effects:</span>{" "}
        Long-term exposure linked to neurological impairment
      </li>
      <li>
        <span className="font-semibold">Pregnancy Risks:</span>{" "}
        Can cause fetal development issues and miscarriage
      </li>
    </ul>
  </section>

  <section className="text-lg text-gray-600 max-w-4xl mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Main Sources of CO
    </h2>
    <ul className="list-disc list-inside text-gray-700">
      <li>
        <span className="font-semibold">Vehicle Exhaust:</span>{" "}
        Primary source in urban areas (cars, trucks, engines)
      </li>
      <li>
        <span className="font-semibold">Faulty Heaters:</span>{" "}
        Gas-powered furnaces and water heaters
      </li>
      <li>
        <span className="font-semibold">Industrial Processes:</span>{" "}
        Steel production, chemical manufacturing
      </li>
      <li>
        <span className="font-semibold">Wildfires:</span>{" "}
        Natural combustion events
      </li>
      <li>
        <span className="font-semibold">Tobacco Smoke:</span>{" "}
        Significant contributor to indoor CO levels
      </li>
    </ul>
  </section>

  <section className="text-lg text-gray-600 max-w-4xl mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Environmental Impact
    </h2>
    <ul className="list-disc list-inside text-gray-700">
      <li>
        <span className="font-semibold">Atmospheric Chemistry:</span>{" "}
        Contributes to ground-level ozone formation
      </li>
      <li>
        <span className="font-semibold">Indirect Greenhouse Gas:</span>{" "}
        Extends lifetime of methane in atmosphere
      </li>
      <li>
        <span className="font-semibold">Plant Growth:</span>{" "}
        High concentrations can inhibit plant respiration
      </li>
      <li>
        <span className="font-semibold">Global Distribution:</span>{" "}
        Helps track atmospheric transport patterns
      </li>
    </ul>
  </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Average CO AQI in USA
        </h2>
        {pollutantHeatData !==null ? <Heatmap states={Props.states} selectedState={selectedState} selectedMonth={selectedMonth} selectedYear={selectedYear} handleYearChange={handleYearChange} handleStateChange={handleStateChange} handleMonthChange={handleMonthChange} points={pollutantHeatData} />:<></>}
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
          Average CO AQI Timeline
        </h2>
        <LineChart aqi_data={aqiData}/>
      </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Cities with the Best CO AQI
        </h2>
      {cleanestCities !==null ?<BarChart aqi_data={cleanestCities}/>:<></>} 
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
        Cities with the Worst CO AQI
        </h2>
      {dirtiestCities !==null ?<BarChart aqi_data={dirtiestCities}/>:<></>} 
      </section>
      {displayData !==null ?displayRecordTable(displayData) : <></>} 
    </div>
  </>
)
};

export { CO };
