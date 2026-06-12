// ──────────────────────────────────────────────────────────────
//  Single source of truth for every editable text on the site.
//  The admin panel edits a copy of this tree (stored in the
//  browser) and the components read from it. Non-text fields
//  (logos, links, asset imports) live here too but are not edited.
// ──────────────────────────────────────────────────────────────
import heroImg from "../assets/proifilio-nuotrauka.jpg";

import darzoviuseklosLogo from "../assets/companys-logo/darzoviuseklos.svg";
import vitarestaLogo from "../assets/companys-logo/vitaresta.svg";
import industrisLogo from "../assets/companys-logo/industris.svg";
import santaprintLogo from "../assets/companys-logo/santaprint.svg";
import extradentLogo from "../assets/companys-logo/extradent.svg";
import feliksnavisLogo from "../assets/companys-logo/feliksnavis.svg";
import geosomaLogo from "../assets/companys-logo/geosoma.svg";
import didmenaLogo from "../assets/companys-logo/didmena.svg";
import doridusLogo from "../assets/companys-logo/doridus.svg";
import resmilaLogo from "../assets/companys-logo/resmila.webp";
import snaucerisLogo from "../assets/companys-logo/snauceris.webp";
import alfetaLogo from "../assets/companys-logo/alfeta.png";

export { heroImg };

export const defaultContent = {
  hero: {
    greeting: "Sveiki, aš esu",
    name: "Giedrius Ališauskas",
    role: "Frontend React+Node.js / Wordpress Developer",
    bio: "Esu darbštus, nuoseklus, atsakingas siekiantis geriausio rezultato. Linkęs mokytis naujų dalykų, besidomintis naujausiomis technologijomis, taip nuolatos atnaujinat savo žinias ir kompetencijas.",
    ctaPrimary: "Susisiekite",
    ctaSecondary: "Atlikti darbai",
  },

  projects: {
    careerLabel: "Karjera",
    careerTitle: "Darbo patirtis",
    careerSub: "Mano profesinis kelias — nuo pirmų žingsnių iki šiandien.",
    projectsLabel: "Projektai",
    projectsTitle: "Darbai ir projektai",
    projectsSub: "Atlikti darbai ir projektai, kurie šiuo metu kuriami.",
    statusDone: "✓ Atlikta",
    statusProgress: "⟳ Kuriama",
    experience: [
      {
        period: "2024 – dabar",
        title: "Programuotojas - WordPress Developer",
        company: "JAUNA REKLAMA, D. LESAUSKO ĮMONĖ",
        desc: [
          "Svetainių administravimas Wordpress platformoje",
          "Wordpress svetainių kūrimas su parinktu maketu;",
          "Darbas su Wordpress Front-End ir Back-End;",
          "Darbas su ACF laukais;",
          "Darbas su Elementor Builder",
        ],
      },
      {
        period: "2023 – 2024",
        title: "WordPress svetainių kūrėjas, SEO darbai",
        company: "Ankstesnė įmonė",
        desc: [
          "Raktažodžių analizė;",
          "Svetainių kūrimas (Elemental builder) ir administravimas;",
          "Svetainių analizė;",
          "SEO tekstų rašymas;",
          "Google Search Console administravimas.",
          "Sveitainių kūrimas su Oxygen builder ir Elementor Builder",
        ],
      },
      {
        period: "2022-11 – 2023-06",
        title: "Front-end(React,Node.js) Developer (Kursai)",
        company: "",
        desc: [
          "CSS pagrindai: Kas yra CSS, stilių panaudojimas",
          "Node.js ir npm pagrindai",
          "Front-end ir Back-end (Express.js) sujungimas",
          "Rest API pagrindai",
          "Karkasai: „Create React App”, (Next.js, Gatsby.js, Remix – pagrindai)",
        ],
      },
    ],
    items: [
      {
        title: "CV puslapis",
        desc: "Asmeninis CV puslapis sukurtas su React + Vite. Šis puslapis!",
        tags: ["React", "Vite", "CSS"],
        link: "#",
        status: "progress",
      },
      {
        title: "E-komercijos platforma",
        desc: "WooCommerce parduotuvė su individualiu dizainu ir mokėjimo integracija.",
        tags: ["WordPress", "WooCommerce", "PHP"],
        link: "#komercijos",
        status: "done",
      },
      {
        title: "Verslo svetainė",
        desc: "Greita, SEO optimizuota verslo svetainė su kontaktų forma ir animacijomis.",
        tags: ["React", "Node.js", "EmailJS"],
        link: "#verslo",
        status: "done",
      },
    ],
  },

  company: {
    label: "Portfelis",
    title: "Sukurtos svetainės",
    sub: "Realūs projektai, sukurti verslo klientams.",
    createdLabel: "Sukurta:",
    ecommerceTitle: "E-komercijos platforma",
    businessTitle: "Verslo svetainė",
    ecommerce: [
      {
        logo: darzoviuseklosLogo,
        name: "Daržovių Sėklos",
        url: "https://darzoviuseklos.lt",
        about: "Specializuota daržovių sėklų el. parduotuvė. Integruota e-komercijos platforma leidžia užsisakyti prekes tiesiogiai internetu.",
        created: "Produktų kategorijų atvaizdavimas pradiniame puslapyje, AJAX produktų užkrovimas pagal nuolaidas ir naujienas, individualus AJAX filtras parduotuvės puslapyje, custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema bei pilnas el. parduotuvės katalogas su mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "PHP", "ACF", "Custom theme"],
      },
      {
        logo: snaucerisLogo,
        name: "Snaucerisvet",
        url: "https://snaucerisvet.com",
        about: "Gyvūnų sveikatos priežiūros klinika su el. parduotuve. Gyvynų priežiūra, bei konsultacijas.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "PHP", "ACF", "Custom theme"],
      },
      {
        logo: industrisLogo,
        name: "Industris",
        url: "https://www.industris.lt/",
        about: "Pramonės brėžinių rengimo ir techninių konsultacijų įmonė.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: santaprintLogo,
        name: "Santaprint",
        url: "https://santaprint.lt/",
        about: "UAB „Santa Print“ – inovatyvi spaustuvė, spaudos ir reklamos gamybos paslaugas.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: geosomaLogo,
        name: "Geosoma",
        url: "https://www.geosoma.lt/",
        about: "Geodezijos įmonė, teikianti geodezinių, topografinių matavimų, sklypų formavimo–pertvarkymo ir kaimo plėtros projektų paslaugas.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: didmenaLogo,
        name: "Didmena",
        url: "https://www.didmena.lt/",
        about: "DIDMENA – pilno ciklo spaustuvė, teikianti spaudos ir reklamos gamybos paslaugas.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: doridusLogo,
        name: "Doridus",
        url: "https://doridus.lt/",
        about: "Įmonė gamina ir montuoja virtuvės, svetainės, biurų bei viešbučių baldus pagal individualius klientų užsakymus.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: extradentLogo,
        name: "Extradent",
        url: "https://www.extradent.lt/",
        about: "„Extradent“ odontologijos klinika, teikianti burnos sveikatos ir gydymo paslaugas.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
      {
        logo: resmilaLogo,
        name: "Resmila",
        url: "https://resmila.lt/",
        about: "„Resmila“ – profesionalios metalinių paviršių dažymo ir dangų dengimo paslaugos.",
        created: "Custom krepšelio ir atsiskaitymo puslapiai, prisijungimo sistema, el. parduotuvė su produktų katalogu ir mokėjimų integracija.",
        tags: ["WordPress", "WooCommerce", "ACF", "Custom theme"],
      },
    ],
    business: [
      {
        logo: feliksnavisLogo,
        name: "Feliksnavis",
        url: "https://feliksnavis.lt/",
        about: "UAB „Feliksnavis“ – buitinių nuotekų valymo įrenginių gamyba ir prekyba.",
        created: "Individualios animacijos ir custom šablonai, pritaikyti įmonės prekės ženklui.",
        tags: ["WordPress", "Custom theme", "PHP", "ACF"],
      },
      {
        logo: vitarestaLogo,
        name: "Vitaresta",
        url: "https://vitaresta.lt/",
        about: "„Vitaresta“ – profesionalios komercinių patalpų, biurų bei viešbučių valymo paslaugos.",
        created: "Individualios animacijos ir custom šablonai, pritaikyti įmonės prekės ženklui.",
        tags: ["WordPress", "Custom theme", "PHP", "ACF"],
      },
      {
        logo: alfetaLogo,
        name: "Alfeta",
        url: "https://www.keltuvai.lt/",
        about: "„Alfeta“ – keltuvų gamintojo Haulotte Group, „Niftylift“ bei aliuminių bokštelių ir kopėčių gamintojo „Altrex“ produkcijos nuoma ir pardavimas.",
        created: "Individualūs šablonai, parduotuvės puslapis su produktų katalogu ir kontaktų forma.",
        tags: ["WordPress", "Custom theme", "PHP", "ACF"],
      },
    ],
  },

  contact: {
    label: "Kontaktai",
    title: "Susisiekite",
    sub: "Turite klausimų ar pasiūlymų? Parašykite — atsakysiu kuo greičiau.",
    nameLabel: "Vardas",
    namePlaceholder: "Jūsų vardas",
    emailLabel: "El. paštas",
    emailPlaceholder: "jusu@epastas.lt",
    subjectLabel: "Tema",
    subjectPlaceholder: "Tema",
    messageLabel: "Žinutė",
    messagePlaceholder: "Jūsų žinutė...",
    submitLabel: "Siųsti žinutę",
    sendingLabel: "Siunčiama…",
    successMsg: "✓ Žinutė išsiųsta! Susisieksiu netrukus.",
    errorMsg: "Klaida siunčiant. Bandykite dar kartą arba rašykite el. paštu.",
  },
};
