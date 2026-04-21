export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
      {label}
    </div>
  );
}

export function FullPageLoadingState({ label = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center pt-20">
      <div className="text-lg font-medium text-slate-600">{label}</div>
    </div>
  );
}

export function RefreshingOverlay({ label = "Refreshing..." }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-white/45 backdrop-blur-[1px]">
      <div className="flex justify-end p-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
          {label}
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
