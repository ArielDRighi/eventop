// ToggleView.js

interface ToggleViewProps {
    activeView: string;
    setActiveView: React.Dispatch<React.SetStateAction<string>>;
    views: { [key: string]: React.ReactNode };
  }
  
  export const ToggleView: React.FC<ToggleViewProps> = ({ activeView, setActiveView, views }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {Object.keys(views).map((viewKey) => (
          <button
            key={viewKey}
            onClick={() => setActiveView(viewKey)}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: activeView === viewKey ? '#0070f3' : '#e0e0e0',
              color: activeView === viewKey ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {viewKey}
          </button>
        ))}
      </div>
    );
  };
