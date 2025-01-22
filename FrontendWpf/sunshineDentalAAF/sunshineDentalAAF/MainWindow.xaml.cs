using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

namespace sunshineDentalAAF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        string url = "http://localhost:3000/idopontok";
        List<Idopontok> idopontAdatok = new List<Idopontok>();

        //string url2 = "http://localhost:3000/idopontokDatumUtan";
        //List<Idopontok> aktualisIdopontAdatok = new List<Idopontok>();

        string url4 = "http://localhost:3000/csak_orvosok";
        List<Orvosok> OrvosAdatok = new List<Orvosok>();

        string url5 = "http://localhost:3000/csak_szakteruletek";
        List<Szakteruletek> SzakAdatok = new List<Szakteruletek>();


        public MainWindow()
        {
            InitializeComponent();
            adatokbetoltese();
        }
        private void adatokbetoltese()
        {
            //datagrid feltöltése adatokkal
            idopontAdatok = Backend.GET(url).Send().As<List<Idopontok>>();
            datagrid.ItemsSource = idopontAdatok;

            //cbkereses feltöltése adatokkal
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

            //cbOrvos feltöltése adatokkal -> új időpnt feltöltése fül
            OrvosAdatok = Backend.GET(url4).Send().As<List<Orvosok>>();
            foreach (var a in OrvosAdatok)
            {
                if (cbOrvos.Items.Contains(a.nev))
                {

                }
                else
                {
                    cbOrvos.Items.Add(a.nev);
                }
            }
            cbOrvos.SelectedIndex = 0;

            //cbSzakterulet feltöltése adatokkal -> új időpnt feltöltése fül
            SzakAdatok = Backend.GET(url5).Send().As<List<Szakteruletek>>();
            foreach (var a in SzakAdatok)
            {
                if (cbSzakterulet.Items.Contains(a.szak_nev))
                {

                }
                else
                {
                    cbSzakterulet.Items.Add(a.szak_nev);
                }
            }
            cbSzakterulet.SelectedIndex = 0;

            //cbIdopontok feltöltése adatokkal -> új időpnt feltöltése fül
            string[] idopontok = { "17:00", "17:30" };
            foreach (var a in idopontok)
            {
                cbIdopontok.Items.Add(a);
            }
            cbIdopontok.SelectedIndex = 0;

            //datagrid2 feltöltése adatokkal -> aktuális időpont fül
            //aktualisIdopontAdatok = Backend.GET(url2).Send().As<List<Idopontok>>();
            //datagrid2.ItemsSource = aktualisIdopontAdatok;
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

        private void aktualisIdopontok_Click(object sender, RoutedEventArgs e)
        {
            List<Idopontok> aktualisIdopontokLista = new List<Idopontok>();
            DateTime maiDatum = DateTime.Now.Date;
            foreach (var a in idopontAdatok)
            {
                if (maiDatum < a.if_datum)
                {
                    aktualisIdopontokLista.Add(a);
                }
            }
            datagrid.ItemsSource = null;
            datagrid.ItemsSource = aktualisIdopontokLista;
        }
    }
}
