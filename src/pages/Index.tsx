
import React from 'react';
import { Shield, BarChart3 } from 'lucide-react';
import LogicAnalyser from '@/components/LogicAnalyser';
import CriteriaAnalyser from '@/components/CriteriaAnalyser';

const Index = () => {
  return (
    <div className="min-h-screen bg-compliance-light-grey">
      {/* Header */}
      <header className="bg-compliance-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-compliance-red" />
            <div>
              <h1 className="text-3xl font-bold">Financial Compliance & Regulation</h1>
              <p className="text-gray-300 mt-1">Advanced Document Analysis Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Logic Analyser Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-compliance-red" />
              <h2 className="text-xl font-semibold text-compliance-black">Logic Analysis</h2>
            </div>
            <LogicAnalyser />
          </div>

          {/* Criteria Analyser Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-compliance-red" />
              <h2 className="text-xl font-semibold text-compliance-black">Criteria Analysis</h2>
            </div>
            <CriteriaAnalyser />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-compliance-black text-white py-4 mt-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2024 Financial Compliance Platform. Professional document analysis solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
