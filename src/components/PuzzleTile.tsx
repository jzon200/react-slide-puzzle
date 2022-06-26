import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  text: string | number;
  isTouched?: boolean;
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
  const [touched, setTouched] = useState(false);

  return (
    <motion.button
      transition={{ type: "tween", duration: 0.5 }}
      animate={{ x: touched ? 85 : 0 }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 85,
        top: 50,
        bottom: 50,
      }}
      dragElastic={false}
      dragTransition={{ power: 0, timeConstant: 5000 }}
      onClick={() => {
        setTouched((prevState) => !prevState);
      }}
      className="w-20 h-20 p-4 grid place-items-center
     rounded-xl text-3xl font-bold bg-blue-600 text-white
     hover:bg-blue-400"
    >
      {props.text}
    </motion.button>
  );
}
