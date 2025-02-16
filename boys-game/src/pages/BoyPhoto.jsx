import { useBoys } from "../contexts/BoysContext";

export const BoyPhoto = () => {
  const { currentBoyIndex, currentBoy, setNextBoy, setPreviousBoy, totalBoys } =
    useBoys();
  return (
    <div>
      <h3>Total boys: {totalBoys}</h3>
      <h3>Current boy index: {currentBoyIndex}</h3>
      <h3>Current boy data:</h3>
      {Object.entries(currentBoy).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
      <button onClick={setNextBoy}>Next</button>
      <button onClick={setPreviousBoy}>Previous</button>
    </div>
  );
};
