import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-13 min-h-screen bg-slate-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        USA Air Pollution
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
        Explore the trends and impacts of major air pollutants in the United
        States from 2000 to 2023.
      </p>

      <div className="max-w-4xl text-gray-700 space-y-8">
        <section>
          <h2 className="pb-2 text-2xl font-semibold text-gray-800">
            Introduction
          </h2>
          <p className="text-justify leading-relaxed">
            Air pollution, an invisible yet pervasive threat, silently
            infiltrates the atmosphere we depend on for survival. From
            smog-choked cities to industrial zones emitting toxic fumes,
            contaminated air poses urgent risks to human health, ecosystems, and
            global stability. Being conscious of air pollution in our local
            areas is not just an environmental concern, it is a lifeline to
            safeguarding our well-being, economy, and shared future. Awareness
            of this issue empowers communities to advocate for cleaner air,
            adopt sustainable practices, and hold decision-makers accountable.
          </p>
        </section>

        <section>
          <h2 className="pb-2 text-2xl font-semibold text-gray-800">
            Health Impacts: Breathing in Danger
          </h2>
          <p className="text-justify leading-relaxed">
            Air pollution’s most immediate and devastating effects are on human
            health. Nitrogen oxides and sulfur dioxide emitted by vehicles,
            factories, and fossil fuel combustion penetrate deep into the lungs
            and bloodstream. Chronic exposure leads to respiratory diseases like
            asthma, bronchitis, and lung cancer, as well as cardiovascular
            conditions. For example, in cities like Delhi and Beijing, where air
            quality often reaches hazardous levels, hospitals report surges in
            patients with breathing difficulties, particularly among children
            and the elderly. The World Health Organization estimates that
            <span className="font-bold"> 99% of the global population </span>
            breathes air exceeding safe pollution limits, linking poor air
            quality to over 7 million premature deaths annually. Ignoring this
            crisis means accepting preventable suffering and strained healthcare
            systems.
          </p>
        </section>

        <section>
          <h2 className="pb-2 text-2xl font-semibold text-gray-800">
            Economic Consequences: The Cost of Dirty Air
          </h2>
          <p className="text-justify leading-relaxed">
            Air pollution also cripples economies. Healthcare expenditures for
            treating pollution-related illnesses burden families and governments
            alike. Lost productivity due to sick days or reduced cognitive
            function (studies show polluted air impairs focus and academic
            performance in children) further weakens workforce efficiency. For
            instance, the OECD projects that air pollution could cost the global
            economy <span className="font-bold">$2.6 trillion</span> annually by
            2060 due to healthcare and labor losses. Tourism and agriculture
            suffer too: smog obscures landmarks, while ground-level ozone
            damages crops. Conversely, investing in clean air—through renewable
            energy or green infrastructure—creates jobs and long-term savings,
            proving that environmental and economic health are intertwined.
          </p>
        </section>

        <p className="text-justify leading-relaxed">
          While the consequences of air pollution are vast and interconnected,3
          understanding its primary culprits
          <span className="font-bold"> carbon monoxide (CO)</span>,
          <span className="font-bold"> nitrogen dioxide (NO₂)</span>,
          <span className="font-bold"> ground-level ozone (O₃)</span> and
          <span className="font-bold"> sulfur dioxide (SO₂) </span>
          reveals the urgency of targeted action. These pollutants, each with
          distinct sources and devastating impacts, are the invisible architects
          of respiratory crises, environmental degradation, and socioeconomic
          inequities.
        </p>
      </div>

      <div className=" mt-10 flex justify-center align-items w-full max-w-5xl">
        <NavLink
          to="/pollutants"
          className={` card text-xl text-gray-700 font-bold bg-gray-100  p-4 rounded-lg shadow-lg hover:text-gray-50 text-slate-500block m-1 p-2  rounded hover:bg-slate-400  hover:text-gray-50 font-bold`}
        >
          Pollutants Overview
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
