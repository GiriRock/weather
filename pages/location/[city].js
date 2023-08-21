import React from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment-timezone";
import TodaysWeather from "../../components/TodaysWeather";
import SearchBox from "../../components/SearchBox";
import HourlyWeather from "../../components/HourlyWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import Aux from "../../components/Auxilary";
export async function getServerSideProps(context) {

  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.city}&fields=formatted_address,icon,name,photos,place_id,types,photos,geometry/location`
  const resp = await fetch(url);
  const resJson = await resp.json();
  const location = resJson.result.geometry.location
  const cityInfo = resJson.result.formatted_address

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&appid=3758782f6f4a58f2918cd31e5d29eecc&exclude=minutely&units=metric`
  );

  const data = await res.json();
    console.log(data)
  if (!data) {
    return {
      notFound: true,
    };
  }
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  return {
    props: {
      city: cityInfo,
      timezone: data.timezone,
      currentWeather: data.current,
      hourlyWeather: hourlyWeather,
      dailyWeather: data.daily,
    },
  };
}

const getCity = async(param) => {
  
  console.log(location)
  return location
};

const getHourlyWeather = (hourlyData, timezone) => {
  console.log(moment().tz(timezone))
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

export default function City({
  city,
  timezone,
  currentWeather,
  hourlyWeather,
  weeklyWeather,
  dailyWeather,
}) {
  return (
    <Aux>
      <Head>
        <title>{city.name} Weather | Weather App</title>
      </Head>
      <div className="page-wrapper">
        <div className="container">
          <Link href="/">
            Home
          </Link>
          <SearchBox placeholder="Search for another location..." />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </Aux>
  );
}
