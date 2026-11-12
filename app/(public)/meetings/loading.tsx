export default function MeetingsLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="space-y-2">
              <div className="h-3.5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3.5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

