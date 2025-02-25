import { useState } from "react";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

const SlideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [isPollutantsOpen, setIsPollutantsOpen] = useState(false);

  const togglePollutantsMenu = () => {
    setIsPollutantsOpen(!isPollutantsOpen);
  };
  return (
    <>
      {/* Burger Menu Button */}
      <button
        className="fixed top-4 left-4 p-2 rounded-md bg-slate-200 hover:bg-slate-400 text-slate-500 hover:text-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Navigation Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-50 bg-slate-100 p-4 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-50"
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-md bg-slate-100 hover:bg-slate-400 text-slate-500 hover:text-gray-50"
          onClick={() => setIsOpen(false)} // Close the menu
        >
          <X size={24} className="" />
          {/* Close icon */}
        </button>

        <ul className="space-y-2 mt-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-slate-400 text-gray-50" : "text-slate-500"
                } block m-1 p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
              }
            >
              Home
            </NavLink>

            <li>
              <NavLink
                to="/pollutants"
                onClick={togglePollutantsMenu}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-slate-400 text-gray-50" : "text-slate-500"
                  } flex align-items m-1 p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
                }
              >
                Pollutants
                {isPollutantsOpen ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </NavLink>

              {/* Dropdown Menu */}
              {isPollutantsOpen && (
                <ul className="pl-6 space-y-2 mt-2">
                  <NavLink
                    to="/pollutants/o3"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-slate-400 text-gray-50"
                          : "text-slate-500"
                      } block p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
                    }
                  >
                    Ozone
                  </NavLink>

                  <NavLink
                    to="/pollutants/so2"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-slate-400 text-gray-50"
                          : "text-slate-500"
                      } block p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
                    }
                  >
                    Sulfur Dioxide
                  </NavLink>

                  <NavLink
                    to="/pollutants/no2"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-slate-400 text-gray-50"
                          : "text-slate-500"
                      } block p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
                    }
                  >
                    Nitrogen Dioxide
                  </NavLink>

                  <NavLink
                    to="/pollutants/co"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-slate-400 text-gray-50"
                          : "text-slate-500"
                      } block p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
                    }
                  >
                    Carbon Monoxide
                  </NavLink>
                </ul>
              )}
            </li>

            <NavLink
              to="/source"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-slate-400 text-gray-50" : "text-slate-500"
                } block m-1 p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
              }
            >
              References
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-slate-400 text-gray-50" : "text-slate-500"
                } block m1 p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`
              }
            >
              About Us
            </NavLink>
        </ul>
      </div>
    </>
  );
};

export default SlideMenu;
