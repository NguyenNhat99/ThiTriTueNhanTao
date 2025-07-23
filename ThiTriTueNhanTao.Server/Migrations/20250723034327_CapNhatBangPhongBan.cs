using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThiTriTueNhanTao.Server.Migrations
{
    /// <inheritdoc />
    public partial class CapNhatBangPhongBan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaChiNhanh",
                table: "PhongBan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaChiNhanh",
                table: "PhongBan",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
