import { createContext, useState, useContext } from "react";
import { BOY_PHOTO_NAMES, BOY_VIDEO_NAMES } from "../constants/boyNames";

/* Boy
id: string
photoId: string
videoId: string
pointValue?: int
*/

const BoysContext = createContext();

const boys = [
  {
    id: "colin",
    photoId: BOY_PHOTO_NAMES.COLIN,
    videoId: BOY_VIDEO_NAMES.COLIN,
    pointValue: 1,
  },
  {
    id: "anthony",
    photoId: BOY_PHOTO_NAMES.ANTHONY,
    videoId: BOY_VIDEO_NAMES.ANTHONY,
    pointValue: 1,
  },
  {
    id: "kwethan",
    photoId: BOY_PHOTO_NAMES.KWETHAN,
    videoId: BOY_VIDEO_NAMES.KWETHAN,
    pointValue: 1,
  },
];

export const BoysProvider = ({ children }) => {
  const totalBoys = boys.length;

  const [currentBoyIndex, setCurrentBoyIndex] = useState(0);

  const setNextBoy = () => {
    if (currentBoyIndex < totalBoys - 1) {
      setCurrentBoyIndex((prev) => prev + 1);
    }
  };

  const setPreviousBoy = () => {
    if (currentBoyIndex > 0) {
      setCurrentBoyIndex((prev) => prev - 1);
    }
  };

  const currentBoy = boys[currentBoyIndex];

  return (
    <BoysContext.Provider
      value={{
        currentBoyIndex,
        currentBoy,
        setNextBoy,
        setPreviousBoy,
        totalBoys,
      }}
    >
      {children}
    </BoysContext.Provider>
  );
};

export const useBoys = () => {
  return useContext(BoysContext);
};
