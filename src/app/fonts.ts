import { Rubik } from "next/font/google";

/** One variable family for Hebrew and Latin (weights 300–900). */
export const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

export const fontVariables = rubik.variable;
