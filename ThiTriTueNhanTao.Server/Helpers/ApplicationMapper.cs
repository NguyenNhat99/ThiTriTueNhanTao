using AutoMapper;
using ThiTriTueNhanTao.Server.Data;
using ThiTriTueNhanTao.Server.Model;

namespace ThiTriTueNhanTao.Server.Helpers
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() {
            //Mapper User -> AccountModel
            CreateMap<User, AccountModel>()
               .ForMember(dest => dest.SoDt, opt => opt.MapFrom(src => src.PhoneNumber))
               .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
                   src.HinhAnhNhanViens != null
                       ? src.HinhAnhNhanViens.Select(img => img.ImageUrl).ToList()
                       : new List<string>()
               ));
        }  
    }
}
