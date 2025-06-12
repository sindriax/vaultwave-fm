import RadioInterface from "@/components/RadioInterface";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col retro-container scanline-effect old-crt-monitor">
      <main id="radio">
        <RadioInterface />
      </main>
    </div>
  );
}
