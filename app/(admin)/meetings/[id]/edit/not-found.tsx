import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center font-bold text-xl">
        !
      </div>
      <h1 className="text-2xl font-bold text-slate-100">Meeting Not Found</h1>
      <p className="text-sm text-slate-400">
        The sacrament meeting agenda you are attempting to edit does not exist or may have been deleted.
      </p>
      <div className="pt-2">
        <Link
          href="/meetings"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          ← Back to Meetings List
        </Link>
      </div>
    </div>
  );
}
