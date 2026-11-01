export const site = {
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nati-gurevich.com"
  ).replace(/\/$/, ""),
  name: "Nati Gurevich",
  company: "New Generation SW",
  email: "nati_g4@hotmail.com",
  phone: { display: "054-4785120", href: "tel:+972544785120" },
  mapsUrl:
    "https://www.google.com/maps/place/YASUR/data=!4m2!3m1!1s0x151dca54b64c7603:0x1acb071f63e0bc23",
  socials: {
    linkedin: "https://www.linkedin.com/in/nati-gurevich-36868711b",
    github: "https://github.com/natig4",
    facebook: "https://www.facebook.com/nati.gurevich.3",
    medium: "https://medium.com/@nati_g4",
  },
  /** First year in tech (myThings) — drives the "years of experience" stat. */
  careerStartYear: 2016,
  /** First year as a full-time developer (Outbrain). */
  devStartYear: 2022,
  themeColor: { light: "#FAFAFA", dark: "#09090B" },
} as const;

export function yearsSince(year: number) {
  return new Date().getFullYear() - year;
}
