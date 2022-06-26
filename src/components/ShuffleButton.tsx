import { BsArrowRepeat } from "react-icons/bs";

export default function ShuffleButton() {
  return (
    <div className="flex m-4 justify-center">
      <button
        className="flex justify-center items-center gap-2 w-36 p-2
        bg-blue-600 text-blue-50 font-medium text-lg rounded-full"
      >
        <BsArrowRepeat size={24} />
        Shuffle
      </button>
    </div>
  );
}
