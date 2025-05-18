import BinaryWall from '../components/binarywall';
import Hero from '../components/hero';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden sm:p-12">
      <div className="absolute inset-0 z-0">
        <BinaryWall />
      </div>
  
      <div
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1261 868"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-w-[1261px] absolute top-0 left-0 -translate-x-1/12"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M1261 -19C1261 -19 1191.5 868 -170 868V-19H179.501H1261Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
      </div>
  
    <div className="relative z-20 sm:w-fit">
      <Hero />
    </div>
  </main>
  
  );
}