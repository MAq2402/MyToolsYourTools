using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Rent: Enitity
    {
        public Guid BorrowerId { get; set; }
        public User Borrower { get; set; }
        public Guid OfferId { get; set; }
        public Offer Offer { get; set; }
    }
}
