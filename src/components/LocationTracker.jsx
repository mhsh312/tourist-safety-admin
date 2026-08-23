import { MdMyLocation } from "react-icons/md";

export default function LocationTracker({ locationName, sector, mapImageUrl }) {
  return (
    <div className="sticky top-6 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container p-4">
        <h3 className="font-bold text-on-surface">Location Tracker</h3>
        <MdMyLocation className="animate-pulse text-xl text-primary" />
      </div>

      <div className="relative h-[400px] w-full bg-surface-variant">
        <img
          src={mapImageUrl}
          alt="Overhead map of target location"
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-4 left-4 right-4 rounded border border-outline-variant bg-surface-container-lowest/90 p-3 shadow-lg backdrop-blur-sm">
          <p className="mb-1 text-xs font-bold text-on-surface-variant">
            MOST RECENT SIGNAL
          </p>
          <p className="font-bold text-on-surface">{locationName}</p>
          <p className="text-sm text-on-surface">{sector}</p>
        </div>
      </div>
    </div>
  );
}
