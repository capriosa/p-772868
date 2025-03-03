
import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageBase64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB');
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read the image file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const handleClearImage = () => {
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="w-full h-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {currentImage ? (
        <div 
          className="relative w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${currentImage})` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
              <button 
                onClick={handleUploadClick} 
                className="p-2 bg-primary/90 rounded-full text-white hover:bg-primary transition-colors"
                title="Change image"
              >
                <Upload size={18} />
              </button>
              <button 
                onClick={handleClearImage} 
                className="p-2 bg-destructive/90 rounded-full text-white hover:bg-destructive transition-colors"
                title="Remove image"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div 
          className="w-full h-full bg-muted flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={handleUploadClick}
        >
          <Upload className="mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Upload Image</span>
          <span className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF (max 2MB)</span>
        </div>
      )}
      
      {isUploading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-sm">Processing image...</div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-xs text-destructive">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
