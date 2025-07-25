namespace ThiTriTueNhanTao.Server.Model.DTO
{
    public class CompanyStructureDTO
    {
        public class NhomDto
        {
            public int Id { get; set; }
            public string TenNhom { get; set; }
            public string MoTaNhiemVu { get; set; }
        }

        public class PhongBanDto
        {
            public int Id { get; set; }
            public string TenPhongBan { get; set; }
            public string MoTa { get; set; }
            public List<NhomDto> Nhoms { get; set; }
        }

        public class ChiNhanhDto
        {
            public int Id { get; set; }
            public string TenChiNhanh { get; set; }
            public string SoNha { get; set; }
            public string Xa { get; set; }
            public string Huyen { get; set; }
            public string Tinh { get; set; }
            public List<PhongBanDto> PhongBans { get; set; }
        }


    }
}
