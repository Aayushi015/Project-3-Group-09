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
  Example of SO2 heat Record 
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

const SO2 = (Props: PollutantProps) => {
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
  
      client.get_pollutant_timeline(PollutantType.SO2).then((data) => {
        setAqiData(data)
      });

      client.get_pollutant_cleanest_cities(PollutantType.SO2).then((data) => {
        setCleanestCities(data)
      });
  
      client.get_pollutant_dirtiest_cities(PollutantType.SO2).then((data) => {
        setDirtiestCities(data)
      });
    }, []);

  return ( 
    <>
  <h1 className="text-4xl font-bold text-gray-800 mb-6">
    Overview of Sulfur Dioxide (SO₂)
  </h1>
  <div className="mt-5">
    <section className="text-lg text-gray-600 max-w-4xl mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        What is Sulfur Dioxide (SO₂)?
      </h2>
      <p className="text-gray-700">
        Sulfur Dioxide (SO₂) is a colorless gas with a sharp, irritating odor. It is produced by the burning of fossil fuels (coal and oil) and the smelting of mineral ores containing sulfur. SO₂ is a major air pollutant that can harm human health, ecosystems, and the environment. It is also a precursor to acid rain and particulate pollution.
      </p>
    </section>

    <section className="text-lg text-gray-600 max-w-4xl mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Health Effects
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          <span className="font-semibold">Acute Respiratory Distress:</span>{" "}
          Shortness of breath, throat inflammation, and chest tightness, even in healthy individuals during high-exposure events.
        </li>
        <li>
          <span className="font-semibold">Chronic Bronchitis:</span>{" "}
          Prolonged exposure can lead to persistent inflammation of the bronchial tubes.
        </li>
        <li>
          <span className="font-semibold">Eye and Mucous Membrane Irritation:</span>{" "}
          Burning sensation in the eyes, nose, and throat, particularly in industrial or urban areas.
        </li>
        <li>
          <span className="font-semibold">Cardiovascular Strain:</span>{" "}
          Emerging studies link high SO₂ levels to increased risk of heart attacks and strokes.
        </li>
      </ul>
    </section>

    <section className="text-lg text-gray-600 max-w-4xl mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Main Sources of SO₂
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          <span className="font-semibold">Coal-Fired Power Plants:</span>{" "}
          Primary emitters due to sulfur-rich coal combustion for electricity generation.
        </li>
        <li>
          <span className="font-semibold">Industrial Processes:</span>{" "}
          Metal smelting (e.g., copper, lead), petroleum refining, and paper manufacturing.
        </li>
        <li>
          <span className="font-semibold">Shipping and Marine Fuels:</span>{" "}
          Large cargo ships using high-sulfur bunker fuel, especially in coastal regions.
        </li>
        <li>
          <span className="font-semibold">Residential Heating:</span>{" "}
          Burning sulfur-containing fuels like coal or oil in older heating systems.
        </li>
        <li>
          <span className="font-semibold">Volcanic Activity:</span>{" "}
          Natural emissions during eruptions, though anthropogenic sources dominate.
        </li>
      </ul>
    </section>

    <section className="text-lg text-gray-600 max-w-4xl mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Environmental Impact
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          <span className="font-semibold">Acid Rain:</span>{" "}
          SO₂ reacts with water vapor in the atmosphere to form sulfuric acid, leading to acid rain that damages ecosystems, soils, and water bodies.
        </li>
        <li>
          <span className="font-semibold">Plant Damage:</span>{" "}
          Acid rain and direct exposure to SO₂ can harm vegetation, reducing crop yields and damaging forests.
        </li>
        <li>
          <span className="font-semibold">Air Quality Degradation:</span>{" "}
          SO₂ contributes to the formation of fine particulate matter (PM₂.₅), which reduces visibility and harms air quality.
        </li>
      </ul>
    </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Average SO2 AQI in USA
        </h2>
        {pollutantHeatData !==null ? <Heatmap states={Props.states} selectedState={selectedState} selectedMonth={selectedMonth} selectedYear={selectedYear} handleYearChange={handleYearChange} handleStateChange={handleStateChange} handleMonthChange={handleMonthChange} points={pollutantHeatData} />:<></>}
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
          Average SO2 AQI Timeline
        </h2>
        <LineChart aqi_data={aqiData}/>
      </section>

      <section className="flex flex-col items-center justify-center text-lg text-gray-600 max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-7 text-center">
          Cities with the Best SO2 AQI
        </h2>
      {cleanestCities !==null ?<BarChart aqi_data={cleanestCities}/>:<></>} 
        <h2 className="text-2xl font-semibold text-3xl text-gray-800 mb-7 mt-10 text-center">
        Cities with the Worst SO2 AQI
        </h2>
      {dirtiestCities !==null ?<BarChart aqi_data={dirtiestCities}/>:<></>} 
      </section>
      {displayData !==null ?displayRecordTable(displayData) : <></>} 
    </div>
  </>
)
};

export { SO2 };
