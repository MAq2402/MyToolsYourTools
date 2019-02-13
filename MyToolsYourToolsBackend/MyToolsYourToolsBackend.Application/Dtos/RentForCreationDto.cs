using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class RentForCreationDto
    {
        public Guid OfferId { get; set; }
        public Guid BorrowerId { get; set; }
    }
}
