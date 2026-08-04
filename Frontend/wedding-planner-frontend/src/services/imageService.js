import api from './api';

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateImageFile(file) {
  if (!file) return 'Please select a file.';
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.';
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'File size exceeds the maximum allowed size of 5 MB.';
  }
  return null;
}

export const uploadImage = async (file, folder) => {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const formData = new FormData();
  formData.append('file', file);
  if (folder) formData.append('folder', folder);

  const res = await api.postForm('/api/images/upload', formData);
  return res && res.data ? res.data : res;
};

export const deleteImage = async (publicId) => {
  if (!publicId) return null;
  const res = await api.delete(`/api/images/${publicId}`);
  return res && res.data ? res.data : res;
};
