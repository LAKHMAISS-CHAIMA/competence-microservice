import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Ajouter", to: "/ajouter" },
  { label: "Liste", to: "/liste" },
];

function Navbar() {
  const svgRef = useRef();
  const location = useLocation();

  const dashMap = [
    "0 2 8 73.3 8 10.7", 
    "0 12.6 9.5 49.3 9.5 31.6", 
    "0 24.5 8.5 27.5 8.5 55.5", 
  ];

  const activeIdx = navItems.findIndex(
    (item) => item.to === location.pathname
  );

  return (
    <nav className="relative w-full max-w-[400px] md:max-w-[600px] h-[64px] mx-auto my-6 px-2 md:px-0">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-pink-100 to-rose-100 flex flex-row justify-around items-center rounded-2xl shadow-lg z-10 border-2 border-violet-100 w-full h-full">
        {navItems.map((item, idx) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-3 md:px-6 py-2 text-violet-700 font-semibold cursor-pointer transition rounded-full hover:bg-white/60 hover:text-violet-900 focus:bg-white/80 focus:text-violet-900 outline-none ring-0 text-sm md:text-base ${
              activeIdx === idx ? "bg-white/80 text-violet-900 shadow" : ""
            }`}
            onMouseEnter={() => {
              if (svgRef.current) {
                svgRef.current.style.strokeDasharray = dashMap[idx];
                svgRef.current.style.strokeDashoffset = 0;
                svgRef.current.style.transition = "0.5s";
              }
            }}
            onMouseLeave={() => {
              if (svgRef.current) {
                svgRef.current.style.strokeDasharray = "0 0 10 40 10 40";
                svgRef.current.style.strokeDashoffset = 5;
                svgRef.current.style.transition = "0.5s";
              }
            }}
          >
            {item.label}
          </Link>
        ))}
        <svg
          className="absolute left-0 top-0 outline pointer-events-none w-full h-full"
          overflow="visible"
          viewBox=" 0 400 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            ref={svgRef}
            className="rect"
            pathLength="100"
            x="0"
            y="0"
            width="600"
            height="60"
            fill="transparent"
            strokeWidth="5"
            stroke="#a21caf"
            style={{
              strokeDashoffset: 5,
              strokeDasharray: "0 0 10 40 10 40",
              transition: "0.5s",
            }}
          ></rect>
        </svg>
      </div>
    </nav>
  );
}

export default Navbar; 