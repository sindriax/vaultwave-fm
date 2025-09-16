import { radioStations } from '@/data/stations';

export default function DataPreview() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Radio Stations</h2>
        <p className="text-gray-600 mb-4">
          You have {radioStations.length} radio stations preserved
        </p>
        <div className="grid gap-3">
          {radioStations.slice(0, 3).map((station) => (
            <div key={station.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800">{station.name}</h3>
              <p className="text-sm text-gray-600">
                {station.frequency} FM • {station.genre}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}