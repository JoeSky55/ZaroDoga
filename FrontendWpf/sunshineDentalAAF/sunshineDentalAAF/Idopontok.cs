using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sunshineDentalAAF
{
    public class Idopontok
    {
        public string nev {  get; set; }
        public string szak_nev { get; set; }
        public DateTime if_datum
        {
            get => _if_datum.ToLocalTime();
            set => _if_datum = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _if_datum;
        public string if_idopont { get; set; }
        public string if_nev { get; set; }
        public string if_email { get; set; }
        public string if_telefon { get; set; }
    }
}
