import {  useState } from "react";
import type { ChangeEvent } from "react";
interface UploadSectionProps {
  onUploadSuccess: () => void;
}

const UploadSection = ({ onUploadSuccess }: UploadSectionProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFileName(file.name);

    try {
      setLoading(true);

      // 👉 Uncomment when backend is ready
      // await TripService.uploadTrip(file);

      onUploadSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg mb-6">

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-1">
        Upload Trip Data
      </h3>
      <p className="text-sm text-slate-300 mb-4">
        Upload a CSV file containing GPS coordinates and vehicle data
      </p>

      {/* Upload Box */}
      <label
        htmlFor="csv-upload"
        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-500 rounded-xl p-6 cursor-pointer hover:border-cyan-400 transition"
      >
        <svg
          className="w-10 h-10 text-cyan-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0l-3 3m3-3l3 3m5 4a4 4 0 00-4-4H5a4 4 0 000 8h14a4 4 0 004-4z"
          />
        </svg>

        <p className="text-slate-200 text-sm">
          Click to upload or drag & drop
        </p>
        <p className="text-xs text-slate-400 mt-1">
          CSV files only
        </p>

        {fileName && (
          <p className="mt-2 text-sm text-cyan-400">
            Selected: {fileName}
          </p>
        )}

        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Status */}
      {loading && (
        <p className="text-sm text-cyan-300 mt-4">
          Uploading trip data...
        </p>
      )}
    </div>
  );
};

export default UploadSection;
