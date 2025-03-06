using BL.DTOs;
using BL.Interfaces;
using DAL.Contexts;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Shared.Models.response;

namespace BL.Services
{
    public class GroceryService : IGroceryService
    {
        private readonly GroceryDbContext _context;
        private readonly ILogService _logService;


        public GroceryService(GroceryDbContext context, ILogService logService)
        {
            _context = context;
            _logService = logService;

        }

        public async Task<List<GroceryTransaction>> GetTransactionsAsync(DateTime startDate, DateTime endDate)
        {
            var transactions = await _context.GroceryTransactions
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                .OrderBy(t => t.TransactionDate)
                .ToListAsync();

            return transactions ?? new List<GroceryTransaction>();

        }
        public async Task<ApiResponse<List<GroceryTransaction>>> GetTransactionsByDateRangeAsync(DateRange dateRange)
        {
            if (!DateTime.TryParse(dateRange.startDate, out DateTime startDateTime) ||
                !DateTime.TryParse(dateRange.endDate, out DateTime endDateTime))
            {
                _logService.LogError(new Exception("Invalid date format."), "GetTransactionsByDateRangeAsync");
                return new ApiResponse<List<GroceryTransaction>>(ApiStatusCodes.BadRequest, "Invalid date format.");
            }

            if (startDateTime > endDateTime)
            {
                _logService.LogWarning("Start date cannot be greater than end date.");
                return new ApiResponse<List<GroceryTransaction>>(ApiStatusCodes.BadRequest, "Start date cannot be greater than end date.");
            }

            var transactions = await GetTransactionsAsync(startDateTime, endDateTime);

            if (transactions == null || !transactions.Any())
            {
                return new ApiResponse<List<GroceryTransaction>>(ApiStatusCodes.NotFound, "No transactions found for the specified date range.");
            }

            return new ApiResponse<List<GroceryTransaction>>(ApiStatusCodes.Ok, "Transactions retrieved successfully.", transactions);
        }

    }
}
