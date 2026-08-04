using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace WeddingPlanner.DotNet.Services
{
    public class ImageUploadResult
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string PublicId { get; set; } = string.Empty;
    }

    // Independent Cloudinary integration for the .NET Feedback module. Kept separate from the
    // Spring Boot CloudinaryService by design — the two backends do not call each other; they
    // just share the same Cloudinary account via the same CLOUDINARY_* environment variables.
    public class CloudinaryImageService
    {
        private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg", "image/jpg", "image/png", "image/webp"
        };
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
        private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

        private readonly Cloudinary _cloudinary;

        public CloudinaryImageService(IConfiguration configuration)
        {
            var cloudName = configuration["CLOUDINARY_CLOUD_NAME"] ?? Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME") ?? "";
            var apiKey = configuration["CLOUDINARY_API_KEY"] ?? Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY") ?? "";
            var apiSecret = configuration["CLOUDINARY_API_SECRET"] ?? Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET") ?? "";

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account) { Api = { Secure = true } };
        }

        public async Task<ImageUploadResult> UploadAsync(IFormFile file, string folder = "wedding-planner/feedback")
        {
            if (file == null || file.Length == 0)
                throw new InvalidOperationException("No file was provided for upload");

            if (file.Length > MaxFileSizeBytes)
                throw new InvalidOperationException("File size exceeds the maximum allowed size of 5 MB");

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedContentTypes.Contains(file.ContentType) || !AllowedExtensions.Contains(extension))
                throw new InvalidOperationException("Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed");

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder
            };

            var result = await _cloudinary.UploadAsync(uploadParams);
            if (result.Error != null)
                throw new InvalidOperationException($"Cloudinary upload failed: {result.Error.Message}");

            return new ImageUploadResult
            {
                ImageUrl = result.SecureUrl?.ToString() ?? string.Empty,
                PublicId = result.PublicId ?? string.Empty
            };
        }

        public async Task DeleteAsync(string? publicId)
        {
            if (string.IsNullOrWhiteSpace(publicId)) return;

            var deleteParams = new DeletionParams(publicId) { ResourceType = ResourceType.Image };
            await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
