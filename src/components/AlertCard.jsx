import { useState, useEffect } from "react";
import {
  MdPhone,
  MdLocationOn,
  MdCheckCircle,
  MdLocalShipping,
} from "react-icons/md";

// 1. Live Timer Hook bound exclusively to createdAt
function useElapsedTime(createdAt) {
  const [elapsedText, setElapsedText] = useState("00:00 elapsed");

  useEffect(() => {
    if (!createdAt) return;

    // Convert Firestore Timestamp object or Date string to milliseconds
    const startTime = createdAt.toDate
      ? createdAt.toDate().getTime()
      : new Date(createdAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diffInSeconds = Math.max(0, Math.floor((now - startTime) / 1000));

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      const pad = (num) => String(num).padStart(2, "0");

      if (hours > 0) {
        setElapsedText(`${pad(hours)}:${pad(minutes)}:${pad(seconds)} elapsed`);
      } else {
        setElapsedText(`${pad(minutes)}:${pad(seconds)} elapsed`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return elapsedText;
}

// 2. AlertCard Component using standardized createdAt
export default function AlertCard({ alert, onAcknowledge, onDispatch }) {
  const {
    id,
    name = "Emergency Signal",
    phone = "Unknown Number",
    createdAt,
    gps,
    latitude,
    longitude,
    accuracy = 10,
  } = alert;

  // Single source of truth for live timer
  const liveElapsedTime = useElapsedTime(createdAt);

  // Single source of truth for display date & time
  const formattedDateTime = createdAt
    ? (createdAt.toDate
        ? createdAt.toDate()
        : new Date(createdAt)
      ).toLocaleString()
    : "Just now";

  const displayGps =
    gps || (latitude && longitude ? `${latitude}, ${longitude}` : "N/A");

  return (
    <div className="relative overflow-hidden rounded-lg border border-outline-variant border-l-[8px] border-l-primary bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="mb-2 inline-block rounded-sm bg-primary px-2 py-1 text-xs font-bold tracking-wider text-on-primary">
            URGENT
          </span>
          <h3 className="text-xl font-bold text-on-surface">{name}</h3>
          <p className="mt-1 flex items-center gap-2 text-on-surface-variant">
            <MdPhone className="text-base" />
            {phone}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-error">{liveElapsedTime}</p>
          <p className="mt-1 text-xs text-on-surface-variant">
            {formattedDateTime}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-md bg-surface-container p-4">
        <p className="flex items-center gap-2 text-on-surface">
          <MdLocationOn className="text-xl text-primary" />
          <span className="font-bold">GPS:</span>{" "}
          {latitude && longitude ? (
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              {displayGps}
            </a>
          ) : (
            displayGps
          )}
        </p>
        <p className="ml-8 mt-1 text-sm text-on-surface-variant">
          Accuracy: ±{accuracy} meters
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onAcknowledge(id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-inverse-surface py-3 font-bold text-on-secondary transition-colors hover:opacity-90 active:scale-95"
        >
          <MdCheckCircle className="text-xl" />
          Acknowledge
        </button>
        <button
          onClick={() => onDispatch(id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-on-primary shadow-lg transition-colors hover:bg-surface-tint active:scale-95"
        >
          <MdLocalShipping className="text-xl" />
          Dispatch Help
        </button>
      </div>
    </div>
  );
}
