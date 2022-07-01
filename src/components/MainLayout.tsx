import { Fragment, ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout(props: Props) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
}
