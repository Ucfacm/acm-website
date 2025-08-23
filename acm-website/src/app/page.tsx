import BinaryWall from '../components/binarywall';
import Hero from '../components/hero';
import About from '../components/about'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <main className="relative w-full h-screen sm:p-12">
      <div className="absolute inset-0">
        <BinaryWall />
      </div>
  
      <div
        className="absolute inset-0 max-[1025px]:hidden overflow-hidden"
      >
        <svg
          viewBox="0 0 1261 868"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-full absolute top-0 left-0"
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M1261 -19C1261 -19 1191.5 868 -170 868V-19H179.501H1261Z" fill="url(#paint0_linear_27_60)" fillOpacity="0.51"/>
            <defs>
            <linearGradient id="paint0_linear_27_60" x1="545.5" y1="-19" x2="546" y2="1261" gradientUnits="userSpaceOnUse">
            <stop offset="0.3"/>
            <stop offset="0.4" stopColor="#181818" stopOpacity="0"/>
            </linearGradient>
            </defs>
        </svg>
        
      </div>
  
      <div className="relative 2xl:mx-auto sm:w-fit">
        <Navbar />
        <Hero />
        <About />
      </div>

  </main>
  
  );
}