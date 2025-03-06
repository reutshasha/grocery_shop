using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class GroceryTransaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        public decimal Income { get; set; }

        [Required]
        public decimal Outcome { get; set; }

        [NotMapped]
        public decimal Revenue => Income - Outcome;
    }
}
