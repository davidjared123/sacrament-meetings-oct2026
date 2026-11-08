export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-8 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-2">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          Rexburg 1st Ward — Sacrament Meeting Planner
        </p>
        <p>
          Rexburg Idaho Stake • 100 S 2nd E, Rexburg, ID 83440 • Sacrament Meeting at 9:00 AM
        </p>
        <p className="text-[11px] text-slate-400">
          Built with Next.js App Router, TypeScript & Tailwind CSS • WDD 430
        </p>
      </div>
    </footer>
  );
}

