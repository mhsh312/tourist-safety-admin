import { MdHomeWork, MdHistory } from "react-icons/md";

export default function SideNavBar() {
  return (
    <nav className="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-outline-variant bg-surface p-4">
      <div className="mb-6 px-4">
        <h2 className="text-xl font-bold text-on-surface">Command Center</h2>
        <p className="text-sm text-on-surface-variant">System Status: Active</p>
      </div>

      <a
        href="#active"
        className="flex items-center gap-4 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary-container active:opacity-80"
      >
        <MdHomeWork className="text-xl" />
        Active Alerts
      </a>

      <a
        href="#history"
        className="flex items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:bg-surface-container-highest"
      >
        <MdHistory className="text-xl" />
        History
      </a>
    </nav>
  );
}
