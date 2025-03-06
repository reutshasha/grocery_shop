using BL.DTOs;
using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Models.response;

namespace GroceryShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryController : ControllerBase
    {
        private readonly IGroceryService _groceryService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GroceryController(IGroceryService groceryService, IHttpContextAccessor httpContextAccessor)
        {
            _groceryService = groceryService;
            _httpContextAccessor = httpContextAccessor;
        }

        [Authorize]
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactionsByDateRange([FromQuery] DateRange requestDate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<object>(ApiStatusCodes.BadRequest, "Invalid request data.", ModelState));
            }

            var response = await _groceryService.GetTransactionsByDateRangeAsync(requestDate);
            return StatusCode(response.StatusCode, response);
        }
    }

}
