namespace WeddingPlanner.DotNet.Models
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string PlannerName { get; set; } = string.Empty;
        public int PlannerId { get; set; } = 1;
        public int Rating { get; set; } = 5;
        public string Comment { get; set; } = string.Empty;
        public string Date { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string? FeedbackImageUrl { get; set; }
        public string? FeedbackImagePublicId { get; set; }
    }
}
