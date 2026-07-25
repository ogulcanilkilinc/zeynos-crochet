// Zeyno's Crochet - Database & Translations
const PRODUCTS = [
  {
    "id": "prod-001",
    "slug": "bebek-battaniyesi",
    "name": {
      "tr": "Bebek Battaniyesi",
      "en": "Baby Blanket"
    },
    "description": {
      "tr": "Yumuşacık pamuklu iplikle örülmüş, bebeğinizi sıcacık saracak el yapımı battaniye. Pastel tonlarında, hassas ciltlere uygun.",
      "en": "A handmade blanket knitted with soft cotton yarn to keep your baby warm and cozy. In pastel tones, suitable for sensitive skin."
    },
    "price": 650,
    "currency": "TL",
    "category": "knitting",
    "image": "public/images/products/product-1.jpg",
    "inStock": true,
    "stockCount": 5,
    "materials": {
      "tr": "%100 Organik Pamuk İplik",
      "en": "100% Organic Cotton Yarn"
    },
    "dimensions": {
      "tr": "80 cm x 100 cm",
      "en": "80 cm x 100 cm"
    },
    "featured": true
  },
  {
    "id": "prod-002",
    "slug": "amigurumi-ayicik",
    "name": {
      "tr": "Amigurumi Ayıcık",
      "en": "Amigurumi Teddy Bear"
    },
    "description": {
      "tr": "Sevimli, el yapımı amigurumi ayıcık. Güvenli dolgu malzemesi ve anti-alerjik iplikle hazırlanmıştır. Çocuklar için mükemmel bir hediye.",
      "en": "Adorable handmade amigurumi teddy bear. Made with safe filling material and hypoallergenic yarn. A perfect gift for children."
    },
    "price": 350,
    "currency": "TL",
    "category": "amigurumi",
    "image": "public/images/products/product-2.jpg",
    "inStock": true,
    "stockCount": 8,
    "materials": {
      "tr": "Anti-alerjik Akrilik İplik, Silikon Elyaf Dolgu",
      "en": "Hypoallergenic Acrylic Yarn, Silicone Fiber Filling"
    },
    "dimensions": {
      "tr": "25 cm boyunda",
      "en": "25 cm tall"
    },
    "featured": true
  },
  {
    "id": "prod-003",
    "slug": "orgu-bere",
    "name": {
      "tr": "Örgü Bere",
      "en": "Knitted Beanie"
    },
    "description": {
      "tr": "Sıcacık yün iplikle el örgüsü bere. Kış aylarında şık ve sıcak tutacak, farklı renk seçenekleriyle.",
      "en": "A warm hand-knitted beanie made with wool yarn. Stylish and cozy for winter days, available in various colors."
    },
    "price": 180,
    "currency": "TL",
    "category": "knitting",
    "image": "public/images/products/product-3.jpg",
    "inStock": true,
    "stockCount": 12,
    "materials": {
      "tr": "%50 Yün, %50 Akrilik Karışım İplik",
      "en": "50% Wool, 50% Acrylic Blend Yarn"
    },
    "dimensions": {
      "tr": "Yetişkin Standart Beden",
      "en": "Adult Standard Size"
    },
    "featured": false
  },
  {
    "id": "prod-004",
    "slug": "tig-isi-masa-ortusu",
    "name": {
      "tr": "Tığ İşi Masa Örtüsü",
      "en": "Crochet Tablecloth"
    },
    "description": {
      "tr": "Zarif dantel desenli tığ işi masa örtüsü. Evinize klasik bir dokunuş katacak, özenle işlenmiş detayleriyle göz kamaştırıcı.",
      "en": "An elegant lace-patterned crochet tablecloth. Adds a classic touch to your home with its meticulously crafted details."
    },
    "price": 800,
    "currency": "TL",
    "category": "crochet",
    "image": "public/images/products/product-4.jpg",
    "inStock": true,
    "stockCount": 2,
    "materials": {
      "tr": "%100 Merserize Pamuk İplik",
      "en": "100% Mercerized Cotton Yarn"
    },
    "dimensions": {
      "tr": "150 cm x 200 cm",
      "en": "150 cm x 200 cm"
    },
    "featured": true
  },
  {
    "id": "prod-005",
    "slug": "amigurumi-tavsan",
    "name": {
      "tr": "Amigurumi Tavşan",
      "en": "Amigurumi Bunny"
    },
    "description": {
      "tr": "Uzun kulaklı, sevimli amigurumi tavşan. Bebek odası dekorasyonu veya çocuklar için güvenli bir oyun arkadaşı.",
      "en": "A cute amigurumi bunny with long ears. Perfect as nursery decoration or a safe playmate for children."
    },
    "price": 300,
    "currency": "TL",
    "category": "amigurumi",
    "image": "public/images/products/product-5.jpg",
    "inStock": true,
    "stockCount": 6,
    "materials": {
      "tr": "Anti-alerjik Pamuk İplik, Güvenli Dolgu",
      "en": "Hypoallergenic Cotton Yarn, Safe Filling"
    },
    "dimensions": {
      "tr": "30 cm boyunda",
      "en": "30 cm tall"
    },
    "featured": true
  },
  {
    "id": "prod-006",
    "slug": "orgu-atki-bere-set",
    "name": {
      "tr": "Örgü Atkı-Bere Set",
      "en": "Knitted Scarf-Beanie Set"
    },
    "description": {
      "tr": "Uyumlu renklerde el örgüsü atkı ve bere seti. Kışın en şık aksesuar kombinasyonu, hediye için de ideal.",
      "en": "A hand-knitted scarf and beanie set in matching colors. The most stylish winter accessory combination, also ideal as a gift."
    },
    "price": 400,
    "currency": "TL",
    "category": "accessory",
    "image": "public/images/products/product-6.jpg",
    "inStock": true,
    "stockCount": 4,
    "materials": {
      "tr": "Yumuşak Akrilik-Yün Karışım İplik",
      "en": "Soft Acrylic-Wool Blend Yarn"
    },
    "dimensions": {
      "tr": "Atkı: 180 cm x 25 cm, Bere: Standart Beden",
      "en": "Scarf: 180 cm x 25 cm, Beanie: Standard Size"
    },
    "featured": false
  },
  {
    "id": "prod-007",
    "slug": "tig-isi-canta",
    "name": {
      "tr": "Tığ İşi Çanta",
      "en": "Crochet Bag"
    },
    "description": {
      "tr": "Şık ve dayanıklı tığ işi el çantası. Günlük kullanım için ideal boyutta, doğal renk tonlarında.",
      "en": "A stylish and durable crochet handbag. Perfectly sized for daily use, in natural color tones."
    },
    "price": 450,
    "currency": "TL",
    "category": "crochet",
    "image": "public/images/products/product-7.jpg",
    "inStock": true,
    "stockCount": 3,
    "materials": {
      "tr": "Makrome İplik, Ahşap Kulp",
      "en": "Macramé Cord, Wooden Handle"
    },
    "dimensions": {
      "tr": "30 cm x 25 cm x 12 cm",
      "en": "30 cm x 25 cm x 12 cm"
    },
    "featured": false
  },
  {
    "id": "prod-008",
    "slug": "orgu-bebek-yelegi",
    "name": {
      "tr": "Örgü Bebek Yeleği",
      "en": "Knitted Baby Vest"
    },
    "description": {
      "tr": "Minik bebekler için yumuşacık el örgüsü yelek. Nefes alan doğal ipliklerle örülmüş, düğme detaylı.",
      "en": "A super soft hand-knitted vest for little babies. Made with breathable natural yarns, with button details."
    },
    "price": 250,
    "currency": "TL",
    "category": "knitting",
    "image": "public/images/products/product-8.jpg",
    "inStock": false,
    "stockCount": 0,
    "materials": {
      "tr": "%100 Bebek Pamuğu",
      "en": "100% Baby Cotton"
    },
    "dimensions": {
      "tr": "0-6 Ay Beden",
      "en": "0-6 Months Size"
    },
    "featured": false
  }
];

const PORTFOLIO = [
  {
    "id": "port-001",
    "title": {
      "tr": "Pastel Rüyalar Bebek Battaniyesi",
      "en": "Pastel Dreams Baby Blanket"
    },
    "description": {
      "tr": "Yeni doğan bir bebek için özel sipariş olarak hazırlanan, pastel pembe ve beyaz tonlarında yumuşacık battaniye.",
      "en": "A soft blanket in pastel pink and white tones, custom-made for a newborn baby."
    },
    "category": "knitting",
    "image": "public/images/portfolio/portfolio-1.jpg",
    "completedAt": "2024-01-20",
    "techniques": {
      "tr": ["Şiş Örgü", "Ajur Deseni", "Fıstık Örgü"],
      "en": ["Needle Knitting", "Lace Pattern", "Bobble Stitch"]
    }
  },
  {
    "id": "port-002",
    "title": {
      "tr": "Amigurumi Hayvanat Bahçesi Seti",
      "en": "Amigurumi Zoo Set"
    },
    "description": {
      "tr": "Fil, zürafa, aslan ve zebra içeren dört parçalık amigurumi hayvan seti. Bir çocuk odasına özel tasarlandı.",
      "en": "A four-piece amigurumi animal set featuring elephant, giraffe, lion, and zebra. Specially designed for a children's room."
    },
    "category": "amigurumi",
    "image": "public/images/portfolio/portfolio-2.jpg",
    "completedAt": "2024-02-14",
    "techniques": {
      "tr": ["Tığ İşi", "Amigurumi Tekniği", "Nakış Detay"],
      "en": ["Crochet", "Amigurumi Technique", "Embroidery Detail"]
    }
  },
  {
    "id": "port-003",
    "title": {
      "tr": "Vintage Dantel Sehpa Örtüsü",
      "en": "Vintage Lace Doily"
    },
    "description": {
      "tr": "Klasik Türk dantel geleneğinden ilham alınarak tasarlanan zarif sehpa örtüsü. İnce tığ işi detaylarıyla göz alıcı.",
      "en": "An elegant doily inspired by traditional Turkish lace art. Stunning with its delicate crochet details."
    },
    "category": "crochet",
    "image": "public/images/portfolio/portfolio-3.jpg",
    "completedAt": "2024-03-08",
    "techniques": {
      "tr": ["İnce Tığ İşi", "Dantel Tekniği", "Yıldız Deseni"],
      "en": ["Fine Crochet", "Lace Technique", "Star Pattern"]
    }
  },
  {
    "id": "port-004",
    "title": {
      "tr": "Kış Koleksiyonu Atkı-Bere Seti",
      "en": "Winter Collection Scarf-Beanie Set"
    },
    "description": {
      "tr": "Bordo ve krem tonlarında, saç örgüsü deseniyle örülmüş şık kışlık set. Hediye olarak hazırlandı.",
      "en": "A stylish winter set knitted with cable pattern in burgundy and cream tones. Prepared as a gift."
    },
    "category": "accessory",
    "image": "public/images/portfolio/portfolio-4.jpg",
    "completedAt": "2024-03-22",
    "techniques": {
      "tr": ["Şiş Örgü", "Saç Örgüsü Deseni", "Lastik Örgü"],
      "en": ["Needle Knitting", "Cable Pattern", "Ribbed Knitting"]
    }
  },
  {
    "id": "port-005",
    "title": {
      "tr": "Makrome Duvar Süsü",
      "en": "Macramé Wall Hanging"
    },
    "description": {
      "tr": "Bohem tarzında, doğal pamuk iple hazırlanmış dekoratif duvar süsü. Salon duvarına özel sipariş.",
      "en": "A bohemian-style decorative wall hanging made with natural cotton cord. Custom order for a living room wall."
    },
    "category": "accessory",
    "image": "public/images/portfolio/portfolio-5.jpg",
    "completedAt": "2024-04-05",
    "techniques": {
      "tr": ["Makrome", "Düğüm Teknikleri", "Saçak Detayı"],
      "en": ["Macramé", "Knotting Techniques", "Fringe Detail"]
    }
  },
  {
    "id": "port-006",
    "title": {
      "tr": "Amigurumi Unicorn",
      "en": "Amigurumi Unicorn"
    },
    "description": {
      "tr": "Gökkuşağı yeleli, pırıltılı boynuzlu büyülü amigurumi unicorn. Küçük bir kızın doğum günü hediyesi olarak tasarlandı.",
      "en": "A magical amigurumi unicorn with a rainbow mane and sparkly horn. Designed as a birthday gift for a little girl."
    },
    "category": "amigurumi",
    "image": "public/images/portfolio/portfolio-6.jpg",
    "completedAt": "2024-04-18",
    "techniques": {
      "tr": ["Tığ İşi", "Amigurumi", "Renk Geçişi"],
      "en": ["Crochet", "Amigurumi", "Color Gradient"]
    }
  },
  {
    "id": "port-007",
    "title": {
      "tr": "Tığ İşi Plaj Çantası",
      "en": "Crochet Beach Bag"
    },
    "description": {
      "tr": "Yaz sezonu için hazırlanmış geniş ve dayanıklı tığ işi plaj çantası. Jüt ip ve renkli detaylarla.",
      "en": "A spacious and durable crochet beach bag made for the summer season. With jute cord and colorful details."
    },
    "category": "crochet",
    "image": "public/images/portfolio/portfolio-7.jpg",
    "completedAt": "2024-05-10",
    "techniques": {
      "tr": ["Tığ İşi", "Jüt İp Çalışması", "Deri Sap Ekleme"],
      "en": ["Crochet", "Jute Cord Work", "Leather Strap Attachment"]
    }
  },
  {
    "id": "port-008",
    "title": {
      "tr": "Örgü Patchwork Koltuk Şalı",
      "en": "Knitted Patchwork Throw Blanket"
    },
    "description": {
      "tr": "Farklı renk ve desen karelerinden oluşan patchwork tarzında koltuk şalı. Sıcak sonbahar akşamları için ideal.",
      "en": "A patchwork-style throw blanket made from squares of different colors and patterns. Ideal for warm autumn evenings."
    },
    "category": "knitting",
    "image": "public/images/portfolio/portfolio-8.jpg",
    "completedAt": "2024-05-28",
    "techniques": {
      "tr": ["Şiş Örgü", "Patchwork", "Motif Birleştirme"],
      "en": ["Needle Knitting", "Patchwork", "Motif Joining"]
    }
  },
  {
    "id": "port-009",
    "title": {
      "tr": "Amigurumi Çiçek Buketi",
      "en": "Amigurumi Flower Bouquet"
    },
    "description": {
      "tr": "Solmayan çiçeklerden oluşan el yapımı amigurumi buket. Gül, papatya ve lavanta ile dekoratif bir hediye.",
      "en": "A handmade amigurumi bouquet of everlasting flowers. A decorative gift featuring roses, daisies, and lavender."
    },
    "category": "amigurumi",
    "image": "public/images/portfolio/portfolio-9.jpg",
    "completedAt": "2024-06-12",
    "techniques": {
      "tr": ["Tığ İşi", "Amigurumi", "Tel Çerçeve"],
      "en": ["Crochet", "Amigurumi", "Wire Frame"]
    }
  },
  {
    "id": "port-010",
    "title": {
      "tr": "Tığ İşi Bardak Altlığı Seti",
      "en": "Crochet Coaster Set"
    },
    "description": {
      "tr": "Altı adet farklı renkte, geometrik desenli tığ işi bardak altlığı seti. Mutfak ve salon için şık bir dokunuş.",
      "en": "A set of six crochet coasters in different colors with geometric patterns. A stylish touch for kitchen and living room."
    },
    "category": "crochet",
    "image": "public/images/portfolio/portfolio-10.jpg",
    "completedAt": "2024-06-25",
    "techniques": {
      "tr": ["Tığ İşi", "Geometrik Desen", "Renk Değiştirme"],
      "en": ["Crochet", "Geometric Pattern", "Color Changing"]
    }
  }
];

const TESTIMONIALS = [
  {
    "id": "test-001",
    "name": "Elif Yılmaz",
    "rating": 5,
    "comment": {
      "tr": "Kızım için sipariş ettiğim amigurumi ayıcık harika olmuş! Zeynep Hanım'ın el işçiliği gerçekten muhteşem. Kızım elinden bırakmıyor, çok teşekkür ederim. 🧸",
      "en": "The amigurumi teddy bear I ordered for my daughter turned out amazing! Zeynep's craftsmanship is truly magnificent. My daughter won't let go of it, thank you so much! 🧸"
    },
    "product": "Amigurumi Ayıcık",
    "date": "2024-03-15"
  },
  {
    "id": "test-002",
    "name": "Ahmet Demir",
    "rating": 5,
    "comment": {
      "tr": "Eşime hediye olarak aldığım atkı-bere seti çok kaliteli ve şık. Renk uyumu mükemmel. Zeynep Hanım çok titiz çalışıyor, kesinlikle tavsiye ederim.",
      "en": "The scarf-beanie set I bought as a gift for my wife is very high quality and stylish. The color coordination is perfect. Zeynep works very meticulously, I absolutely recommend her."
    },
    "product": "Örgü Atkı-Bere Set",
    "date": "2024-02-28"
  },
  {
    "id": "test-003",
    "name": "Ayşe Kaya",
    "rating": 5,
    "comment": {
      "tr": "Bebek battaniyesi pamuk gibi yumuşacık. Yıkandıktan sonra bile dokusu bozulmadı. Paketleme çok özenliydi. 🌸",
      "en": "The baby blanket is soft as cotton. Its texture didn't change even after washing. The packaging was very neat. 🌸"
    },
    "product": "Bebek Battaniyesi",
    "date": "2024-03-01"
  },
  {
    "id": "test-004",
    "name": "Selin Yıldız",
    "rating": 4,
    "comment": {
      "tr": "Tığ işi çanta tam yazlık kombinlerime göre. Ahşap kulp detayı çok hava katmış. Hızlı kargo için teşekkürler.",
      "en": "The crochet bag is perfect for my summer outfits. The wooden handle detail adds so much style. Thanks for the fast shipping."
    },
    "product": "Tığ İşi Çanta",
    "date": "2024-03-12"
  }
];

const ORDERS = [
  {
    "id": "order-001",
    "orderNumber": "ZC-2024-001",
    "customerName": "Elif Y.",
    "product": "Amigurumi Ayıcık",
    "status": "shipped",
    "statusHistory": [
      {
        "status": "received",
        "date": "2024-06-10T10:30:00Z",
        "note": {
          "tr": "Siparişiniz alındı, teşekkür ederiz!",
          "en": "Your order has been received, thank you!"
        }
      },
      {
        "status": "preparing",
        "date": "2024-06-11T09:00:00Z",
        "note": {
          "tr": "Ürününüz özenle hazırlanmaya başlandı. 🧶",
          "en": "Your product has started being carefully crafted. 🧶"
        }
      },
      {
        "status": "completed",
        "date": "2024-06-15T14:00:00Z",
        "note": {
          "tr": "Ürününüz tamamlandı ve paketlendi.",
          "en": "Your product has been completed and packaged."
        }
      },
      {
        "status": "shipped",
        "date": "2024-06-16T11:00:00Z",
        "note": {
          "tr": "Kargoya verildi! Takip numaranızla kargonuzu izleyebilirsiniz.",
          "en": "Shipped! You can track your package with the tracking number."
        }
      }
    ],
    "createdAt": "2024-06-10T10:30:00Z",
    "estimatedDelivery": "2024-06-19",
    "trackingNumber": "TR1234567890"
  },
  {
    "id": "order-002",
    "orderNumber": "ZC-2024-002",
    "customerName": "Mehmet A.",
    "product": "Bebek Battaniyesi",
    "status": "preparing",
    "statusHistory": [
      {
        "status": "received",
        "date": "2024-06-20T15:00:00Z",
        "note": {
          "tr": "Siparişiniz alındı, teşekkür ederiz!",
          "en": "Your order has been received, thank you!"
        }
      },
      {
        "status": "preparing",
        "date": "2024-06-21T10:00:00Z",
        "note": {
          "tr": "Battaniyeniz özel olarak örülmeye başlandı. Tahmini 5-7 iş günü içinde hazır olacaktır.",
          "en": "Your blanket has started being specially knitted. Estimated to be ready within 5-7 business days."
        }
      }
    ],
    "createdAt": "2024-06-20T15:00:00Z",
    "estimatedDelivery": "2024-06-30"
  },
  {
    "id": "order-003",
    "orderNumber": "ZC-2024-003",
    "customerName": "Selin A.",
    "product": "Tığ İşi Çanta",
    "status": "received",
    "statusHistory": [
      {
        "status": "received",
        "date": "2024-06-28T09:15:00Z",
        "note": {
          "tr": "Siparişiniz başarıyla alındı. En kısa sürede hazırlanmaya başlanacaktır.",
          "en": "Your order has been successfully received. It will start being prepared as soon as possible."
        }
      }
    ],
    "createdAt": "2024-06-28T09:15:00Z",
    "estimatedDelivery": "2024-07-08"
  }
];

const TRANSLATIONS = {
  "tr": {
    "nav": {
      "home": "Ana Sayfa",
      "portfolio": "Portfolyo",
      "products": "Ürünler",
      "about": "Hakkımda",
      "contact": "İletişim",
      "testimonials": "Müşteri Yorumları",
      "orderTracking": "Sipariş Takibi",
      "customOrder": "Özel Sipariş",
      "wishlist": "❤️ Favorilerim",
      "ordersDropdown": "Sipariş",
      "faq": "SSS"
    },
    "hero": {
      "title": "El Emeği, Göz Nuru",
      "subtitle": "Zeynep'in elleriyle, sevgiyle örülen el yapımı örgü ve tığ işi ürünler. Her ilmek bir hikâye, her ürün bir sanat eseri.",
      "cta": "Ürünleri Keşfet",
      "ctaSecondary": "Instagram DM ile İletişim"
    },
    "stats": {
      "handmade": "El Emeği & Özen",
      "products": "Zengin Ürün Çeşidi",
      "yearsExperience": "Yıllık Örgü Deneyimi",
      "customOrder": "Kişiye Özel Tasarım"
    },
    "portfolio": {
      "title": "Portfolyo",
      "subtitle": "Şimdiye kadar tamamladığım özel çalışmalardan bir seçki. Her biri özenle ve sevgiyle hazırlandı.",
      "filterAll": "Tümü",
      "filterKnitting": "Örgü",
      "filterCrochet": "Tığ İşi",
      "filterAmigurumi": "Amigurumi",
      "filterAccessory": "Aksesuar"
    },
    "products": {
      "title": "Ürünler",
      "subtitle": "El yapımı, özenle hazırlanmış örgü ve tığ işi ürünlerimizi keşfedin.",
      "featuredTitle": "Öne Çıkan Ürünler",
      "featuredSubtitle": "En beğenilen el yapımı ürünlerimiz",
      "filterAll": "Tümü",
      "filterKnitting": "Örgü",
      "filterCrochet": "Tığ İşi",
      "filterAmigurumi": "Amigurumi",
      "filterAccessory": "Aksesuar",
      "filterWishlist": "❤️ Favorilerim",
      "inStock": "Stokta",
      "lowStock": "Son Birkaç Ürün",
      "outOfStock": "Tükendi",
      "orderViaWhatsApp": "Sipariş Ver",
      "viewDetails": "Detayları Gör",
      "price": "Fiyat",
      "materials": "Malzemeler",
      "dimensions": "Boyutlar",
      "relatedProducts": "Benzer Ürünler"
    },
    "about": {
      "title": "Hakkımda",
      "heading": "İlmeğin Sanata Dönüştüğü Yer",
      "subtitle": "Zeyno's Crochet, 15 yılı aşkın örgü tecrübemizi modern estetik anlayışıyla buluşturan butik bir el emeği atölyesidir.<br><br>Bizim için örgü; sadece bir iplik ve tığ birleşimi değil, tamamen kişiye özel kılınabilen yaşayan bir sanattır. Yılların kazandırdığı teknik altyapı ve desen uzmanlığımız sayesinde, <strong>beğendiğiniz herhangi bir örneği, istediğiniz renk, iplik türü ve ölçülerde birebir kalitede hayata geçiriyoruz.</strong><br><br>Fabrikasyon üretimin tekdüzeliğinden uzak, sağlığa zararsız %100 organik ve anti-alerjik malzemelerle hazırladığımız her ürün; hayatınıza sıcak bir dokunuş ve sevdiklerinize ömür boyu saklanacak anlamlı bir anı bırakmak için özenle dokunmaktadır."
    },
    "contact": {
      "title": "İletişim",
      "subtitle": "Özel sipariş, fiyat bilgisi veya herhangi bir sorunuz için benimle iletişime geçebilirsiniz.",
      "nameLabel": "Adınız Soyadınız",
      "emailLabel": "E-posta Adresiniz",
      "phoneLabel": "Telefon Numaranız",
      "messageLabel": "Mesajınız",
      "sendButton": "Mesaj Gönder",
      "successMessage": "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım. 🧶",
      "errorMessage": "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
    },
    "testimonials": {
      "title": "Müşteri Yorumları",
      "subtitle": "Mutlu müşterilerimizin Zeyno's Crochet ürünleri hakkındaki düşünceleri."
    },
    "orderTracking": {
      "title": "Sipariş Takibi",
      "subtitle": "Sipariş numaranızı girerek siparişinizin durumunu takip edebilirsiniz.",
      "orderNumberLabel": "Sipariş Numarası",
      "searchButton": "Sipariş Sorgula",
      "statuses": {
        "received": "Sipariş Alındı",
        "preparing": "Hazırlanıyor",
        "completed": "Tamamlandı",
        "shipped": "Kargoya Verildi"
      },
      "estimatedDelivery": "Tahmini Teslimat",
      "trackingNumber": "Kargo Takip Numarası",
      "noOrderFound": "Bu sipariş numarasına ait bir kayıt bulunamadı. Lütfen sipariş numaranızı kontrol edip tekrar deneyin."
    },
    "footer": {
      "brand": "Zeyno's Crochet",
      "tagline": "El emeği, göz nuru ürünlerle hayatınıza sıcaklık katıyoruz. Her ilmek sevgiyle örülür.",
      "rights": "Tüm hakları saklıdır.",
      "madeWithLove": "Sevgiyle yapıldı 🧶"
    },
    "common": {
      "loading": "Yükleniyor...",
      "error": "Bir hata oluştu",
      "back": "Geri",
      "next": "İleri",
      "previous": "Önceki",
      "seeAll": "Tümünü Gör",
      "close": "Kapat",
      "search": "Ara"
    },
    "wishlist": {
      "title": "Favori Ürünlerim",
      "empty": "Henüz favori ürününüz bulunmuyor. Beğendiğiniz ürünleri kalp simgesine tıklayarak buraya ekleyebilirsiniz. 🧶",
      "orderAll": "Favorileri Instagram DM'den Sipariş Et",
      "copied": "Favorileriniz kopyalandı! 📋 Instagram DM'den gönderebilirsiniz."
    },
    "testimonialForm": {
      "addTitle": "Bir Yorum Bırakın",
      "addSubtitle": "Deneyiminizi paylaşarak bize destek olabilirsiniz.",
      "nameLabel": "Adınız Soyadınız",
      "productLabel": "Satın Aldığınız Ürün",
      "ratingLabel": "Puanınız",
      "commentLabel": "Yorumunuz",
      "submitBtn": "Yorumu Gönder",
      "successMsg": "Değerlendirmeniz için çok teşekkür ederiz! Yorumunuz listeye eklendi. 🌸"
    },
    "care": {
      "title": "Örgü Ürün Bakım Kılavuzu",
      "subtitle": "El emeği örgülerinizi uzun yıllar ilk günkü gibi korumanız için bakım önerileri",
      "washTitle": "Nasıl Yıkanmalı?",
      "washText": "Ürünlerinizi elde, ılık suda (maksimum 30°C) ve bebek şampuanı veya hassas deterjan kullanarak yıkayınız. Çamaşır makinesinde yıkamayınız.",
      "dryTitle": "Nasıl Kurutulmalı?",
      "dryText": "Yıkama sonrası ürünü sıkmayınız veya asarak kurutmayınız. Havlu üzerine sererek, gölgede, düz bir alanda kendi kendine kurumasını sağlayınız.",
      "ironTitle": "Ütü Yapılır mı?",
      "ironText": "Örgü ürünlerinizi doğrudan ütülemeyiniz. Gerekirse ütüyü ürüne değdirmeden, uzaktan sadece buhar vererek kırışıklıkları giderebilirsiniz."
    },
    "faq": {
      "title": "Sıkça Sorulan Sorular",
      "subtitle": "Sipariş süreci ve ürünlerimiz hakkında merak edilenler",
      "q1": "Özel ölçü veya renk siparişi alıyor musunuz?",
      "a1": "Evet! \"Özel Sipariş\" sihirbazımızı kullanarak ürün türü, iplik çeşidi ve ek özellikleri seçip kendi tasarımınızı oluşturabilir ve bize Instagram DM üzerinden iletebilirsiniz.",
      "q2": "Kargo teslimat süresi nedir?",
      "a2": "Stokta hazır olan ürünlerimiz 2-3 iş günü içinde kargolanır. Özel tasarım siparişlerin yapım süresi ise modele göre değişkenlik göstermektedir (genellikle 7-14 gün).",
      "q3": "Hangi kargo firmaları ile çalışıyorsunuz?",
      "a3": "Anlaşmalı olduğumuz Yurtiçi Kargo, MNG Kargo ve PTT Kargo ile gönderim sağlamaktayız. Siparişiniz kargolandığında takip numarası sisteme girilir.",
      "q4": "Kullanılan iplikler bebekler için güvenli mi?",
      "a4": "Bebek battaniyesi ve amigurumi (örgü oyuncak) modellerimizde anti-alerjik, tüylenme yapmayan ve OEKO-TEX sertifikalı organik pamuklu iplikler tercih etmekteyiz."
    },
    "sort": {
      "default": "Sıralama Seçin",
      "priceAsc": "Fiyat: Düşükten Yükseğe",
      "priceDesc": "Fiyat: Yüksekten Düşüğe",
      "nameAsc": "İsim: A - Z"
    },
    "yarnLib": {
      "title": "İpliklerimiz & Renk Kartelası",
      "subtitle": "Tasarımlarınızda kullanabileceğiniz sağlıklı ve anti-alerjik yumak seçenekleri"
    },
    "share": {
      "btnText": "Paylaş",
      "copied": "Bağlantı kopyalandı! 📋 Arkadaşlarınızla paylaşabilirsiniz."
    }
  },
  "en": {
    "nav": {
      "home": "Home",
      "portfolio": "Portfolio",
      "products": "Products",
      "about": "About",
      "contact": "Contact",
      "testimonials": "Testimonials",
      "orderTracking": "Order Tracking",
      "customOrder": "Custom Order",
      "wishlist": "❤️ Favorites",
      "ordersDropdown": "Orders",
      "faq": "FAQ"
    },
    "hero": {
      "title": "Handcrafted with Love",
      "subtitle": "Handmade knitting and crochet products, lovingly crafted by Zeynep. Every stitch tells a story, every piece is a work of art.",
      "cta": "Explore Products",
      "ctaSecondary": "Contact via Instagram"
    },
    "stats": {
      "handmade": "Handmade with Love",
      "products": "Rich Product Variety",
      "yearsExperience": "Years Knitting Experience",
      "customOrder": "Custom Tailored Design"
    },
    "portfolio": {
      "title": "Portfolio",
      "subtitle": "A curated selection of completed works. Each one crafted with care and dedication.",
      "filterAll": "All",
      "filterKnitting": "Knitting",
      "filterCrochet": "Crochet",
      "filterAmigurumi": "Amigurumi",
      "filterAccessory": "Accessory"
    },
    "products": {
      "title": "Products",
      "subtitle": "Discover our handmade, carefully crafted knitting and crochet products.",
      "featuredTitle": "Featured Products",
      "featuredSubtitle": "Our most loved handmade creations",
      "filterAll": "All",
      "filterKnitting": "Knitting",
      "filterCrochet": "Crochet",
      "filterAmigurumi": "Amigurumi",
      "filterAccessory": "Accessory",
      "filterWishlist": "❤️ Favorites",
      "inStock": "In Stock",
      "lowStock": "Only a Few Left",
      "outOfStock": "Out of Stock",
      "orderViaWhatsApp": "Order Now",
      "viewDetails": "View Details",
      "price": "Price",
      "materials": "Materials",
      "dimensions": "Dimensions",
      "relatedProducts": "Related Products"
    },
    "about": {
      "title": "About Me",
      "heading": "Where Every Stitch Becomes Art",
      "subtitle": "Zeyno's Crochet is a boutique craft atelier that combines over 15 years of knitting and crochet mastery with a modern aesthetic vision.<br><br>For us, crochet is not merely yarn and a hook; it is a living art form tailored uniquely to you. Thanks to our years of technical expertise and pattern mastery, <strong>we can craft any model or design you love in your preferred colors, yarn type, and custom dimensions with exact perfection.</strong><br><br>Far from mass-produced uniformity, each of our creations is handcrafted using 100% organic, hypoallergenic materials to bring warmth to your home and create lasting memories for your loved ones."
    },
    "contact": {
      "title": "Contact",
      "subtitle": "Feel free to reach out for custom orders, pricing, or any questions you might have.",
      "nameLabel": "Your Full Name",
      "emailLabel": "Your Email Address",
      "phoneLabel": "Your Phone Number",
      "messageLabel": "Your Message",
      "sendButton": "Send Message",
      "successMessage": "Your message has been sent successfully! I'll get back to you as soon as possible. 🧶",
      "errorMessage": "An error occurred while sending your message. Please try again."
    },
    "testimonials": {
      "title": "Customer Reviews",
      "subtitle": "What our happy customers think about Zeyno's Crochet products."
    },
    "orderTracking": {
      "title": "Order Tracking",
      "subtitle": "Enter your order number to track the status of your order.",
      "orderNumberLabel": "Order Number",
      "searchButton": "Track Order",
      "statuses": {
        "received": "Order Received",
        "preparing": "In Progress",
        "completed": "Completed",
        "shipped": "Shipped"
      },
      "estimatedDelivery": "Estimated Delivery",
      "trackingNumber": "Tracking Number",
      "noOrderFound": "No order found with this order number. Please check your order number and try again."
    },
    "footer": {
      "brand": "Zeyno's Crochet",
      "tagline": "Adding warmth to your life with handcrafted products. Every stitch is knitted with love.",
      "rights": "All rights reserved.",
      "madeWithLove": "Made with love 🧶"
    },
    "common": {
      "loading": "Loading...",
      "error": "An error occurred",
      "back": "Back",
      "next": "Next",
      "previous": "Previous",
      "seeAll": "See All",
      "close": "Close",
      "search": "Search"
    },
    "wishlist": {
      "title": "My Favorites",
      "empty": "You don't have any favorite products yet. Add products you like by clicking the heart icon. 🧶",
      "orderAll": "Order Favorites via Instagram DM",
      "copied": "Favorites copied! 📋 Ready to send in Instagram DM."
    },
    "testimonialForm": {
      "addTitle": "Leave a Review",
      "addSubtitle": "You can support us by sharing your experience.",
      "nameLabel": "Your Full Name",
      "productLabel": "Purchased Product",
      "ratingLabel": "Your Rating",
      "commentLabel": "Your Comment",
      "submitBtn": "Submit Review",
      "successMsg": "Thank you for your review! Your comment has been added. 🌸"
    },
    "care": {
      "title": "Knitwear Care Guide",
      "subtitle": "Tips to care for your handmade crochet items to last a lifetime",
      "washTitle": "How to Wash?",
      "washText": "Wash by hand in lukewarm water (max 30°C) using baby shampoo or delicate detergent. Do not machine wash.",
      "dryTitle": "How to Dry?",
      "dryText": "Do not wring or hang to dry. Lay flat on a dry towel in the shade and let it dry naturally.",
      "ironTitle": "Can it be Ironed?",
      "ironText": "Do not iron directly. If needed, apply steam from a distance without touching the iron to the fabric."
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "subtitle": "Everything you need to know about ordering and our products",
      "q1": "Do you take custom size or color orders?",
      "a1": "Yes! Use our 'Custom Order' wizard to choose product type, yarn, and extras, then send the design to us in Instagram DM.",
      "q2": "What is the shipping delivery time?",
      "a2": "In-stock items ship within 2-3 business days. Custom orders take 7-14 days to make depending on model complexity.",
      "q3": "Which shipping courier do you use?",
      "a3": "We ship using Yurtiçi Kargo, MNG Kargo, and PTT Kargo. A tracking number will be provided once shipped.",
      "q4": "Are the yarns used safe for babies?",
      "a4": "We use anti-allergic, anti-pilling, OEKO-TEX certified organic cotton yarns for blankets and amigurumi toys."
    },
    "sort": {
      "default": "Sort By",
      "priceAsc": "Price: Low to High",
      "priceDesc": "Price: High to Low",
      "nameAsc": "Name: A - Z"
    },
    "yarnLib": {
      "title": "Our Yarns & Color Chart",
      "subtitle": "Healthy and hypoallergenic yarn choices for your custom designs"
    },
    "share": {
      "btnText": "Share",
      "copied": "Link copied! 📋 Ready to share."
    }
  }
};
