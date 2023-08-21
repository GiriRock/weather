import Head from "next/head";
import Aux from "../components/Auxilary";
import FamousPlaces from "../components/FamousPlaces";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <Aux>
      <Head>
        <title>Weather App</title>
      </Head>

      <div className="home">
        <div className="container">
          <h1 className="appTitle">⛅ Weather</h1>
          <p className="herotext">Weather: Your Daily Forecast Companion</p>
          <SearchBox placeholder="Search a city..."  />
          <FamousPlaces/>
        </div>
      </div>
    </Aux>
  );
}
