import { useState, useEffect } from "react";
import Heatmap from "../../../Components/HeatMap";
import { PollutantProps } from "../index";
import {
  HttpClient,
  SearchParams,
  PollutantType,
  PollutantInfo,
} from "../../../services/HttpClient";

const O3 = (Props: PollutantProps) => {
  let [pollutantHeatData, setPollutantHeatData] = useState<
    [number, number, number][]
  >([]);

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

    client.get_pollutants_info(search, PollutantType.O3).then((data) => {
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
      </div>
    </>
  );
};

export { O3 };
