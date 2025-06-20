
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Play } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import AnalysisStatus from './AnalysisStatus';
import ResultPreview from './ResultPreview';

const CriteriaAnalyser: React.FC = () => {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleWordFileUpload = (file: File) => {
    setWordFile(file);
  };

  const handleExcelFileUpload = (file: File) => {
    setExcelFile(file);
  };

  const handleRemoveWordFile = () => {
    setWordFile(null);
    setResultFile(null);
  };

  const handleRemoveExcelFile = () => {
    setExcelFile(null);
    setResultFile(null);
  };

  const handleAnalyze = async () => {
    if (!wordFile || !excelFile) return;

    setAnalysisStatus('processing');
    
    // Simulate backend processing
    setTimeout(() => {
      // Create a mock result file
      const mockResult = new File(['Mock processed excel content'], 'criteria_analysis_results.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      setResultFile(mockResult);
      setAnalysisStatus('completed');
    }, 4000);
  };

  const canAnalyze = wordFile && excelFile && analysisStatus === 'idle';

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardHeader className="bg-compliance-black text-white">
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-6 h-6" />
          <span>Criteria Analyser</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FileUploadZone
            onFileUpload={handleWordFileUpload}
            acceptedTypes=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            title="Word Document"
            description="Upload Word document"
            uploadedFile={wordFile}
            onRemoveFile={handleRemoveWordFile}
          />
          
          <FileUploadZone
            onFileUpload={handleExcelFileUpload}
            acceptedTypes=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            title="Excel File"
            description="Upload Excel file"
            uploadedFile={excelFile}
            onRemoveFile={handleRemoveExcelFile}
          />
        </div>

        <AnalysisStatus status={analysisStatus} />

        {canAnalyze && (
          <Button 
            onClick={handleAnalyze}
            className="w-full bg-compliance-red hover:bg-red-600 text-white py-3"
            disabled={!canAnalyze}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Criteria Analysis
          </Button>
        )}

        <ResultPreview 
          resultFile={resultFile}
          fileType="excel"
          title="Analysis Results"
        />
      </CardContent>
    </Card>
  );
};

export default CriteriaAnalyser;
