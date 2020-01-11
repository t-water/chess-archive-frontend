using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Chess.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    PlayerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    DeathDate = table.Column<DateTime>(nullable: false),
                    Country = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.PlayerId);
                });

            migrationBuilder.CreateTable(
                name: "Pgns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Event = table.Column<string>(nullable: true),
                    Site = table.Column<string>(nullable: true),
                    Date = table.Column<string>(nullable: true),
                    Round = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true),
                    Moves = table.Column<string>(nullable: true),
                    WhitePlayerId = table.Column<int>(nullable: false),
                    BlackPlayerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pgns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pgns_Players_BlackPlayerId",
                        column: x => x.BlackPlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Pgns_Players_WhitePlayerId",
                        column: x => x.WhitePlayerId,
                        principalTable: "Players",
                        principalColumn: "PlayerId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pgns_BlackPlayerId",
                table: "Pgns",
                column: "BlackPlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Pgns_WhitePlayerId",
                table: "Pgns",
                column: "WhitePlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pgns");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
