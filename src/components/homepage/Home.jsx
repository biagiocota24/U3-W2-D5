import { useState } from "react";
import WheatherLocation from "./RenderWheatherLocation";
import SelectPlace from "./SelectPlace";

const Home = function (props) {
  const [nazioneSelezionata, setNazioneSelezionata] = useState("IT");
  const [citta, setCitta] = useState("Bari");
  return (
    <div>
      <SelectPlace
        nazioneSelezionata={nazioneSelezionata}
        setNazioneSelezionata={setNazioneSelezionata}
        citta={citta}
        setCitta={setCitta}
        query={props.query}
        setQuery={props.setQuery}
      />
      <WheatherLocation
        nazioneSelezionata={nazioneSelezionata}
        setNazioneSelezionata={setNazioneSelezionata}
        citta={citta}
        setCitta={setCitta}
        query={props.query}
        setQuery={props.setQuery}
      />
    </div>
  );
};

export default Home;
