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
    id: "harper",
    photoId: BOY_MEDIA_URLS.HARPER.PHOTO,
    unzoomId: BOY_MEDIA_URLS.HARPER.UNZOOM,
    pointValue: 10,
  },
  {
    id: "harry",
    photoId: BOY_MEDIA_URLS.HARRY.PHOTO,
    unzoomId: BOY_MEDIA_URLS.HARRY.UNZOOM,
    pointValue: 20,
  },
  {
    id: "jerry",
    photoId: BOY_MEDIA_URLS.JERRY.PHOTO,
    unzoomId: BOY_MEDIA_URLS.JERRY.UNZOOM,
    pointValue: 30,
  },
  {
    id: "kiersten",
    photoId: BOY_MEDIA_URLS.KIERSTEN.PHOTO,
    unzoomId: BOY_MEDIA_URLS.KIERSTEN.UNZOOM,
    pointValue: 40,
  },
  {
    id: "jules",
    photoId: BOY_MEDIA_URLS.JULES.PHOTO,
    unzoomId: BOY_MEDIA_URLS.JULES.UNZOOM,
    videoId: BOY_MEDIA_URLS.JULES.VIDEO,
    pointValue: 50,
  },
  {
    id: "kwethan",
    photoId: BOY_MEDIA_URLS.KWETHAN.PHOTO,
    unzoomId: BOY_MEDIA_URLS.KWETHAN.UNZOOM,
    videoId: BOY_MEDIA_URLS.KWETHAN.VIDEO,
    pointValue: 60,
  },
  {
    id: "trevor",
    photoId: BOY_MEDIA_URLS.TREVOR.PHOTO,
    unzoomId: BOY_MEDIA_URLS.TREVOR.UNZOOM,
    videoId: BOY_MEDIA_URLS.TREVOR.VIDEO,
    pointValue: 70,
  },
  {
    id: "colin",
    photoId: BOY_MEDIA_URLS.COLIN.PHOTO,
    unzoomId: BOY_MEDIA_URLS.COLIN.UNZOOM,
    videoId: BOY_MEDIA_URLS.COLIN.VIDEO,
    pointValue: 100,
  },
  {
    id: "tony",
    photoId: BOY_MEDIA_URLS.TONY.PHOTO,
    unzoomId: BOY_MEDIA_URLS.TONY.UNZOOM,
    videoId: BOY_MEDIA_URLS.TONY.VIDEO,
    pointValue: 250,
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
