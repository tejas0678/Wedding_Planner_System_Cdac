import React, { useRef, useState } from 'react';
import { FiUpload, FiX, FiImage, FiLoader } from 'react-icons/fi';
import { uploadImage, deleteImage, validateImageFile } from '../../services/imageService';

/**
 * Reusable image upload control backed by Cloudinary. Used across every module that needs
 * image upload (client/planner profile photo, studio logo, package image, portfolio, event
 * image) so upload logic lives in exactly one place.
 *
 * value: { imageUrl, publicId } — the currently saved image (if any)
 * onChange: ({ imageUrl, publicId }) => void — called after a successful upload/replace/remove;
 *   the caller stores this into its own form state and saves it via its EXISTING update call.
 */
export default function ImageUpload({ value, onChange, folder, label = 'Image', disabled = false }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const imageUrl = value?.imageUrl;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file later
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsUploading(true);
    try {
      const previousPublicId = value?.publicId;
      const result = await uploadImage(file, folder);
      onChange({ imageUrl: result.imageUrl, publicId: result.publicId });

      // Replacing an already-uploaded-but-not-yet-saved image: clean up the orphaned one.
      if (previousPublicId) {
        deleteImage(previousPublicId).catch((err) => console.error('Failed to clean up replaced image:', err));
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setError(err?.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    const publicIdToRemove = value?.publicId;
    onChange({ imageUrl: '', publicId: '' });
    setError('');
    if (publicIdToRemove) {
      try {
        await deleteImage(publicIdToRemove);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">{label}</label>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl border border-rose-100 bg-[#FFF9FA] overflow-hidden flex items-center justify-center shrink-0">
          {isUploading ? (
            <FiLoader className="w-5 h-5 text-[#EC3664] animate-spin" />
          ) : imageUrl ? (
            <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
          ) : (
            <FiImage className="w-6 h-6 text-gray-300" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading || disabled}
              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-[#EC3664] px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiUpload className="w-3.5 h-3.5" />
              {isUploading ? 'Uploading...' : imageUrl ? 'Replace' : 'Upload'}
            </button>

            {imageUrl && !isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiX className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>
          <p className="text-[10px] text-gray-400">JPG, PNG or WEBP, up to 5 MB.</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && <p className="text-[11px] font-bold text-[#EC3664] mt-2">{error}</p>}
    </div>
  );
}
