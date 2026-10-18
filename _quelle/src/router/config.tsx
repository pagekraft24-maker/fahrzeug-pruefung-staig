import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import TerminVereinbaren from "../pages/termin-vereinbaren/page";
import UeberUns from "../pages/ueber-uns/page";
import Preise from "../pages/preise/page";
import Oeffnungszeiten from "../pages/oeffnungszeiten/page";
import Kontakt from "../pages/kontakt/page";
import Impressum from "../pages/impressum/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/termin-vereinbaren",
    element: <TerminVereinbaren />,
  },
  {
    path: "/ueber-uns",
    element: <UeberUns />,
  },
  {
    path: "/preise",
    element: <Preise />,
  },
  {
    path: "/oeffnungszeiten",
    element: <Oeffnungszeiten />,
  },
  {
    path: "/kontakt",
    element: <Kontakt />,
  },
  {
    path: "/impressum",
    element: <Impressum />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;