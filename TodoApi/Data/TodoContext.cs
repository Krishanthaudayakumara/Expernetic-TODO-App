using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using TodoApi.Data; 
using TodoApi.Models; 
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options) { }

        public DbSet<Todo> Todos { get; set; }
    }
}
