import React from "react";
import Image from "next/image";
import Link from "next/link";

import Tehran from "../public/images/tehran.jpg";
import LondonImage from "../public/images/london.jpg";
import ParisImage from "../public/images/paris.jpg";
import NewYorkImage from "../public/images/new-york.jpg";

const places = [
  {
    name: "Tehran",
    image: Tehran,
    url: "/location/ChIJ2dzzH0kAjj8RvCRwVnxps_A",
  },
  {
    name: "London",
    image: LondonImage,
    url: "/location/ChIJdd4hrwug2EcRmSrV3Vo6llI",
  },
  {
    name: "Paris",
    image: ParisImage,
    url: "/location/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  },
  {
    name: "New York",
    image: NewYorkImage,
    url: "/location/ChIJOwg_06VPwokRYv534QaPC8g",
  },
];
export default function FamousPlaces() {
   return (
      <div className="places">
        <div className="places__row">
          {places.length > 0 &&
            places.map((place, index) => (
              <div className="places__box" key={index}>
                <Link href={place.url}>
                  <div className="places__image-wrapper">
                        <Image
                          src={place.image}
                          alt={`${place.name} Image`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
    
                      <span>{place.name}</span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
}
