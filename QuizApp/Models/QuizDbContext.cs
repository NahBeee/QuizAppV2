using Microsoft.EntityFrameworkCore;

namespace QuizApp.Models
{
    public class QuizDbContext: DbContext 
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) 
        { }

        public DbSet<Questions> Questions { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
