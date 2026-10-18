import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <p className="text-7xl md:text-9xl font-black text-background-200 select-none">404</p>
      <h1 className="text-xl md:text-2xl font-semibold text-foreground-950 mt-4">Seite nicht gefunden</h1>
      <p className="mt-3 text-base text-foreground-600 max-w-md">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-foreground-950 font-semibold text-sm rounded-lg hover:bg-primary-600 transition-colors"
      >
        <i className="ri-home-line w-4 h-4 flex items-center justify-center"></i>
        Zur Startseite
      </Link>
    </div>
  );
}
