
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisStatusProps {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  message?: string;
}

const AnalysisStatus: React.FC<AnalysisStatusProps> = ({ status, message }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-compliance-red" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing with backend...';
      case 'completed':
        return 'Analysis completed';
      case 'error':
        return 'Analysis failed';
      default:
        return 'Ready to analyze';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'border-yellow-200 bg-yellow-50';
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-compliance-dark-grey bg-compliance-light-grey';
    }
  };

  if (status === 'idle') return null;

  return (
    <Card className={`p-4 border ${getStatusColor()} animate-fade-in`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <p className="font-medium text-compliance-black">{getStatusText()}</p>
          {message && (
            <p className="text-sm text-compliance-dark-grey mt-1">{message}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AnalysisStatus;
