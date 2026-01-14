import { EditorFontsMap, WebsiteFontsMap } from "@/@types/font";
import {
  Amarante,
  Asimovian,
  Cascadia_Code,
  Cookie,
  Fira_Code,
  Geo,
  Inconsolata,
  Inter,
  JetBrains_Mono,
  Karla,
  Lato,
  Lexend,
  Lora,
  Montserrat,
  Mulish,
  Nunito,
  Open_Sans,
  Oswald,
  Outfit,
  Play,
  Playwrite_CU,
  Playwrite_IN,
  Playwrite_US_Modern,
  Playwrite_US_Trad,
  Poppins,
  Prompt,
  Quicksand,
  Raleway,
  Roboto,
  Roboto_Mono,
  Rubik,
  Sora,
  Source_Code_Pro,
  Space_Grotesk,
  Urbanist,
  Work_Sans,
  Yanone_Kaffeesatz,
} from "next/font/google";

// Editor fonts -> used inside editor like fontFamily: editorFonts[editorfont]
export const openSans = Open_Sans({ subsets: ["latin"], });
export const cascadia = Cascadia_Code({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export const firaCode = Fira_Code({ subsets: ["latin"] });
export const inconsolata = Inconsolata({ subsets: ["latin"] });
export const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
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
export const raleway = Raleway({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const quicksand = Quicksand({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const karla = Karla({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const play = Play({ subsets: ["latin"], weight: ["400", "700"] });
export const amarante = Amarante({weight: ["400"] });
export const geo = Geo({weight: ["400"] });
export const asimovian = Asimovian({weight: ["400"] });
export const sora = Sora({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });

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
  raleway,
  quicksand,
  play,
  karla,
  // amarante,
  // geo,
  // asimovian,
  sora,
};

// Font for styling only
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"],  weight: ["400", "500", "600", "700"] });
export const yanone = Yanone_Kaffeesatz({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export const play_cu = Playwrite_CU({ weight: ["400"] });
export const play_us_modern = Playwrite_US_Modern({ weight: ["400"] });
export const cookie = Cookie({weight: ["400"] });
export const lora = Lora({weight: ["400", "500", "600"], subsets: ["latin"], style: "italic" });
