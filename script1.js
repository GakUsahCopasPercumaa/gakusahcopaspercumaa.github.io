var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
// var harga = 1;

map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: -6.5057686,
        lng: 107.9997338
    },
    zoom: 9
});
directionsDisplay.setMap(map);

var start = document.getElementById('start');
var searchStart = new google.maps.places.SearchBox(start);
var end = document.getElementById('end');
var searchEnd = new google.maps.places.SearchBox(end);

var detail = document.getElementById('detail');

var pesanStart = document.getElementById('pesan-btn');

function findRoute(harga) {
    var startAddress = start.value;
    var endAddress = end.value;
    var request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: 'DRIVING'
    };
    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            // console.log(result);
            // console.log(result.routes[0].legs[0].distance.text);
            var resetKM = result.routes[0].legs[0].distance.value/1000;
            var km = round(resetKM, 0);
            var opsi = document.querySelector('.tab-opsi.active').innerHTML;
            document.getElementById('option').innerHTML = opsi;
            document.getElementById('distance').innerHTML = km + " km";
            document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;
            document.getElementById('price').innerHTML = angkaToRp(km * parseInt(harga));
      console.log(km);
      console.log(parseInt(harga));
            detail.style.display = 'block';
            document.getElementById('pesan-btn').style.display = 'none';
        } else {
            detail.style.display = 'none';
            alert('Petunjuk arah gagal dimuat, masukkan alamat yang benar!');
        }
    });
}

pesan.addEventListener("click", function (event) {
    if (start.value.trim() != "" && end.value.trim() != "") {
        event.preventDefault();
        var harga = document.querySelector(".tab-opsi.active").getAttribute("data");
        findRoute(harga);
    }
});
var showDriver = document.getElementById("driver");      
showDriver.addEventListener("click", function (event) {
   event.preventDefault();
  var cekDriver = document.querySelector(".tab-opsi.active").getAttribute("name");
  if (cekDriver == "gocar"){
   document.querySelector("#gocar.pilih-driver").classList.toggle("active");
  } else if (cekDriver == "goride"){
    document.querySelector("#goride.pilih-driver").classList.toggle("active");
  } else if (cekDriver == "delivery"){
    document.querySelector("#delivery.pilih-driver").classList.toggle("active");
  }
});      
var nama = document.getElementById('nama');
var nomor = document.getElementById('nomor');      
var kirim = document.getElementById('kirim-wa');      
kirim.addEventListener("click", function (event) {
    if (nama.value != "" && nomor.value != "") {
        event.preventDefault();
        var asal = document.getElementById('start').value;
        var tujuan = document.getElementById('end').value;
        var catatan = document.getElementById('catatan').value;
        var driver = document.getElementById('driver').value;
        var jarak = document.getElementById('distance').innerHTML;
        var waktu = document.getElementById('duration').innerHTML;
        var harga = document.getElementById('price').innerHTML;
        var opsi = document.getElementById('option').innerHTML;
        var wa = "";
wa +='Halo saya ingin pesan secara Offline kak %0A' +
    '=============================%0A%0A'

wa +='📜 DATA PEMBELI %0A' +
    '=============================%0A'
            wa += "Nama Lengkap : " + nama.value + "%0A";
            wa += "No WhatsApp    : " + nomor.value + "%0A%0A";

wa +='📍 LOKASI ASAL DAN TUJUAN %0A' +
    '=============================%0A'

            wa += "Lokasi Asal      : " + asal + "%0A";
            wa += "Lokasi Tujuan : " + tujuan + "%0A%0A";

wa +='🔖JENIS LAYANAN %0A' +
    '=============================%0A'
            wa += "Jenis Layanan  : " + opsi + "%0A";
            wa += "Nama Driver      : " + driver + "%0A%0A";

wa +='📌JARAK TEMPUH DAN HARGA %0A' +
    '=============================%0A'

            wa += "Jarak                  : " + jarak + "%0A";
            wa += "Waktu Tempuh : " + waktu + "%0A";
            wa += "Harga                 : " + harga;
      if (catatan != ""){
          wa += "%0A=============================%0A";
          wa += "Catatan Atau Pesanan : " + catatan + "%0A";
          wa += "=============================";
      }
       var walink =
       "https://api.whatsapp.com/send";
       var nomorHP = document.getElementById("number-driver").value;
       var whatsapp = walink + '?phone=' + nomorHP + '&text=' + wa;
       window.open(whatsapp,'_blank');
    }
});
var tabButton = document.querySelectorAll('.tab-opsi');
for (var i = 0; i < tabButton.length; i++) {
   tabButton[i].addEventListener( "click", function() {
      document.querySelector('.tab-opsi.active').classList.remove('active');
      this.classList.toggle("active");
      detail.style.display = 'none';
      var cekDriver = document.querySelector(".tab-opsi.active").getAttribute("name");
     if (cekDriver == "gocar"){
       document.getElementById("driver").value = "Pilih Driver (GoCar)";
     } else if (cekDriver == "goride"){
       document.getElementById("driver").value = "Pilih Driver (GoRide)";
     } else if (cekDriver == "delivery"){
       document.getElementById("driver").value = "Pilih Driver (Delivery)";
     }
   });
} 
var optionDriver = document.querySelectorAll('#goride .driver-action li');
for (var i = 0; i < optionDriver.length; i++) {
   optionDriver[i].addEventListener( "click", function() {
      document.querySelector('#goride .driver-action li.active').classList.remove('active');
      this.classList.toggle("active");
      document.querySelector("#goride.pilih-driver").classList.toggle("active");
      var select = document.querySelector('#goride .driver-action li.active .name').innerHTML;
      var number = document.querySelector('#goride .driver-action li.active').getAttribute("data-number");
      document.getElementById("driver").value = select;
      document.getElementById("number-driver").value = number;
   });
}
var optionDriver = document.querySelectorAll('#gocar .driver-action li');
for (var i = 0; i < optionDriver.length; i++) {
   optionDriver[i].addEventListener( "click", function() {
      document.querySelector('#gocar .driver-action li.active').classList.remove('active');
      this.classList.toggle("active");
      document.querySelector("#gocar.pilih-driver").classList.toggle("active");
      var select = document.querySelector('#gocar .driver-action li.active .name').innerHTML;
      var number = document.querySelector('#gocar .driver-action li.active').getAttribute("data-number");                                  
      document.getElementById("driver").value = select;
      document.getElementById("number-driver").value = number;                                  
   });
} 
var optionDriver = document.querySelectorAll('#delivery .driver-action li');
for (var i = 0; i < optionDriver.length; i++) {
   optionDriver[i].addEventListener( "click", function() {
      document.querySelector('#delivery .driver-action li.active').classList.remove('active');
      this.classList.toggle("active");
      document.querySelector("#delivery.pilih-driver").classList.toggle("active");
      var select = document.querySelector('#delivery .driver-action li.active .name').innerHTML;
      var number = document.querySelector('#delivery .driver-action li.active').getAttribute("data-number");
      document.getElementById("driver").value = select;
      document.getElementById("number-driver").value = number;
   });
}          
//Format Rupiah
  function angkaToRp(angka) {
    var rupiah = '';    
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
              return 'Rp'+rupiah.split('',rupiah.length-1).reverse().join('');
  };
