import { useState } from 'react';

// 1. IMPORT THE NEW TAB
import RoutesTab from './adapters/ui/components/RoutesTab';
import CompareTab from './adapters/ui/components/CompareTab';
import BankingTab from './adapters/ui/components/BankingTab';
import PoolingTab from './adapters/ui/components/PoolingTab';

type Tab = 'Routes' | 'Compare' | 'Banking' | 'Pooling';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Routes');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Routes':
        // 2. RENDER THE COMPONENT
        return <RoutesTab />;
      case 'Compare':
        return <CompareTab />;
      case 'Banking':
        return <BankingTab />;
      case 'Pooling':
        return <PoolingTab />;
      default:
        return null;
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-500 to-gray-900 text-gray-900 py-10 flex flex-col items-center">
    <div className="w-full max-w-6xl px-4">

      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-400">
        FuelEU Maritime Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {(['Routes', 'Compare', 'Banking', 'Pooling'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md
              border border-teal-300 backdrop-blur-sm
              ${activeTab === tab
                ? 'bg-teal-600 text-white scale-105 shadow-lg shadow-teal-300/50'
                : 'bg-white hover:bg-teal-100 hover:scale-105 hover:shadow-lg text-teal-700'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-teal-200">
        {renderTabContent()}
      </div>

    </div>
  </div>
);


}

export default App;