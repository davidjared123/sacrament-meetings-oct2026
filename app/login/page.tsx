import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Bishopric Sign In — Sacrament Meeting Planner',
  description: 'Leader login portal for managing Rexburg 1st Ward sacrament meeting schedules.',
};

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center py-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Leader Portal Sign In
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in with your ward leadership credentials to create, modify, or publish sacrament meeting agendas.
          </p>
        </div>

        <LoginForm />

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
          <p className="font-medium text-slate-700 dark:text-slate-300">Default Ward Demo Access:</p>
          <p className="mt-0.5">Email: <code className="text-blue-600 dark:text-blue-400">bishopric@rexburg1st.org</code></p>
          <p>Password: <code className="text-blue-600 dark:text-blue-400">bishopric2026</code></p>
        </div>
      </div>
    </div>
  );
}
