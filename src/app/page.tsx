import RadioInterface from "@/components/RadioInterface";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col retro-container scanline-effect old-crt-monitor">
      <header className="flex gap-8 items-center p-4 enhanced-scanlines">
        <h1 className="text-2xl font-fallout holographic phosphor-trail">
          VAULTWAVE FM
        </h1>
        <nav role="navigation">
          <ul className="flex gap-6">
            <li>
              <a
                href="#radio"
                className="font-fallout text-lg hover:text-vault-orange transition-colors glow-text"
              >
                RADIO
              </a>
            </li>
            <li>
              <a
                href="#terminal"
                className="font-fallout text-lg hover:text-vault-orange transition-colors glow-text"
              >
                TERMINAL
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="radio" className="overflow-hidden">
        <RadioInterface />
      </main>

      <footer className="flex justify-between items-center p-4 text-sm font-fallout border-t border-primary/20">
        <p className="glow-text">© 2287 VAULT-TEC CORPORATION</p>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-vault-green rounded-full animate-pulse"></div>
          <p className="phosphor-trail">MODEL VT-2077 • OPERATIONAL</p>
        </div>
      </footer>
    </div>
  );
}
