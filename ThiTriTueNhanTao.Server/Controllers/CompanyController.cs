using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThiTriTueNhanTao.Server.Data;
using ThiTriTueNhanTao.Server.Model.DTO;
using ThiTriTueNhanTao.Server.Repositories.Implementations;

namespace ThiTriTueNhanTao.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyStructureRepository _repo;
        private readonly EmployeeDbContext _context;
        public CompanyController(CompanyStructureRepository repo, EmployeeDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        // Cấu trúc công ty
        [HttpGet("structure")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> GetStructure()
        {
            var result = await _repo.GetCompanyStructureAsync();
            return Ok(result);
        }

        // Thêm chi nhánh
        [HttpPost("chinhanh")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> CreateChiNhanh([FromBody] ChiNhanhCreateDTO dto)
        {
            var entity = new ChiNhanh { TenChiNhanh = dto.TenChiNhanh, SoNha = dto.SoNha, Xa = dto.Xa, 
                Huyen = dto.Huyen, Tinh = dto.Huyen };
            _context.ChiNhanhs.Add(entity);
            await _context.SaveChangesAsync();
            return Ok(entity);
        }

        // Sửa chi nhánh
        [HttpPut("chinhanh/{id}")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> UpdateChiNhanh(int id, [FromBody] ChiNhanhUpdateDTO dto)
        {
            var cn = await _context.ChiNhanhs.FindAsync(id);
            if (cn == null) return NotFound("Chi nhánh không tồn tại");

            cn.TenChiNhanh = dto.TenChiNhanh;
            cn.SoNha = dto.SoNha;
            cn.Xa = dto.Xa;
            cn.Huyen = dto.Huyen;
            cn.Tinh = dto.Tinh;

            await _context.SaveChangesAsync();
            return Ok(cn);
        }

        // Xóa chi nhánh
        [HttpDelete("chinhanh/{id}")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> DeleteChiNhanh(int id)
        {
            var chiNhanh = await _context.ChiNhanhs
                .Include(cn => cn.PhongBans)
                .FirstOrDefaultAsync(cn => cn.Id == id);

            if (chiNhanh == null)
                return NotFound("Chi nhánh không tồn tại.");

            if (chiNhanh.PhongBans != null && chiNhanh.PhongBans.Any())
                return BadRequest("Không thể xóa chi nhánh vì đang có phòng ban.");

            _context.ChiNhanhs.Remove(chiNhanh);
            await _context.SaveChangesAsync();

            return Ok("Xóa chi nhánh thành công.");
        }


        // Thêm phòng ban
        [HttpPost("phongban")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> CreatePhongBan([FromBody] PhongBanCreateDTO dto)
        {
            var entity = new PhongBan { TenPhongBan = dto.TenPhongBan, ChiNhanhId = dto.ChiNhanhId, MoTa = dto.MoTa };
            _context.phongBans.Add(entity);
            await _context.SaveChangesAsync();
            return Ok(entity);
        }

        // Sửa phòng ban
        [HttpPut("phongban/{id}")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> UpdatePhongBan(int id, [FromBody] PhongBanUpdateDTO dto)
        {
            var pb = await _context.phongBans.FindAsync(id);
            if (pb == null) return NotFound("Phòng ban không tồn tại");

            pb.TenPhongBan = dto.TenPhongBan;
            pb.ChiNhanhId = dto.ChiNhanhId;
            pb.MoTa = dto.MoTa;

            await _context.SaveChangesAsync();
            return Ok(pb);
        }

        // Xóa phòng ban
        [HttpDelete("phongban/{id}")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> DeletePhongBan(int id)
        {
            var phongBan = await _context.phongBans
                .Include(pb => pb.Nhoms)
                .FirstOrDefaultAsync(pb => pb.Id == id);

            if (phongBan == null)
                return NotFound("Phòng ban không tồn tại.");

            if (phongBan.Nhoms != null && phongBan.Nhoms.Any())
                return BadRequest("Không thể xóa phòng ban vì đang có nhóm.");

            _context.phongBans.Remove(phongBan);
            await _context.SaveChangesAsync();

            return Ok("Xóa phòng ban thành công.");
        }

        // Thêm nhóm
        [HttpPost("nhom")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> CreateNhom([FromBody] NhomCreateDTO dto)
        {
            var entity = new Nhom { TenNhom = dto.TenNhom, PhongBanId = dto.PhongBanId, MoTaNhiemVu = dto.MoTaNhiemVu };
            _context.nhoms.Add(entity);
            await _context.SaveChangesAsync();
            return Ok(entity);
        }

        // Sửa nhóm
        [HttpPut("nhom/{id}")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> UpdateNhom(int id, [FromBody] NhomUpdateDTO dto)
        {
            var nh = await _context.nhoms.FindAsync(id);
            if (nh == null) return NotFound("Nhóm không tồn tại");

            nh.TenNhom = dto.TenNhom;
            nh.PhongBanId = dto.PhongBanId;
            nh.MoTaNhiemVu = dto.MoTaNhiemVu;

            await _context.SaveChangesAsync();
            return Ok(nh);
        }
    }
}
