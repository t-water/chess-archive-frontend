using Microsoft.EntityFrameworkCore.Migrations;

namespace Chess.Migrations
{
    public partial class AddedImageSrcAndFeaturedToPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "Players",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ImageSrc",
                table: "Players",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Featured",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "ImageSrc",
                table: "Players");
        }
    }
}
