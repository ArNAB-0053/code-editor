import { EditorFontsMap, WebsiteFontsMap } from "@/@types/font";
import {
  Cascadia_Code,
  Fira_Code,
  Inconsolata,
  Inter,
  JetBrains_Mono,
  Lato,
  Lexend,
  Montserrat,
  Mulish,
  Nunito,
  Open_Sans,
  Outfit,
  Poppins,
  Prompt,
  Roboto,
  Roboto_Mono,
  Rubik,
  Source_Code_Pro,
  Space_Grotesk,
  Urbanist,
  Work_Sans,
  Yanone_Kaffeesatz,
} from "next/font/google";

// Editor fonts -> used inside editor like fontFamily: editorFonts[editorfont]
export const openSans = Open_Sans({ subsets: ["latin"] });
export const cascadiaCode = Cascadia_Code({ subsets: ["latin"] });
export const firaCode = Fira_Code({ subsets: ["latin"] });
export const inconsolata = Inconsolata({ subsets: ["latin"] });
export const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });
export const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
export const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const editorFonts: EditorFontsMap = {
  cascadia: "Cascadia Code",
  firacode: "Fira Code",
  jetbrains: "JetBrains Mono",
  sourcecode: "Source Code Pro",
  robotomono: "Roboto Mono",
  ubuntumono: "Ubuntu Mono",
  inconsolata: "Inconsolata",
};

// Webiste fonts -> used like websiteFonts[websiteFont].className
export const prompt = Prompt({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const open_sans = Open_Sans({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const work_sans = Work_Sans({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const roboto = Roboto({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const poppins = Poppins({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const montserrat = Montserrat({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const rubik = Rubik({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const inter = Inter({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const lato = Lato({ subsets: ["latin"],  weight: ["400"] });
export const nunito = Nunito({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const mulish = Mulish({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const outfit = Outfit({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const lexend = Lexend({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const urbanist = Urbanist({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const websiteFonts: WebsiteFontsMap = {
  prompt,
  open_sans,
  work_sans,
  roboto,
  poppins,
  montserrat,
  rubik,
  inter,
  lato,
  nunito,
  mulish,
  outfit,
  lexend,
  urbanist,
};
