import { ImageResponse } from 'next/og';

export const alt = 'Rexburg 1st Ward Sacrament Meeting Planner';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '40px 60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            marginBottom: '28px',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: '#f8fafc',
          }}
        >
          Sacrament Meeting Planner
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: 500,
            color: '#94a3b8',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Rexburg 1st Ward • The Church of Jesus Christ of Latter-day Saints
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '36px',
            padding: '10px 24px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Sunday Agendas • Hymns • Speakers • Leadership Portal
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
