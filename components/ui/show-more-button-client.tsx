"use client";

export default function ShowMoreButtonClient() {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <button style={{
        padding: '1rem 2.5rem',
        background: 'transparent',
        border: '2px solid #f3f4f6',
        borderRadius: '3rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#6b7280',
        cursor: 'pointer',
        transition: 'all 0.3s',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#f3f4f6';
        e.currentTarget.style.color = '#1f2937';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#6b7280';
      }}>
        ПОКАЗАТЬ БОЛЬШЕ
      </button>
    </div>
  );
}