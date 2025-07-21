namespace ThiTriTueNhanTao.Server.Repositories.Interface
{
    public interface IImagesRepository
    {
        //public Task<string> GetByAccount(int id);
        public Task<string> AddAsync(IFormFile file, string folder);
        public Task<bool> DeleteAsync(string fileName, string folder, string userId);
    }
}
