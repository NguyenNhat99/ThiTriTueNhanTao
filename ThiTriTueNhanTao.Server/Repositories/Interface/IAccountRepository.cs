using Microsoft.AspNetCore.Identity;
using ThiTriTueNhanTao.Server.Model;

namespace ThiTriTueNhanTao.Server.Repositories.Interface
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
        public Task<AccountModel> GetCurrentUser();
        public Task<bool> UpdatePasswordAsync(ChangePasswordModel model);
        public Task<bool> UpdateInformationAsync(UpdateInformationModel model);
        public Task<List<AccountModel>> GetAccounts();

    }
}
