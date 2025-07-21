using Microsoft.EntityFrameworkCore;
using ThiTriTueNhanTao.Server.Data;

namespace ThiTriTueNhanTao.Server.Helpers
{
    public class ImageHelper
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly EmployeeDbContext _context;

        public ImageHelper(IWebHostEnvironment webHostEnvironment, EmployeeDbContext context)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }
        public async Task<string> AddAsync(IFormFile file, string folder)
        {
            if (file != null)
            {
                var ext = Path.GetExtension(file.FileName);
                var newFileName = $"{Guid.NewGuid()}{ext}";

                var rootPath = _webHostEnvironment.ContentRootPath;
                var folderPath = Path.Combine(rootPath, "wwwroot/Assets", folder);

                var filePath = Path.Combine(folderPath, newFileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                return newFileName;
            }
            return "";
        }
        public async Task<bool> DeleteAsync(string fileName, string folder, string userId)
        {
            // 1. Xóa file vật lý
            var rootPath = _webHostEnvironment.ContentRootPath;
            var filePath = Path.Combine(rootPath, "wwwroot/Assets", folder, fileName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            // 2. Xóa bản ghi trong CSDL
            var image = await _context.hinhAnhNhanViens
                .FirstOrDefaultAsync(h => h.UserId == userId);

            if (image != null)
            {
                _context.hinhAnhNhanViens.Remove(image);
            }
            return true;
        }
    }
}
