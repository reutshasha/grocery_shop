using BL.DTOs;
using DAL.Entities;
using Shared.Models.response;

namespace BL.Interfaces
{
    public interface IGroceryService
    {
        Task<List<GroceryTransaction>> GetTransactionsAsync(DateTime startDate, DateTime endDate);
        Task<ApiResponse<List<GroceryTransaction>>> GetTransactionsByDateRangeAsync(DateRange dateRange); // עדכן את סוג ההחזרה
    }
}
