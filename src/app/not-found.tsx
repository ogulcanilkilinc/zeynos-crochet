import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="tr">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
            color: '#1f2937',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '3rem 4rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🧶</div>

            <h1
              style={{
                fontSize: '6rem',
                fontWeight: '700',
                color: '#db2777',
                lineHeight: '1',
                marginBottom: '0.5rem',
              }}
            >
              404
            </h1>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#374151',
              }}
            >
              Sayfa Bulunamadı
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                marginBottom: '0.25rem',
              }}
            >
              Page Not Found
            </p>

            <p
              style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
                marginBottom: '2rem',
                lineHeight: '1.6',
              }}
            >
              Bu iplik yumağı bir yerlerde dolaştı...
              <br />
              This yarn ball wandered off somewhere...
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/tr"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#db2777',
                  color: 'white',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'background-color 0.2s',
                }}
              >
                🏠 Ana Sayfa
              </Link>

              <Link
                href="/en"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#db2777',
                  border: '2px solid #db2777',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'background-color 0.2s',
                }}
              >
                🏠 Home Page
              </Link>
            </div>
          </div>

          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.85rem',
              color: '#9ca3af',
            }}
          >
            Zeyno&apos;s Crochet © {new Date().getFullYear()}
          </p>
        </div>
      </body>
    </html>
  );
}
