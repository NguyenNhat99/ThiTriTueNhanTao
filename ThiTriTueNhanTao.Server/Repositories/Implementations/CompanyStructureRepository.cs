using ThiTriTueNhanTao.Server.Data;
using static ThiTriTueNhanTao.Server.Model.DTO.CompanyStructureDTO;
using Microsoft.EntityFrameworkCore;

namespace ThiTriTueNhanTao.Server.Repositories.Implementations
{
    public class CompanyStructureRepository
    {
        private readonly EmployeeDbContext _context;

        public CompanyStructureRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<List<ChiNhanhDto>> GetCompanyStructureAsync()
        {
            var data = await _context.ChiNhanh
                .Select(cn => new ChiNhanhDto
                {
                    Id = cn.Id,
                    TenChiNhanh = cn.TenChiNhanh,
                    SoNha = cn.SoNha,
                    Xa = cn.Xa,
                    Huyen = cn.Huyen,
                    Tinh = cn.Tinh,
                    PhongBans = cn.PhongBans.Select(pb => new PhongBanDto
                    {
                        Id = pb.Id,
                        TenPhongBan = pb.TenPhongBan,
                        MoTa = pb.MoTa,
                        Nhoms = pb.Nhoms.Select(n => new NhomDto
                        {
                            Id = n.Id,
                            TenNhom = n.TenNhom,
                            MoTaNhiemVu = n.MoTaNhiemVu
                        }).ToList()
                    }).ToList()
                }).ToListAsync();

            return data;
        }
    }

}
