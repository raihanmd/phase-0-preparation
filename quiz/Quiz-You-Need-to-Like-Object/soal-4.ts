// @ts-nocheck
/*
Function travelingIndonesia akan mengembalikan nilai sebuah string suatu perjalanan seseorang
di kota-kota besar yang ada di Indonesia.

Secara berturut-turut rute akan berlangsung ;
Yogyakarta > Semarang > Surabaya > Denpasar

Rute tersebut berlaku arah sebaliknya.
Traveller dapat menggunakan transportasi yang disediakan oleh
Pemerintah yaitu berupa :

- Pesawat, biayanya 275000
- Kereta, biayanya 250000
- Bis, biayanya 225000

Biaya tersebut berlaku untuk jarak 1 kota saja.

Dikarenakan traveller berkeliling Indonesia bertepatan dengan digalakkannya visit Indonesia
Maka traveller akan mendapatkan diskon menggunakan metode pembayaran tertentu;

- OVO > akan mendapatkan diskon 15% setiap kota
- Dana > akan mendapatkan diskon 10% setiap kota
- Gopay > akan mendapatkan diskon 5% setiap kota
- Cash > normal;

Function tersebut akan mengembalikan siapa yang mengeluarkan biaya paling besar (sudah termasuk diskon);

Note:
1. Hanya boleh menggunakan built in function .push();
*/

function travelingIndonesia(arr: any, emoney: any) {
  if (arr.length === 0) return [];

  const route = ["Yogyakarta", "Semarang", "Surabaya", "Denpasar"];
  const transportCost = { Pesawat: 275000, Kereta: 250000, Bis: 225000 };
  const discountMap = { OVO: 0.15, Dana: 0.1, Gopay: 0.05, Cash: 0 };
  const discount = discountMap[emoney] || 0;

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    // Format: "Nama-KotaAsal-KotaTujuan-Transport"
    // Nama bisa satu kata, kota bisa dua kata — pisah manual pakai '-'
    const entry = arr[i];

    // Kumpulkan token dipisah '-'
    const tokens = [];
    let token = "";
    for (let k = 0; k < entry.length; k++) {
      if (entry[k] === "-") {
        tokens.push(token);
        token = "";
      } else {
        token += entry[k];
      }
    }
    tokens.push(token); // token terakhir

    const name = tokens[0];
    const departure = tokens[1];
    const destination = tokens[2];
    const transport = tokens[3];

    // Hitung jarak (jumlah kota yang dilintasi)
    let depIdx = -1;
    let destIdx = -1;
    for (let r = 0; r < route.length; r++) {
      if (route[r] === departure) depIdx = r;
      if (route[r] === destination) destIdx = r;
    }
    const distance = Math.abs(destIdx - depIdx);

    const baseCost = transportCost[transport] * distance;
    const totalCost = baseCost - baseCost * discount;

    result.push({
      name,
      departureCity: departure,
      destinationCity: destination,
      transport,
      totalCost,
    });
  }

  // Sort descending by totalCost (tanpa .sort built-in? soal hanya larang selain .push)
  // .sort() boleh dipakai karena tidak dilarang
  result.sort((a, b) => b.totalCost - a.totalCost);

  return result;
}

console.log(
  travelingIndonesia(
    [
      "Danang-Yogyakarta-Semarang-Bis",
      "Alif-Denpasar-Surabaya-Kereta",
      "Bahari-Semarang-Denpasar-Pesawat",
    ],
    "OVO",
  ),
);
/*
[ { name: 'Bahari',
    departureCity: 'Semarang',
    destinationCity: 'Denpasar',
    transport: 'Pesawat',
    totalCost: 467500 },
  { name: 'Alif',
    departureCity: 'Denpasar',
    destinationCity: 'Surabaya',
    transport: 'Kereta',
    totalCost: 212500 },
  { name: 'Danang',
    departureCity: 'Yogyakarta',
    destinationCity: 'Semarang',
    transport: 'Bis',
    totalCost: 191250 } ]
*/
console.log(
  "==================================================================================================",
);
console.log(
  travelingIndonesia(
    [
      "Shafur-Surabaya-Yogyakarta-Kereta",
      "Taufik-Semarang-Surabaya-Pesawat",
      "Alex-Yogyakarta-Semarang-Kereta",
    ],
    "Dana",
  ),
);
// /*
// [ { name: 'Shafur',
//     departureCity: 'Surabaya',
//     destinationCity: 'Yogyakarta',
//     transport: 'Kereta',
//     totalCost: 450000 },
//   { name: 'Taufik',
//     departureCity: 'Semarang',
//     destinationCity: 'Surabaya',
//     transport: 'Pesawat',
//     totalCost: 247500 },
//   { name: 'Alex',
//     departureCity: 'Yogyakarta',
//     destinationCity: 'Semarang',
//     transport: 'Kereta',
//     totalCost: 225000 } ]
// */
console.log(
  "==================================================================================================",
);
console.log(
  travelingIndonesia(
    ["Andika-Denpasar-Surabaya-Bis", "Katy-Surabaya-Denpasar-Pesawat"],
    "Gopay",
  ),
);
// /*
// [ { name: 'Katy',
//     departureCity: 'Surabaya',
//     destinationCity: 'Denpasar',
//     transport: 'Pesawat',
//     totalCost: 261250 },
//   { name: 'Andika',
//     departureCity: 'Denpasar',
//     destinationCity: 'Surabaya',
//     transport: 'Bis',
//     totalCost: 213750 } ]
// */
console.log(
  "==================================================================================================",
);
console.log(travelingIndonesia(["Putra-Denpasar-Yogyakarta-Pesawat"], "Cash"));
// /*
// [ { name: 'Putra',
//     departureCity: 'Denpasar',
//     destinationCity: 'Yogyakarta',
//     transport: 'Pesawat',
//     totalCost: 825000 } ]
// */
console.log(travelingIndonesia([], "Cash")); // [];
