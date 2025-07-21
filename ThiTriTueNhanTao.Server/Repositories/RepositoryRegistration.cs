using ThiTriTueNhanTao.Server.Helpers;
using ThiTriTueNhanTao.Server.Repositories.Implementations;
using ThiTriTueNhanTao.Server.Repositories.Interface;

namespace ThiTriTueNhanTao.Server.Repositories
{
    public static class RepositoryRegistration
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<ImageHelper>();
        }
    }
}
