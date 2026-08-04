using Microsoft.AspNetCore.Mvc;
using WeddingPlanner.DotNet.Models;
using WeddingPlanner.DotNet.Services;

namespace WeddingPlanner.DotNet.Controllers
{
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly CloudinaryImageService _cloudinaryImageService;

        public FeedbackController(CloudinaryImageService cloudinaryImageService)
        {
            _cloudinaryImageService = cloudinaryImageService;
        }

        private static readonly List<ReviewModel> ReviewsStore = GenerateSeedReviews();

        private static List<ReviewModel> GenerateSeedReviews()
        {
            var list = new List<ReviewModel>();
            string[] planners = {
                "Royal Touch Weddings Studio", "Destination Forever Planners",
                "Blissful Moments Events", "Elegance & Charm Weddings", "Grandeur Celebrations"
            };
            string[] comments = {
                "Exceptional royal decor and flawless execution at Lake Palace Udaipur!",
                "The sunset beach mandap in Goa was magical. Highly recommended!",
                "Beautiful floral arrangements and seamless coordination throughout the event.",
                "Punctual staff, delicious multi-cuisine buffet counters, and great music.",
                "Memorable wedding experience! Everything was managed beyond our expectations."
            };

            for (int i = 1; i <= 30; i++)
            {
                list.Add(new ReviewModel
                {
                    Id = i,
                    BookingId = 100 + i,
                    ClientName = $"Client User {((i % 10) + 1)}",
                    PlannerName = planners[i % planners.Length],
                    PlannerId = (i % planners.Length) + 1,
                    Rating = (i % 3) + 3, // Ratings 3, 4, 5
                    Comment = comments[i % comments.Length],
                    Date = DateTime.Now.AddDays(-i).ToString("yyyy-MM-dd")
                });
            }
            return list;
        }

        [HttpGet("api/feedback")]
        [HttpGet("reviews")]
        [HttpGet("admin/reports/feedback")]
        public IActionResult GetFeedbacks(
            [FromQuery] string? clientName,
            [FromQuery] string? plannerName,
            [FromQuery] int? rating,
            [FromQuery] string? fromDate,
            [FromQuery] string? toDate,
            [FromQuery] string? sort)
        {
            var results = ReviewsStore.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(clientName))
                results = results.Where(r => r.ClientName.Contains(clientName, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrWhiteSpace(plannerName))
                results = results.Where(r => r.PlannerName.Contains(plannerName, StringComparison.OrdinalIgnoreCase));

            if (rating.HasValue)
                results = results.Where(r => r.Rating == rating.Value);

            if (!string.IsNullOrWhiteSpace(fromDate) && DateTime.TryParse(fromDate, out var from))
                results = results.Where(r => DateTime.TryParse(r.Date, out var d) && d >= from);

            if (!string.IsNullOrWhiteSpace(toDate) && DateTime.TryParse(toDate, out var to))
                results = results.Where(r => DateTime.TryParse(r.Date, out var d) && d <= to);

            results = sort == "oldest"
                ? results.OrderBy(r => DateTime.TryParse(r.Date, out var d) ? d : DateTime.MinValue)
                : results.OrderByDescending(r => DateTime.TryParse(r.Date, out var d) ? d : DateTime.MinValue);

            return Ok(new { success = true, data = results.ToList() });
        }

        [HttpGet("api/feedback/{id}")]
        [HttpGet("reviews/{id}")]
        [HttpGet("admin/reports/feedback/{id}")]
        public IActionResult GetFeedbackById(int id)
        {
            var review = ReviewsStore.FirstOrDefault(r => r.Id == id);
            if (review == null)
            {
                return NotFound(new { success = false, message = $"Feedback {id} not found" });
            }
            return Ok(new { success = true, data = review });
        }

        [HttpGet("reviews/planner/{plannerId}")]
        public IActionResult GetPlannerReviews(int plannerId)
        {
            var filtered = ReviewsStore.Where(r => r.PlannerId == plannerId).ToList();
            return Ok(new { success = true, data = filtered });
        }

        [HttpGet("api/feedback/summary")]
        [HttpGet("admin/reports/feedback/summary")]
        public IActionResult GetFeedbackSummary()
        {
            int total = ReviewsStore.Count;
            double average = total > 0 ? Math.Round(ReviewsStore.Average(r => r.Rating), 1) : 0;
            var starCounts = new Dictionary<int, int>
            {
                [5] = ReviewsStore.Count(r => r.Rating == 5),
                [4] = ReviewsStore.Count(r => r.Rating == 4),
                [3] = ReviewsStore.Count(r => r.Rating == 3),
                [2] = ReviewsStore.Count(r => r.Rating == 2),
                [1] = ReviewsStore.Count(r => r.Rating == 1),
            };

            return Ok(new
            {
                success = true,
                data = new
                {
                    totalFeedback = total,
                    averageRating = average,
                    fiveStar = starCounts[5],
                    fourStar = starCounts[4],
                    threeStar = starCounts[3],
                    twoStar = starCounts[2],
                    oneStar = starCounts[1],
                }
            });
        }

        [HttpPost("api/feedback")]
        [HttpPost("reviews")]
        public IActionResult SubmitReview([FromBody] ReviewModel review)
        {
            review.Id = ReviewsStore.Count + 1;
            review.Date = DateTime.Now.ToString("yyyy-MM-dd");
            ReviewsStore.Insert(0, review);

            return Ok(new { success = true, message = "Review submitted successfully", data = review });
        }

        // Optional feedback image upload — call this first to get imageUrl/publicId, then include
        // them in the SubmitReview body, mirroring the Spring Boot upload-then-save pattern.
        [HttpPost("api/feedback/upload-image")]
        public async Task<IActionResult> UploadFeedbackImage(IFormFile file)
        {
            try
            {
                var result = await _cloudinaryImageService.UploadAsync(file, "wedding-planner/feedback");
                return StatusCode(201, new
                {
                    success = true,
                    message = "Image uploaded successfully",
                    data = new { imageUrl = result.ImageUrl, publicId = result.PublicId }
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete("api/feedback/{id}")]
        [HttpDelete("reviews/{id}")]
        [HttpDelete("admin/reports/feedback/{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var review = ReviewsStore.FirstOrDefault(r => r.Id == id);
            if (review == null)
            {
                return NotFound(new { success = false, message = $"Feedback {id} not found" });
            }
            await _cloudinaryImageService.DeleteAsync(review.FeedbackImagePublicId);
            ReviewsStore.Remove(review);
            return Ok(new { success = true, message = "Feedback deleted successfully" });
        }
    }
}
