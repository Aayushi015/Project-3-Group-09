import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

const gradient = {
  0.16: "#18cb30",
  0.33: "#e7d82d",
  0.5: "#DC683e",
  0.66: "#DD375b",
  1: "#780b8e",
};

//Layer for the map
const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState(4);

  useEffect(() => {
    if (!map || !points.length) return;

    const heatLayer = (L as any).heatLayer(points, {
      radius: 20,
      blur: 7,
      maxZoom: 14,
      max: 300.0,
      gradient: gradient,
    });

    heatLayer.addTo(map);

    const handleZoomEnd = () => {
      const zoom = map.getZoom();
      console.log(zoom);
      setCurrentZoom(zoom);
    };

    map.on("zoomend", handleZoomEnd);

    // Cleanup the event listener on component unmount
    return () => {
      map.off("zoomend", handleZoomEnd);
      map.removeLayer(heatLayer);
    };
  }, [map, points, currentZoom]);

  return null;
};

interface Props {
  points: [number, number, number][];
}

const Heatmap = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[39.8283, -98.5795]} // USA Center
        zoom={4}
        zoomControl={false}
        maxZoom={6}
        className="w-full h-110 rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.carto.com/">Carto</a>'
        />

        {/* Heatmap Layer */}
        <HeatmapLayer points={props.points} />
      </MapContainer>
    </div>
  );
};

export default Heatmap;
