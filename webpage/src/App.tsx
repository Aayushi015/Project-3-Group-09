import { Pollutants, Home, About,Source} from "./Pages";
import { Route, Routes } from "react-router-dom";
import SlideMenu from "./Components/SlideMenu";

export default function LandingPage() {
  return (
    <>
      <div className="absolute w-full  min-h-screen bg-slate-200 text-white flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pollutants/*" element={<Pollutants />} />
          <Route path="/source" element={<Source />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <SlideMenu />
    </>
  );
}
