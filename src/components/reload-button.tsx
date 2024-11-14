"use client";

export function ReloadButton() {
  return (
    <div className="absolute top-8 right-8">
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-slate-100/10 text-white p-4"
      >
        Reload
      </button>
    </div>
  );
}
