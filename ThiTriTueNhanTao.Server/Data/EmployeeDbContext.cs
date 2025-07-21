using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ThiTriTueNhanTao.Server.Data
{
    public class EmployeeDbContext : IdentityDbContext<User>
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> opt) : base(opt)
        {
        }
        #region DbSet
        public DbSet<ChamCong> chamCongs{ get; set; }
        public DbSet<ChiNhanh> ChiNhanhs { get; set; }
        public DbSet<ChucVu> chucVus{ get; set; }
        public DbSet<ChucVuNguoiDung> ChucVuNguoiDungs { get; set; }
        public DbSet<HinhAnhNhanVien> hinhAnhNhanViens{ get; set; }
        public DbSet<Nhom> nhoms{ get; set; }
        public DbSet<PhongBan> phongBans{ get; set; }
        public DbSet<User> users{ get; set; }
        #endregion
    }
}
