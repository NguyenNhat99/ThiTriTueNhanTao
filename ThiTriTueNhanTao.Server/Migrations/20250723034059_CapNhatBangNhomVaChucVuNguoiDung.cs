using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ThiTriTueNhanTao.Server.Migrations
{
    /// <inheritdoc />
    public partial class CapNhatBangNhomVaChucVuNguoiDung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChucVuNguoiDung_Nhom_NhomMaNhom",
                table: "ChucVuNguoiDung");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nhom",
                table: "Nhom");

            migrationBuilder.DropColumn(
                name: "MaNhom",
                table: "Nhom");

            migrationBuilder.DropColumn(
                name: "MaChiNhanh",
                table: "ChucVuNguoiDung");

            migrationBuilder.DropColumn(
                name: "MaChucVu",
                table: "ChucVuNguoiDung");

            migrationBuilder.DropColumn(
                name: "MaNhom",
                table: "ChucVuNguoiDung");

            migrationBuilder.DropColumn(
                name: "MaPhongBan",
                table: "ChucVuNguoiDung");

            migrationBuilder.RenameColumn(
                name: "MaPhongBan",
                table: "Nhom",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "NhomMaNhom",
                table: "ChucVuNguoiDung",
                newName: "NhomId");

            migrationBuilder.RenameIndex(
                name: "IX_ChucVuNguoiDung_NhomMaNhom",
                table: "ChucVuNguoiDung",
                newName: "IX_ChucVuNguoiDung_NhomId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Nhom",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nhom",
                table: "Nhom",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChucVuNguoiDung_Nhom_NhomId",
                table: "ChucVuNguoiDung",
                column: "NhomId",
                principalTable: "Nhom",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChucVuNguoiDung_Nhom_NhomId",
                table: "ChucVuNguoiDung");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nhom",
                table: "Nhom");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Nhom",
                newName: "MaPhongBan");

            migrationBuilder.RenameColumn(
                name: "NhomId",
                table: "ChucVuNguoiDung",
                newName: "NhomMaNhom");

            migrationBuilder.RenameIndex(
                name: "IX_ChucVuNguoiDung_NhomId",
                table: "ChucVuNguoiDung",
                newName: "IX_ChucVuNguoiDung_NhomMaNhom");

            migrationBuilder.AlterColumn<int>(
                name: "MaPhongBan",
                table: "Nhom",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "MaNhom",
                table: "Nhom",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "MaChiNhanh",
                table: "ChucVuNguoiDung",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaChucVu",
                table: "ChucVuNguoiDung",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaNhom",
                table: "ChucVuNguoiDung",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaPhongBan",
                table: "ChucVuNguoiDung",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nhom",
                table: "Nhom",
                column: "MaNhom");

            migrationBuilder.AddForeignKey(
                name: "FK_ChucVuNguoiDung_Nhom_NhomMaNhom",
                table: "ChucVuNguoiDung",
                column: "NhomMaNhom",
                principalTable: "Nhom",
                principalColumn: "MaNhom");
        }
    }
}
