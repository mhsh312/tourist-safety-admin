import { MdNotifications, MdSettings } from "react-icons/md";

export default function TopAppBar() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface-container px-8">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-black tracking-tighter text-primary">
          SAFEGUARD
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full p-2 transition-colors hover:bg-surface-dim active:scale-95">
          <MdNotifications className="text-xl text-primary" />
        </button>
        <button className="rounded-full p-2 transition-colors hover:bg-surface-dim active:scale-95">
          <MdSettings className="text-xl text-primary" />
        </button>
      </div>
    </header>
  );
}
