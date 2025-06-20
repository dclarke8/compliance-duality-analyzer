
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Play } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import AnalysisStatus from './AnalysisStatus';
import ResultPreview from './ResultPreview';

const LogicAnalyser: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAnalysisStatus('uploading');
    
    // Simulate upload completion
    setTimeout(() => {
      setAnalysisStatus('idle');
    }, 1000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAnalysisStatus('idle');
    setResultFile(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setAnalysisStatus('processing');
    
    // Simulate backend processing
    setTimeout(() => {
      // Create a mock result file
      const mockResult = new File(['Mock processed document content'], 'analyzed_document.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      setResultFile(mockResult);
      setAnalysisStatus('completed');
    }, 3000);
  };

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardHeader className="bg-compliance-black text-white">
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6" />
          <span>Logic Analyser</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <FileUploadZone
          onFileUpload={handleFileUpload}
          acceptedTypes=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          title="Upload Word Document"
          description="Upload a Word document for logic analysis"
          uploadedFile={uploadedFile}
          onRemoveFile={handleRemoveFile}
        />

        <AnalysisStatus status={analysisStatus} />

        {uploadedFile && analysisStatus === 'idle' && (
          <Button 
            onClick={handleAnalyze}
            className="w-full bg-compliance-red hover:bg-red-600 text-white py-3"
            disabled={analysisStatus !== 'idle'}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Logic Analysis
          </Button>
        )}

        <ResultPreview 
          resultFile={resultFile}
          fileType="document"
          title="Analysis Results"
        />
      </CardContent>
    </Card>
  );
};

export default LogicAnalyser;
