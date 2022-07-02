import { MdRefresh } from "react-icons/md";
import { usePuzzleDispatch } from "../hooks";

export default function ShuffleButton() {
  const dispatch = usePuzzleDispatch();

  const handleShuffle = () => {
    dispatch({ type: "shuffled" });
  };

  return (
    <div className="flex m-4 justify-center">
      <button
        onClick={handleShuffle}
        className="flex justify-center items-center gap-2 w-36 p-2
        bg-blue-600 text-blue-50 font-medium text-lg rounded-full
        hover:bg-blue-500"
      >
        <MdRefresh size={24} />
        Shuffle
      </button>
    </div>
  );
}
