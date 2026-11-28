'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

function getServerSnapshot() {
  return 'Sunday Service';
}

export default function HeaderDate() {
  const currentDate = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
      The Church of Jesus Christ of Latter-day Saints • {currentDate}
    </p>
  );
}
