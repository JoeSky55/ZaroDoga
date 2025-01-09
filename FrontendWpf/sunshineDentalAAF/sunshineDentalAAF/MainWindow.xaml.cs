using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using NetworkHelper;
using static System.Net.WebRequestMethods;

namespace sunshineDentalAAF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        string url = "http://localhost:3000/idopontok";
        List<Idopontok> idopontAdatok = new List<Idopontok>();

        string url2 = "http://localhost:3000/idopontokDatumUtan";
        List<Idopontok> aktualisIdopontAdatok = new List<Idopontok>();
        public MainWindow()
        {
            InitializeComponent();
            adatokbetoltese();
        }
        private void adatokbetoltese()
        {
            idopontAdatok = Backend.GET(url).Send().As<List<Idopontok>>();
            datagrid.ItemsSource = idopontAdatok;


            foreach (var a in idopontAdatok)
            {
                if (cbkereses.Items.Contains(a.szak_nev))
                {
                    
                }
                else
                {
                    cbkereses.Items.Add(a.szak_nev);
                }
            }
            cbkereses.SelectedIndex = 0;

            aktualisIdopontAdatok = Backend.GET(url2).Send().As<List<Idopontok>>();
            datagrid2.ItemsSource = aktualisIdopontAdatok;
            
        }

        private void Cbkereses_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbkereses.SelectedItem != null)
            {
                List<Idopontok> keresemLista = new List<Idopontok>();
                string keresem = cbkereses.SelectedItem.ToString();
                foreach (var a in idopontAdatok)
                {
                    if (keresem == a.szak_nev)
                    {
                        keresemLista.Add(a);
                    }
                }
                datagrid.ItemsSource = null;
                datagrid.ItemsSource = keresemLista;
            }
        }

        private void osszesGomb_Click(object sender, RoutedEventArgs e)
        {
            datagrid.ItemsSource = idopontAdatok;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (datagrid.SelectedItem != null)
            {
                var kivalasztottSor = datagrid.SelectedItem as Idopontok;
                string telefonSzam = kivalasztottSor.if_telefon;
                string url3 = "http://localhost:3000/idopontTorles";
                var torles = new { bevitel1 = telefonSzam };

                string valasz = Backend.DELETE(url3).Body(torles).Send().As<string>();
                MessageBox.Show(valasz);
                adatokbetoltese();
            }
            else MessageBox.Show("Nincs kiválasztva sor a törléshez");
        }

        private void regebbiIdopontok_Click(object sender, RoutedEventArgs e)
        {
            List<Idopontok> regebbiIdopontokLista = new List<Idopontok>();
            DateTime maiDatum = DateTime.Now.Date;
            foreach (var a in idopontAdatok)
            {
                if (maiDatum > a.if_datum)
                {
                    regebbiIdopontokLista.Add(a);
                }
            }
            datagrid.ItemsSource = null;
            datagrid.ItemsSource = regebbiIdopontokLista;
        }

        private void frissitesButton_Click(object sender, RoutedEventArgs e)
        {
            adatokbetoltese();
        }
    }
}