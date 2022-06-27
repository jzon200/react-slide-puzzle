import { motion } from "framer-motion";

type Props = {
  text: string | number;
  isMoveableX: boolean;
  isMoveableY: boolean;
  isTapped: boolean;
  onClick: () => void;
};

// const btnVariants: Variants = {
//   clicked: {
//     x: 100,
//     transition: {
//       type: "tween",
//       duration: 0.5,
//     },
//   },
//   initial: {
//     x: 0,
//     transition: {
//       type: "tween",
//       duration: 0.5,
//     },
//   },
// };

export default function PuzzleTile(props: Props) {
  const { text, isMoveableX, isMoveableY, isTapped, onClick } = props;

  // TODO: Fix the animation of tapped tile
  return (
    <motion.button
      transition={{ type: "tween", duration: 0.5 }}
      animate={{
        x: isTapped && isMoveableX ? 88 : 0,
        y: isTapped && isMoveableY ? 88 : 0,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 88,
      }}
      dragElastic={false}
      dragTransition={{ power: 0, timeConstant: 5000 }}
      onClick={onClick}
      className="w-20 h-20 p-4 grid place-items-center
     rounded-xl text-3xl font-bold bg-blue-600 text-white
     hover:bg-blue-400"
    >
      {text}
    </motion.button>
  );
}
