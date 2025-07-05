import FileUploader from './FileUploader';
import IndexSelector from './IndexSelector';

export default function BroadPanel() {
  return (
    <div className="space-y-6">
      <FileUploader />
      <IndexSelector />
    </div>
  );
}
