   M S B A M L   `   `   `  ����L  HsunshineDentalAAF, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:sunshineDentalAAFsunshineDentalAAF  5   	   "    sunshineDentalAAF.MainWindow   5   	   R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:sunshineDentalAAF     5   	     � Title$  
MainWindow��5   	   $	��428��6   $	��860��6)   .��5	      � $��0,0,0,-6q�6   .+�5
   
   �� $��Center=�6   $	��398��62   $��Center=�6?   $	��840��6Z   .@�5      �� $��Összes időpont��6   .��5      � ���	#FFE5E5E5 � RowDefinitions 5      �� 5      $	��29* �6(   �� 5      $
��341* �6(    � ColumnDefinitions 5      �� 5      $	��22* �6+   �� 5      $	��88* �6+   �� 5      $	��27* �6+   �� 5      $	��95* �6+   �� 5      $
��602* �6+   .+�5      &   System.Windows.Controls.DataGrid  -   5          Name$ datagrid��5      $
��Left=�61   $	��178��6L   $��	16,25,0,0q�6Y   $	��Top=�6l   $	��770��6�      AutoGenerateColumns .  $��Segoe UI)�6�   ���	#FFDEDEDE
���   �$��14(�68  $��4��6F  $��2��6Z  $��Normal"�6k  $��1��6  ��6�   �� *
YourData+��5      �� 5       �� EndPoint$ 0.5,1&�62    �� 
StartPoint$ 0.5,0&�6C   .��5   "   �  � Color$ Black��6/   � 5   "   $ White��6/    � Offset$ 1Q�6=   5      	   Columns	 5      0  *System.Windows.Controls.DataGridTextColumn  5       ,  &System.Windows.Controls.DataGridColumn
   Header$
 
Orvos neve��61   1  +System.Windows.Controls.DataGridBoundColumn   Binding 6E   �� *nev+  5!      $
 Szakrendelés��61    6G   �� *
szak_nev+  5"      $
 Dátum��61    6@   �� *
if_datum+ �� StringFormat$ {0:yyyy-MM-dd}��  5#      $
 Időpont��61    6B   �� *
if_idopont+  5$      $

 Név��61    6>   �� *if_nev+  5%      $
 Email��61    6@   �� *
if_email+  5&      $
 Telefon��61    6B   �� *
if_telefon+5(      �� 5)      -   5         ��Name$ 	cbkereses��5)      $
��Left=�62   $��27��6M   $��118,194,0,0q�6Y   $	��Top=�6n   $	��207��6�   $��Bahnschrift)�6�   $��14(�6�   $��1��6�   $��4��6�   $��Normal"�6  �� 5*      -   5         ��Name$ 
osszesGomb��5*      $��Összes foglalás��61   $
��Left=�6K   $��27��6f   $��206,275,0,0q�6r   $	��Top=�6�   $	��119��6�   $��Normal"�6�   $��Segoe UI)�6�   $��4��6�   $��1��6�   �� 5+      -   5        $��Időpont törlése��5+      $
��Left=�67   $��27��6R   $��463,234,0,0q�6^   $	��Top=�6s   $	��113��6�   $��4��6�   $��1��6�   $��Normal"�6�   $��Segoe UI)�6�   �� 5,      -   5        $ regebbiIdopontok��5,      $��Lejárt dátum��67   $
��Left=�6N   $��27��6i   $��463,275,0,0q�6u   $	��Top=�6�   $	��112��6�   $��Normal"�6�   $��4��6�   $��1��6�   $��Segoe UI)�6�   �� 5-      -   5        $ frissitesButton��5-      $��Frissítés��66   $
��Left=�6J   $��27��6e   $��463,194,0,0q�6q   $	��Top=�6�   $	��113��6�   $��Normal"�6�   $��4��6�   $��1��6�   $��Segoe UI)�6�   �� 5.      $
��Left=�6   $��70��67   $��
28,261,0,0q�6C   $	��Top=�6W   $	��297��6o   $��4��6{   $��1��6�   $��1��6�   �� 5/      -   5        $ aktualisIdopontok��5/      $��4��68   $��Aktuális dátum��6H   $
��Left=�6a   $��27��6|   $��339,275,0,0q�6�   $	��Top=�6�   $	��110��6�   $��Normal"�6�   $��1��6�   $��Segoe UI)�6  �� 50      $��4��6   $
��Left=�60   $��65��6K   $��
16,243,0,0q�6W   $	��Top=�6k   $	��279��6�   $;��5/sunshine-dental-high-resolution-logo-transparent.png��6�   $��1��6�   $��1��6�   �� 51      $��2��6   $��3��6,   $
��Left=�6@   $	��100��6[   $��
23,294,0,0q�6h   $	��Top=�6|   $	��100��6�   $��1��6�   �� 52      -   5         ��Name$ 	tbkereses��52      $��2��61   $
��Left=�6E   $��27��6`   $��	9,194,0,0q�6l   $��1��6    �� TextWrapping$
 Wrap=�6�   $�� ��6�   $	��Top=�6�   $	��192��6�   $��3��6�   $��Normal"�6   �� 53      $��Keresés / szűrés:��6   $
��Left=�68   $��27��6S   $��
16,194,0,0q�6_   $��1��6s   $	��Top=�6�   $	��108��6�   $��3��6�    J� RenderTransformOrigin$ 0.519,0.297&�6�   $��1��6�   54      55      �� 56      $
��Left=�6   $��20��61   $��Új időpont felvitel��6=   $��Center=�6Z   $	��110��6u   $��-1,0,0,0q�6�   .��57      � ���	#FFE5E5E5 58      �� 59      $	��23* �6+   �� 5:      $	��92* �6+   �� 5;      $��0* �6+   �� 5<      $
��719* �6+   .+�5>      �� -	   5        $ cbOrvos��5>      $��3��60   $
��Left=�6D   $��23��6_   $��	44,24,0,0q�6k   $	��Top=�6~   $	��145��6�   $��1��6�   6�   �� 5?      -
   5        $ cbSzakterulet��5?      $��Right=�66   $��23��6R   $��
0,24,308,0q�6^   $	��Top=�6r   $	��182��6�   $��3��6�   6�   �� 5@      $��Orvos:��6   $
��Left=�6-   $��26��6H   $��	10,20,0,0q�6T   $	��Top=�6g   $��57��6   $��14(�6�   $ 0.686,0.514&�6�   $��2��6�   �� 5A      $��Szakterület:��6   $
��Left=�63   $��26��6N   $��
144,20,0,0q�6Z   $	��Top=�6n   $	��103��6�   $��14(�6�   $��3��6�   �� 5B      -   5        $ cbIdopontok��5B      $��3��64   $
��Left=�6D   $��23��6_   $��
513,24,0,0q�6k   $	��Top=�6   $	��134��6�   �� 5C      -   5        $ tbnev��5C      $��2��6-   $
��Left=�6=   $��22��6X   $��	51,77,0,0q�6d   $
 Wrap=�6w   $�� ��6�   $	��Top=�6�   $	��174��6�   $��2��6�   �� 5D      -   5        $ tbemail��5D      $��2��6/   $
��Left=�6?   $��22��6Z   $��
51,112,0,0q�6f   $
 Wrap=�6z   $�� ��6�   $	��Top=�6�   $	��174��6�   $��2��6�   �� 5E      -   5        $ 	tbtelefon��5E      $��3��61   $
��Left=�6A   $��22��6\   $��
51,147,0,0q�6h   $
 Wrap=�6|   $�� ��6�   $	��Top=�6�   $	��174��6�   (  "System.Windows.Controls.DatePicker  5F      -   5          Name$ 
datepicker��5F   !   $��3��65   $
��Left=�6E   $��92��6`   $��
249,77,0,0q�6l   $	��Top=�6�   $	��203��6�   �� 5G      -   5        $ btujidopont��5G      $��3��62   $��	Felvitel!��6B   $
��Left=�6V   $��39��6q   $��478,129,0,0q�6}   $	��Top=�6�   $	��169��6�   $ 0.5,0.5&�6�   z�5H      V� 5I      .~�5J   "   �� �� 5K   "    �� AngleY$ 0.202Q�60   �� 5L   "   T� 5M   "    T� Y$
 0.33Q�65   5N      5P      �� 5Q      $��3��6   $��	Időpont:��6,   $
��Left=�6?   $��35��6Z   $��
446,20,0,0q�6f   $	��Top=�6z   $��67��6�   $��14(�6�   �� 5R      $��Páciens név:��6   $
��Left=�63   $��30��6N   $��	10,73,0,0q�6Z   $	��Top=�6m   $	��128��6�   $��14(�6�   $��4��6�   $ 0.523,0.078&�6�   �� 5S      $��Páciens email:��6   $
��Left=�65   $��30��6P   $��
10,108,0,0q�6\   $	��Top=�6p   $��98��6�   $��14(�6�   $��2��6�   �� 5T      $��Páciens telefonszám:��6   $
��Left=�6;   $��30��6V   $��
10,143,0,0q�6b   $	��Top=�6v   $	��142��6�   $��14(�6�   $��4��6�     5U      -   5        $ orvosSzakteruletDg��5U      $��4��6;   $
��Left=�6O   $	��154��6j   $��
12,196,0,0q�6w   $	��Top=�6�   $	��750��6�   5V      5W      5X      5Y      5Z      