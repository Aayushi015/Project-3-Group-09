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
  Example of NO2 heat Record 
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

const NO2 = (Props: PollutantProps) => {
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
  
      client.get_pollutant_timeline(PollutantType.NO2).then((data) => {
        setAqiData(data)
      });

      client.get_pollutant_cleanest_cities(PollutantType.NO2).then((data) => {
        setCleanestCities(data)
      });
  
      client.get_pollutant_dirtiest_cities(PollutantType.NO2).then((data) => {
        setDirtiestCities(data)
      });
    }, []);

  return ( 
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
      Overview of Nitrogen Dioxide (NO₂)
      </h1>
    <div className="mt-5">
      {/* What is NO₂? Section */}
      <section className="text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          What is Nitrogen Dioxide (NO₂)?
        </h2>
        <p className="text-gray-700">
          Nitrogen Dioxide (NO₂) is a reddish-brown gas with a pungent, acrid odor. It forms when fossil fuels (coal, oil, gas) are burned at high temperatures, primarily from vehicles, power plants, and industrial facilities. NO₂ is a key component of urban air pollution and contributes to the formation of smog and fine particulate matter (PM₂.₅). Exposure to elevated levels poses significant health and environmental risks.
        </p>
      </section>

      {/* Health Effects Section */}
      <section className="text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Health Effects
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <span className="font-semibold">Respiratory Irritation:</span>{" "}
            Causes inflammation of the airways, leading to coughing, wheezing, and difficulty breathing.
          </li>
          <li>
            <span className="font-semibold">Asthma Aggravation:</span>{" "}
            Increases the frequency and severity of asthma attacks, especially in children.
          </li>
          <li>
            <span className="font-semibold">Impaired Lung Development:</span>{" "}
            Long-term exposure in children can permanently reduce lung function.
          </li>
          <li>
            <span className="font-semibold">Increased Respiratory Infections:</span>{" "}
            Weakens lung defenses, raising susceptibility to bronchitis and pneumonia.
          </li>
          <li>
            <span className="font-semibold">Cardiovascular Stress:</span>{" "}
            Linked to elevated risks of heart attacks and strokes in vulnerable populations.
          </li>
        </ul>
      </section>

      {/* Main Sources Section */}
      <section className="text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Main Sources of NO₂
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <span className="font-semibold">Road Traffic:</span>{" "}
            Diesel and gasoline vehicles, particularly in congested urban areas.
          </li>
          <li>
            <span className="font-semibold">Power Generation:</span>{" "}
            Coal and gas-fired power plants emitting NO₂ during electricity production.
          </li>
          <li>
            <span className="font-semibold">Industrial Activities:</span>{" "}
            Manufacturing processes, metal refining, and chemical production.
          </li>
          <li>
            <span className="font-semibold">Residential Combustion:</span>{" "}
            Gas stoves, heaters, and poorly ventilated indoor fuel-burning appliances.
          </li>
          <li>
            <span className="font-semibold">Agricultural Emissions:</span>{" "}
            Heavy machinery and fertilizer application releasing nitrogen compounds.
          </li>
        </ul>
      </section>

      {/* Environmental Impact Section */}
      <section className="text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Environmental Impact
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <span className="font-semibold">Photochemical Smog:</span>{" "}
            Reacts with sunlight and volatile organic compounds (VOCs) to form ground-level ozone (O₃), a harmful component of smog.
          </li>
          <li>
            <span className="font-semibold">Acid Rain:</span>{" "}
            Converts to nitric acid in the atmosphere, acidifying soils, lakes, and rivers, which harms aquatic life and vegetation.
          </li>
          <li>
            <span className="font-semibold">Eutrophication:</span>{" "}
            Deposits excess nitrogen into ecosystems, promoting algal blooms that deplete oxygen in water bodies (dead zones).
          </li>
          <li>
            <span className="font-semibold">Particulate Matter Formation:</span>{" "}
            Contributes to PM₂.₅ pollution by reacting with ammonia and other compounds, reducing air quality and visibility.
          </li>
        </ul>
      </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Average NO2 AQI in USA
        </h2>
        {pollutantHeatData !==null ? <Heatmap states={Props.states} selectedState={selectedState} selectedMonth={selectedMonth} selectedYear={selectedYear} handleYearChange={handleYearChange} handleStateChange={handleStateChange} handleMonthChange={handleMonthChange} points={pollutantHeatData} />:<></>}
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
          Average NO2 AQI Timeline
        </h2>
        <LineChart aqi_data={aqiData}/>
      </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Cities with the Best NO2 AQI
        </h2>
      {cleanestCities !==null ?<BarChart aqi_data={cleanestCities}/>:<></>} 
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
        Cities with the Worst NO2 AQI
        </h2>
      {dirtiestCities !==null ?<BarChart aqi_data={dirtiestCities}/>:<></>} 
      </section>
      {displayData !==null ?displayRecordTable(displayData) : <></>} 
    </div>
  </>
)
};

export { NO2 };
