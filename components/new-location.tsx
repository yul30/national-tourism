"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewLocationProps {
  tripId: string;
}

export default function NewLocation({ tripId }: NewLocationProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      console.log("📤 Отправка запроса на:", `/api/trips/${tripId}/locations`);

      const response = await fetch(`/api/trips/${tripId}/locations`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("📥 Ответ:", data);

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при добавлении");
      }

      // Показываем полноэкранное уведомление об успехе
      setShowSuccess(true);

      // Обновляем страницу через 2 секунды
      setTimeout(() => {
        router.refresh();
        setShowSuccess(false);
      }, 2000);

      // Очищаем форму
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("❌ Ошибка:", err);
      setErrorMessage(err instanceof Error ? err.message : "Ошибка при добавлении места");
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Полноэкранное уведомление об успехе */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block' }}>
                <svg style={{ width: '120px', height: '120px', color: '#1f2937' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" style={{ opacity: 0.2 }} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#1f2937',
              textTransform: 'uppercase'
            }}>
              УСПЕШНО
            </h2>

            <p style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '2rem'
            }}>
              МЕСТО ДОБАВЛЕНО
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#9ca3af',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#9ca3af',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite 0.15s'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#9ca3af',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out infinite 0.3s'
              }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Полноэкранное уведомление об ошибке */}
      {showError && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block' }}>
                <svg style={{ width: '120px', height: '120px', color: '#1f2937' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" style={{ opacity: 0.2 }} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#1f2937',
              textTransform: 'uppercase'
            }}>
              ОШИБКА
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              marginBottom: '2rem'
            }}>
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Форма */}
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '0',
        border: '2px solid #e5e7eb'
      }}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.5rem',
          fontWeight: 800,
          marginBottom: '2rem',
          color: '#1f2937',
          textTransform: 'uppercase'
        }}>
          ДОБАВИТЬ МЕСТО
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Название места *
            </label>
            <input
              type="text"
              name="locationTitle"
              required
              placeholder="например: Эйфелева башня"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1f2937';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Адрес или название места *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="например: Париж, Франция"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1f2937';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
              }}
            />
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              Введите адрес или название места (можно на русском)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              background: loading ? '#9ca3af' : '#1f2937',
              border: '2px solid ' + (loading ? '#9ca3af' : '#1f2937'),
              borderRadius: '0',
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#1f2937';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg style={{
                  animation: 'spin 1s linear infinite',
                  height: '20px',
                  width: '20px'
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Добавление...
              </span>
            ) : (
              "ДОБАВИТЬ МЕСТО"
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}