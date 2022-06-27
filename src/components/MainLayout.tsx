import { Fragment, ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  return (
    <div className="p-4">
      <Header />
      <main>{props.children}</main>
    </div>
  );
}
