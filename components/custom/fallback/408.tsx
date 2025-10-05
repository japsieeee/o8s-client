export default function Page408() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fafbfc',
        color: '#222',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0 }}>408</h1>
      <p style={{ fontSize: '1.25rem', margin: '1rem 0 0 0' }}>Connection Timeout</p>
      <p style={{ color: '#666', marginTop: '0.5rem' }}>The server took too long to respond.</p>
    </div>
  );
}
