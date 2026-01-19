import {
  MapPin,
  Clock,
  PauseCircle,
  AlertTriangle,
  TrendingUp,
  StopCircle,
} from "lucide-react";
import type { Trip } from "../../types/tripTypes";

interface Props {
  trip: Trip;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (mins === 0) return `${secs} sec`;
  return `${mins} min ${secs} sec`;
};

const TripStats = ({ trip }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <StatCard
        title="Total Distance"
        value={`${(trip.totalDistance / 1000).toFixed(2)} km`}
        icon={<MapPin size={22} />}
        gradient="from-blue-500 to-indigo-500"
      />

      <StatCard
        title="Trip Duration"
        value={formatDuration(trip.tripDuration)}
        icon={<Clock size={22} />}
        gradient="from-cyan-500 to-sky-500"
      />

      <StatCard
        title="Idle Time"
        value={formatDuration(trip.idleTime)}
        icon={<PauseCircle size={22} />}
        gradient="from-pink-500 to-rose-500"
      />

      <StatCard
        title="Over Speeding Duration"
        value={formatDuration(trip.overSpeedTime)}
        icon={<AlertTriangle size={22} />}
        gradient="from-emerald-500 to-green-500"
      />

      <StatCard
        title="Over Speeding Distance"
        value={`${(trip.overSpeedDistance / 1000).toFixed(1)} km`}
        icon={<TrendingUp size={22} />}
        gradient="from-lime-500 to-green-400"
      />

      <StatCard
        title="Stopped Duration"
        value={formatDuration(trip.stoppageTime)}
        icon={<StopCircle size={22} />}
        gradient="from-slate-500 to-gray-600"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}

const StatCard = ({ title, value, icon, gradient }: StatCardProps) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5 hover:scale-[1.02] transition-transform duration-200">
    {/* Icon badge */}
    <div
      className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
    >
      {icon}
    </div>

    {/* Content */}
    <p className="text-sm text-slate-400 mb-2">{title}</p>
    <p className="text-2xl font-semibold text-white tracking-tight">
      {value}
    </p>
  </div>
);

export default TripStats;
