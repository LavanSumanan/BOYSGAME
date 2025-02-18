import { createContext, useState, useContext } from "react";
import { BOY_MEDIA_URLS } from "../constants/boyMedia";

/* Boy
id: string
photoId: string
videoId: string
pointValue?: int
*/

const BoysContext = createContext();

const boys = [
  {
    id: "jules",
    photoId: BOY_MEDIA_URLS.JULES.PHOTO,
    videoId: BOY_MEDIA_URLS.JULES.VIDEO,
    pointValue: 1,
  },
  {
    id: "jerry",
    photoId: BOY_MEDIA_URLS.JERRY.PHOTO,
    videoId: BOY_MEDIA_URLS.JERRY.VIDEO,
    pointValue: 10,
  },
  {
    id: "colin",
    photoId: BOY_MEDIA_URLS.COLIN.PHOTO,
    videoId: BOY_MEDIA_URLS.COLIN.VIDEO,
    pointValue: 1,
  },
  {
    id: "anthony",
    photoId: BOY_MEDIA_URLS.ANTHONY.PHOTO,
    videoId: BOY_MEDIA_URLS.ANTHONY.VIDEO,
    pointValue: 1,
  },
  {
    id: "kwethan",
    photoId: BOY_MEDIA_URLS.KWETHAN.PHOTO,
    videoId: BOY_MEDIA_URLS.KWETHAN.VIDEO,
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

  const resetBoys = () => {
    setCurrentBoyIndex(0);
  };

  const currentBoy = boys[currentBoyIndex];

  return (
    <BoysContext.Provider
      value={{
        currentBoyIndex,
        currentBoy,
        setNextBoy,
        setPreviousBoy,
        resetBoys,
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
