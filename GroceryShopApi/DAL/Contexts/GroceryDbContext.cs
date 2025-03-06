using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Contexts
{
    public class GroceryDbContext :DbContext
    {
        public GroceryDbContext(DbContextOptions<GroceryDbContext> options) : base(options) { }
        public DbSet<GroceryTransaction> GroceryTransactions { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    //  Seed Data 
        //    modelBuilder.Entity<GroceryTransaction>().HasData(
        //        new GroceryTransaction { Id = 36, Date = new DateTime(2021, 11, 23), Income = 1334, Outcome = 1466 }
        //    );
        //}
    }
}
