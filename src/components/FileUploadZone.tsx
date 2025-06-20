
import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
  acceptedTypes: string;
  title: string;
  description: string;
  uploadedFile?: File | null;
  onRemoveFile?: () => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileUpload,
  acceptedTypes,
  title,
  description,
  uploadedFile,
  onRemoveFile
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <Card className={`relative border-2 border-dashed transition-all duration-300 ${
      isDragOver 
        ? 'border-compliance-red bg-red-50' 
        : uploadedFile 
          ? 'border-green-500 bg-green-50'
          : 'border-compliance-dark-grey hover:border-compliance-red'
    }`}>
      <div
        className="p-8 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <File className="w-8 h-8 text-green-600" />
              <span className="font-medium text-compliance-black">{uploadedFile.name}</span>
              {onRemoveFile && (
                <button
                  onClick={onRemoveFile}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-compliance-red" />
                </button>
              )}
            </div>
            <p className="text-sm text-compliance-dark-grey">
              File uploaded successfully. Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-compliance-dark-grey mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-compliance-black mb-2">{title}</h3>
              <p className="text-compliance-dark-grey mb-4">{description}</p>
            </div>
            <div>
              <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileInput}
                className="hidden"
                id={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`}
              />
              <label
                htmlFor={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`}
                className="inline-flex items-center px-6 py-3 bg-compliance-black text-white font-medium rounded-lg hover:bg-compliance-red transition-colors cursor-pointer"
              >
                Choose File
              </label>
            </div>
            <p className="text-xs text-compliance-dark-grey">
              Or drag and drop your file here
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FileUploadZone;
