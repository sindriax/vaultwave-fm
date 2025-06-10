import RadioInterface from "@/components/RadioInterface";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col retro-container scanline-effect old-crt-monitor">
      <main id="radio" className="overflow-hidden">
        <RadioInterface />
      </main>

      <footer className="flex justify-between items-center p-1 text-sm font-fallout border-t border-primary/20">
        <p className="glow-text">© 2287 VAULT-TEC CORPORATION</p>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-vault-green rounded-full animate-pulse"></div>
          <p className="phosphor-trail">MODEL VT-2077 • OPERATIONAL</p>
        </div>
      </footer>
    </div>
  );
}
