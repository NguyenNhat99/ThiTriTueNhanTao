using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThiTriTueNhanTao.Server.Data
{
    [Table("HinhAnhNhanVien")]
    public class HinhAnhNhanVien
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int Id { get; set; }
        public string ImageUrl { set; get; } = string.Empty;
        public string UserId { set; get; } = null!;
        public  User? User { set; get; }
    }
}
