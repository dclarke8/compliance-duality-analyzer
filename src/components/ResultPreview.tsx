
import React from 'react';
import { Download, FileText, File } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResultPreviewProps {
  resultFile?: File | null;
  fileType: 'document' | 'excel';
  title: string;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ resultFile, fileType, title }) => {
  const handleDownload = () => {
    if (resultFile) {
      const url = URL.createObjectURL(resultFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = resultFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getFileIcon = () => {
    return fileType === 'document' ? FileText : File;
  };

  const FileIcon = getFileIcon();

  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-semibold text-compliance-black mb-4">{title}</h3>
      
      {resultFile ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-compliance-light-grey rounded-lg">
            <FileIcon className="w-8 h-8 text-compliance-red" />
            <div className="flex-1">
              <p className="font-medium text-compliance-black">{resultFile.name}</p>
              <p className="text-sm text-compliance-dark-grey">
                {(resultFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              onClick={handleDownload}
              className="bg-compliance-black hover:bg-compliance-red text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="border border-compliance-dark-grey rounded-lg p-6 bg-white min-h-[300px]">
            <div className="text-center text-compliance-dark-grey">
              <FileIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Preview Available</p>
              <p className="text-sm">
                {fileType === 'document' 
                  ? 'Document analysis results ready for download' 
                  : 'Excel analysis results ready for download'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-compliance-dark-grey rounded-lg">
          <div className="text-center text-compliance-dark-grey">
            <FileIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No results yet</p>
            <p className="text-sm">Upload and process files to see results</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResultPreview;
