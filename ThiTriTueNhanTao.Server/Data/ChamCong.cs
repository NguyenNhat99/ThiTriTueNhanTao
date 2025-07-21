using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("ChamCong")]
    public class ChamCong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int Id { set; get; }
        public string UserId { set; get; } = null!;

        public string HinhAnhChamCong = string.Empty!;
        public string LoaiChamCong = string.Empty;
        public DateTime ThoiGian { set; get; }  
        public string GhiChu = string.Empty!;
        public User? User { get; set; }
    }
}
