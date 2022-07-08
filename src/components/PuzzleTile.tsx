type Props = {
  value: string | number;
  isActive: boolean;
  isSpace: boolean;
  onClick: () => void;
};

// TODO: Add animation on clicked tile
export default function PuzzleTile({
  value,
  isSpace,
  isActive,
  onClick,
}: Props) {
  if (isSpace) {
    return <div />;
  }

  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 p-4 grid place-items-center
     rounded-xl text-3xl font-bold text-white
     hover:bg-blue-400 ${isActive ? "bg-sky-500" : "bg-blue-600"}`}
    >
      {value}
    </button>
  );
}
