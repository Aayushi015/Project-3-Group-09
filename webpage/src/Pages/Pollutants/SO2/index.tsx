import { useState, useEffect } from "react";
import Heatmap from "../../../Components/HeatMap";
import LineChart from "../../../Components/LineChart";
import {
  HttpClient,
  SearchParams,
  PollutantType,
} from "../../../services/HttpClient";
import { PollutantProps} from "..";

const SO2 = (Props: PollutantProps) => {
  let [pollutantHeatData, setPollutantHeatData] = useState<[number, number, number][]>([]);
  let [aqiData,setAqiData] = useState<any>([]);


  const [selectedYear, setSelectedYear] = useState<number>(2000);
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [selectedState, setSelectedState] = useState<string>("");
  
    // Generate an array of years from 2000 to 2023
    const years = Array.from({ length: 24 }, (_, index) => 2000 + index);
    const months = Array.from({ length: 12 }, (_, index) => 1 + index);
  
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
  
    const mapMonth = (index: number): String => {
      let months_names = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  
      return months_names[index - 1];
    };
  
    useEffect(() => {
      let client = new HttpClient();
  
      let search: SearchParams = {
        year: selectedYear,
        month: selectedMonth,
        state: selectedState,
      };
  
      client.get_pollutants_info(search, PollutantType.SO2).then((data) => {
        let heatdata: [number, number, number][] = [];
        console.log(data);
        data.map((p) => {
          let point: [number, number, number] = [
            p.location.latitude,
            p.location.longitude,
            p.aqi,
          ];
  
          heatdata.push(point);
        });
  
        setPollutantHeatData(heatdata);
      });
    }, [selectedYear, selectedMonth, selectedState]);
  
    useEffect(() => {
      let client = new HttpClient();
  
      client.get_pollutant_timeline(PollutantType.SO2).then((data) => {
        setAqiData(data)
      });
    }, []);

  return ( 
    <>
    {/* SO₂ Section */}
    <h1 className="text-4xl font-bold text-gray-800 mb-6">
      Sulfur Dioxide (SO₂) & Air Quality
    </h1>
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        What is Sulfur Dioxide (SO₂)?
      </h2>
      <p className="text-gray-700">
        SO₂ is a major air pollutant that negatively affects human health and
        the environment. It primarily comes from fossil fuel combustion and industrial processes.
      </p>
    </section>
    {/* SO₂ AQI Levels */}
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        SO₂ AQI Levels & Health Implications
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">AQI Level</th>
            <th className="border border-gray-300 px-4 py-2">SO₂ (ppb)</th>
            <th className="border border-gray-300 px-4 py-2">Health Implications</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">0-50 (Good)</td>
            <td className="border px-4 py-2">0-35</td>
            <td className="border px-4 py-2">No health impacts expected.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">51-100 (Moderate)</td>
            <td className="border px-4 py-2">36-75</td>
            <td className="border px-4 py-2">Mild effects in sensitive individuals.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">101-150 (Unhealthy for Sensitive Groups)</td>
            <td className="border px-4 py-2">76-185</td>
            <td className="border px-4 py-2">Respiratory symptoms in sensitive groups.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">151-200 (Unhealthy)</td>
            <td className="border px-4 py-2">186-304</td>
            <td className="border px-4 py-2">General public may experience health effects.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">201-300 (Very Unhealthy)</td>
            <td className="border px-4 py-2">305-604</td>
            <td className="border px-4 py-2">Serious health effects; limit outdoor exposure.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">301+ (Hazardous)</td>
            <td className="border px-4 py-2">605+</td>
            <td className="border px-4 py-2">Health emergency; severe health effects.</td>
          </tr>
        </tbody>
      </table>
    </section>
    {/* Ways to Reduce Exposure */}
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Ways to Reduce SO₂ Exposure
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Stay indoors when SO₂ levels are high.</li>
        <li>Use air purifiers with HEPA filters.</li>
        <li>Support clean energy initiatives.</li>
        <li>Reduce reliance on fossil fuel-based energy.</li>
      </ul>
    </section>

    <div className="relative inline-block text-left">
          <select
            value={selectedYear ?? ""}
            onChange={handleYearChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select a Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="relative inline-block text-left">
          <select
            value={selectedMonth ?? ""}
            onChange={handleMonthChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Disable</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {mapMonth(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative inline-block text-left">
          <select
            value={selectedState ?? ""}
            onChange={handleStateChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Disable</option>
            {Props.states.map((state: any) => (
              <option key={state.id} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
        <Heatmap points={pollutantHeatData} />
        <LineChart aqi_data={aqiData}/>
    </>
)
};

export { SO2 };
