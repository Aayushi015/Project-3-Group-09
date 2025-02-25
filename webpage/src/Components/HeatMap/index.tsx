import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

const gradient = {
  0.16: "#18cb30",
  0.33: "#e7d82d",
  0.5: "#DC683e",
  0.66: "#DD375b",
  1: "#780b8e",
};

interface Props{
  points:[number, number, number][];
  states:any;
  selectedState:any;
  selectedYear:any;
  selectedMonth:any;
  handleYearChange:any;
  handleMonthChange:any;
  handleStateChange:any;
}

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

   // Generate an array of years from 2000 to 2023
   const years = Array.from({ length: 24 }, (_, index) => 2000 + index);
   const months = Array.from({ length: 12 }, (_, index) => 1 + index);

//Layer for the map
const HeatmapLayer = ( {points}:{points:[number, number, number][]}) => {

  const map = useMap();

  useEffect(() => {
    if (!map || !points.length) return;

    const heatLayer = (L as any).heatLayer(points, {
      radius: 20,
      blur: 7,
      maxZoom: 7,
      max: 300.0,
      gradient: gradient,
    });

    heatLayer.addTo(map);

    // Cleanup the event listener on component unmount
      // Cleanup the heatmap layer on component unmount
      return () => {
        if (heatLayer && map.hasLayer(heatLayer)) {
          map.removeLayer(heatLayer);
        }
      }
  }, [map, points]);

  return null;
};

interface Props {
  points: [number, number, number][];
}

const Heatmap = ({selectedYear, selectedMonth,selectedState, states, points,handleYearChange, handleMonthChange, handleStateChange}: Props) => {

  const bounds = [
    [24.396308, -125.0], // Southwest coordinates
    [49.384358, -66.93457], // Northeast coordinates
  ];

  return (

    <>
    <div className=" flex w-full justify-center mb-5">

       <div className="relative inline-block text-left">
        <h3 className="text-gray-500 font-bold">Year</h3>
          <select
            value={selectedYear ?? ""}
            onChange={handleYearChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-neutral-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

        <div className="relative ml-3 inline-block text-left">
        <h3 className="text-gray-500 font-bold">Month</h3>
          <select
            value={selectedMonth ?? ""}
            onChange={handleMonthChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-neutral-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Disable</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {mapMonth(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative ml-3 inline-block text-left">
        <h3 className="text-gray-500 font-bold">State</h3>
          <select
            value={selectedState ?? ""}
            onChange={handleStateChange}
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-neutral-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Disable</option>
            {states.map((state: any) => (
              <option key={state.id} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
    </div>
        <div className="w-full">
          <MapContainer
            center={[39.8283, -98.5795]} // USA Center
            zoom={4}
            // @ts-ignore
            maxBounds={bounds}
            zoomControl={false}
            minZoom={4}
            maxZoom={7}
            className="w-full h-110 rounded-lg shadow-lg"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.carto.com/">Carto</a>'
            />

            {/* Heatmap Layer */}
            <HeatmapLayer points={points} />
          </MapContainer>
        </div>
    </>
  );
};

export default Heatmap;
