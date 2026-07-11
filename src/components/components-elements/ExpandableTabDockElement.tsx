import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  CircleUserRound,
  FileClock,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

type TabId = "dashboard" | "notifications" | "settings" | "changelog" | "security";

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "changelog", label: "Changelog", icon: FileClock },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const notifications = [
  ["Design review approved", "2 min ago"],
  ["New workspace invitation", "8 min ago"],
  ["Deployment completed", "16 min ago"],
  ["Weekly report is ready", "22 min ago"],
  ["Two tasks need attention", "31 min ago"],
];

const tickets = ["Ticket 001", "Ticket 002", "Ticket 003", "Ticket 004", "Ticket 005"];

const spring = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.72 };
const softSpring = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.7 };

function DashboardPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-white/80">
        <CircleUserRound className="h-3.5 w-3.5 text-white/60" />
        <span className="text-xs font-medium">Good evening, Alex</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          ["Active projects", "08", Gauge],
          ["Open tasks", "24", ListChecks],
        ].map(([label, value, Icon]) => (
          <motion.div
            layout
            key={label as string}
            className="flex items-center gap-2 border border-white/8 bg-white/[0.035] px-3 py-2.5"
          >
            <Icon className="h-3.5 w-3.5 text-white/45" />
            <div>
              <p className="text-[9px] text-white/35">{label as string}</p>
              <p className="text-sm font-medium text-white/85">{value as string}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="flex flex-col gap-1">
      {notifications.map(([label, time], index) => (
        <motion.div
          layout
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...softSpring, delay: index * 0.035 }}
          className="group flex items-center gap-2.5 px-2 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/55 transition-colors group-hover:bg-cyan-300" />
          <span className="min-w-0 flex-1 truncate text-[10px] text-white/75">{label}</span>
          <span className="text-[9px] text-white/30">{time}</span>
        </motion.div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  const [volume, setVolume] = useState(68);
  const [toggles, setToggles] = useState([true, true, false]);
  const labels = ["Dark mode", "Notifications", "Auto save"];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] text-white/65">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-white/45" /> Volume
        </span>
        <span className="text-white/35">{volume}%</span>
      </div>
      <input
        aria-label="Volume"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
        className="h-1 w-full accent-cyan-300"
      />
      <div className="flex flex-col gap-2">
        {labels.map((label, index) => (
          <button
            key={label}
            onClick={() =>
              setToggles((current) =>
                current.map((value, itemIndex) => (itemIndex === index ? !value : value)),
              )
            }
            className="flex items-center justify-between text-[10px] text-white/65"
          >
            {label}
            <span
              className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${toggles[index] ? "justify-end bg-cyan-300" : "justify-start bg-white/10"}`}
            >
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChangelogPanel() {
  return (
    <div className="flex flex-col gap-1">
      {tickets.map((ticket, index) => (
        <motion.div
          layout
          key={ticket}
          className="flex items-center gap-2.5 py-1.5 text-[10px] text-white/70"
        >
          <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-white/35">
            <span className="h-1 w-1 rounded-full bg-white/60" />
          </span>
          <span className="flex-1">{ticket}</span>
          <span className="text-white/30">{index * 4 + 2} min ago</span>
          <Check className="h-3 w-3 text-orange-300/80" />
        </motion.div>
      ))}
    </div>
  );
}

function SecurityPanel() {
  const blue = [42, 52, 38, 66, 48, 75, 58, 82, 62, 72, 88, 70, 94, 78, 86, 68];
  const orange = [28, 36, 24, 42, 32, 48, 38, 52, 44, 58, 46, 62, 50, 56, 68, 60];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] text-white/65">
        <span>System health</span>
        <span className="text-cyan-200">Stable</span>
      </div>
      <div className="grid h-20 [grid-template-columns:repeat(16,minmax(0,1fr))] items-end gap-1">
        {blue.map((height, index) => (
          <span
            key={`blue-${index}`}
            className="rounded-t-sm bg-cyan-300/70"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="grid h-12 [grid-template-columns:repeat(16,minmax(0,1fr))] items-end gap-1">
        {orange.map((height, index) => (
          <span
            key={`orange-${index}`}
            className="rounded-t-sm bg-orange-300/60"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function TabPanel({ activeTab }: { activeTab: TabId }) {
  const panel = {
    dashboard: <DashboardPanel />,
    notifications: <NotificationsPanel />,
    settings: <SettingsPanel />,
    changelog: <ChangelogPanel />,
    security: <SecurityPanel />,
  }[activeTab];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activeTab}
        layout
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={softSpring}
        className="w-full"
      >
        {panel}
      </motion.div>
    </AnimatePresence>
  );
}

export default function ExpandableTabDockElement() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <motion.div
      layout
      data-preserve-shell="true"
      transition={spring}
      className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,.38)] backdrop-blur-xl"
    >
      <motion.div layout className="px-4 pb-3 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35">
            Workspace
          </span>
          <motion.span
            layout
            className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(165,243,252,.8)]"
          />
        </div>
        <motion.div layout transition={spring} className="min-h-[86px] overflow-hidden">
          <TabPanel activeTab={activeTab} />
        </motion.div>
      </motion.div>

      <motion.nav
        layout
        className="grid grid-cols-5 border-t border-white/8 bg-white/[0.02] px-2 py-2"
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="group relative flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[8px] text-white/35 transition-colors hover:text-white/75"
            >
              {active && (
                <motion.span
                  layoutId="expandable-tab-active"
                  transition={spring}
                  className="absolute inset-0 rounded-lg bg-white/[0.08]"
                />
              )}
              <Icon
                className={`relative z-10 h-3.5 w-3.5 transition-colors ${active ? "text-white" : "text-white/35 group-hover:text-white/75"}`}
              />
              <span className="relative z-10 truncate">{label}</span>
            </button>
          );
        })}
      </motion.nav>
    </motion.div>
  );
}
