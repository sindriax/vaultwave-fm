import DataPreview from '@/components/DataPreview';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VaultWave FM
          </h1>
        </div>
        
        <DataPreview />
      
      </main>
    </div>
  );
}
