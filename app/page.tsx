import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
          Rexburg 1st Ward
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto">
          Sacrament Meeting Planner &amp; Program
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Welcome to the Rexburg 1st Ward sacrament meeting hub. Access the weekly program, view hymns, prayers, and speakers, or print agendas for bishopric planning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/meetings/current"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Today&apos;s Program (This Sunday)
          </Link>
          <Link
            href="/meetings"
            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Browse Past &amp; Upcoming Agendas
          </Link>
        </div>
      </section>

      {/* Hero Image Section (next/image with alt, width, height) */}
      <section className="flex justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 max-w-xl w-full">
          <Image
            src="/chapel.svg"
            alt="Illustration of Rexburg 1st Ward Chapel building"
            width={600}
            height={360}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg mb-3">
            📅
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Sunday Agendas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Easily follow the conducting order, opening and closing prayers, hymns, and ward or stake business.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg mb-3">
            🎵
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Hymns &amp; Music
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Access hymn numbers and titles, along with special musical numbers prepared by ward members and choir.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-3">
            🖨️
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Print-Ready Format
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Clean, formatted print mode that hides web controls and produces a traditional physical bulletin.
          </p>
        </div>
      </section>
    </div>
  );
}
