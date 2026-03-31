var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
var app = builder.Build();
app.UseCors();

app.MapGet("/", () => "Hello World!");
List<Movie> movieList = [
new Movie ("101", "Super Mario Galaxy", "posters/supermario.jpg", ["Animation", "Adventure", "Fantasy"], 4.9, "Travel across the cosmos to rescue Princess Peach from the clutches of Bowser in this gravity-defying adventure.", ["10:00 AM", "1:00 PM", "4:30 PM"], true),
new Movie ("102", "Project Hail Mary", "posters/projecthailmary.jpg", ["Sci-Fi", "Drama"], 4.7, "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity and the Earth itself.", ["2:00 PM", "5:30 PM", "9:00 PM"], true),
new Movie ("103", "Spider-Man: Brand New Day", "posters/spiderman.webp", ["Action", "Sci-Fi", "Adventure"], 4.0, "Peter Parker navigates a clean slate in New York City, facing fresh villains and a complicated social life.", ["12:45 PM", "4:00 PM", "8:15 PM", "10:30 PM"], true)
];
app.MapGet("/movies", () =>
{
    return movieList;
});

app.Run();

public record Movie(string id, string title, string poster, string[] genre, double rating, string description, string[] showtimes, bool isNowPlaying);
