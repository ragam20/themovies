import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The Movies | TV Shows",
  description: "The list of tv shows",
};

type TVLayoutProps = {
  children: React.ReactNode;
};
export default function TVLayout({ children }: TVLayoutProps) {
  return <div>{children}</div>;
}
