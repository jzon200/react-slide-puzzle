import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="mb-40">
        <Header />
        <main>{props.children}</main>
      </div>
    </div>
  );
}
