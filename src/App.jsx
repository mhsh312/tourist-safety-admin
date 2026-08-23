import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import SideNavBar from "./components/SideNavBar";
import LocationTracker from "./components/LocationTracker";
import AlertCard from "./components/AlertCard";
import { useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function App() {
  // 1. Add state to hold incoming live alerts
  const [alerts, setAlerts] = useState([]);

  // 2. Real-time Firestore Listener
  useEffect(() => {
    const alertsQuery = query(
      collection(db, "alerts"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      alertsQuery,
      (snapshot) => {
        const liveAlerts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(liveAlerts);
      },
      (error) => {
        console.error("Firestore listener error:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  // 3. Status Handler
  const handleResolveAlert = async (alertId) => {
    try {
      const alertRef = doc(db, "alerts", alertId);
      await updateDoc(alertRef, {
        status: "resolved",
        resolvedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating alert status:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface text-on-surface">
      <TopAppBar />

      <div className="flex flex-1 pt-16">
        <SideNavBar />

        <main className="ml-64 flex-1 overflow-y-auto p-8">
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
            <section className="col-span-12 flex flex-col gap-4 md:col-span-8">
              <h1 className="mb-2 text-3xl font-extrabold text-on-surface">
                Current SOS Alerts
              </h1>
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] p-4 space-y-4">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </section>

            <aside className="col-span-12 md:col-span-4">
              <LocationTracker
                locationName="Downtown Commercial District"
                sector="Sector 7G"
                mapImageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDhwirRwrFWXy0WqthpVZxfl_8O9k7JylnnYeU-Ta-az-FcjFK_a5zb19RWlE9cXyPqX69pYuFfs7Duj7PUTva3zFDjnkFIjciHGHBrVqL346GdjSyx_Ym_J0kClGs4OwQL0spJLeTAE6mggdTpSq80v4hLEOAcKllZ5qjbnzAMi_0-62tQ2UiuH1Sez2ZxUg5A9S3mwgBxbBAXxO_30PIX4TADTSiUrv8_uJXZ9hwsyb-9z6vjQt1geg"
              />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
