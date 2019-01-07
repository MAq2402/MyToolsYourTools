using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities.Abstract
{
    public class Enitity
    {
        public Guid Id { get; set; }
        public Enitity()
        {
            Id = Guid.NewGuid();
        }
    }
}
