// ToggleView.js

interface ToggleViewProps {
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
  views: { [key: string]: React.ReactNode };
}

export const ToggleView: React.FC<ToggleViewProps> = ({
  activeView,
  setActiveView,
  views,
}) => {
  return (
    <div className="flex justify-center mb-6 mt-24  bg-gray-900 text-white">
      {Object.keys(views).map((viewKey) => (
        <button
          key={viewKey}
          onClick={() => setActiveView(viewKey)}
          className={`px-6 py-2 mx-3 text-sm font-bold rounded-lg transition duration-300 
        ${
          activeView === viewKey
            ? "bg-purple-600 text-white  hover:bg-purple-700 focus:ring-2 focus:ring-purple-300"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-gray-300"
        }`}
        >
          {viewKey}
        </button>
      ))}
    </div>
  );
};
