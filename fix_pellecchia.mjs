import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const leadId = '93cefee9-2deb-4f62-a6dc-cf157f10c9ac';

const websiteData = {
  meta: {
    company_name: "Merceria Intimo Pellecchia",
    city: "Bari",
    main_service: "Merceria e Intimo",
    primary_color: "#be123c", // Rose 700
    is_premium: true
  },
  hero: {
    title: "Merceria Intimo Pellecchia: Qualità e Tradizione a Bari",
    subtitle: "Da oltre 40 anni selezioniamo il miglior intimo, filati e articoli per merceria. La passione per i dettagli che valorizza la tua eleganza quotidiana.",
    cta_primary: "Contattaci su WhatsApp",
    cta_secondary: "I Nostri Articoli",
    badge: "Storica Attività a Bari",
    image_url: "https://images.unsplash.com/photo-1590736962236-417163f91572?auto=format&fit=crop&q=80&w=1200",
    image_alt: "Articoli di merceria e filati pregiati"
  },
  services: {
    title: "I Nostri Prodotti e Servizi",
    subtitle: "Tutto quello che serve per il tuo stile e per i tuoi lavori di cucito creativo.",
    items: [
      "Intimo Uomo, Donna e Bambino",
      "Filati e Lane di Alta Qualità",
      "Articoli per Sartoria e Cucito",
      "Accessori Moda e Passamanerie",
      "Corredi per Neonati",
      "Consulenza Esperta in Negozio"
    ]
  },
  reviews: {
    title: "Cosa dicono di noi",
    subtitle: "La soddisfazione dei nostri clienti è la nostra miglior pubblicità.",
    best_review: {
      text: "La migliore merceria di Bari. Trovi sempre tutto quello che cerchi e la signora Pellecchia è gentilissima e super esperta.",
      name: "Maria G."
    },
    items: [
      { text: "Assortimento incredibile di intimo e filati. Un punto di riferimento nel quartiere.", name: "Laura V.", rating: 5 },
      { text: "Qualità dei prodotti eccellente. Ho trovato dei filati che non riuscivo a reperire altrove.", name: "Giuseppe R.", rating: 5 },
      { text: "Gentilezza e professionalità d'altri tempi. Consigliatissimo!", name: "Anna L.", rating: 5 }
    ]
  },
  about: {
    title: "Una Storia di Famiglia",
    description: "Siamo un punto di riferimento a Bari per chi cerca qualità e cortesia. Dalla merceria classica all'intimo più ricercato, ogni pezzo è scelto con cura per garantirti solo il meglio.",
    cta: "Chiamaci Ora"
  },
  contact: {
    title: "Vieni a Trovarci",
    phone: "+39 080 502 2315",
    phone_label: "Telefono",
    phone_sublabel: "Sempre disponibili per info",
    address: "Bari, Italia",
    address_label: "Sede del Negozio",
    hours_title: "Orari di Apertura",
    opening_hours: {
      "Lunedì - Venerdì": "09:00 - 13:00, 16:30 - 20:00",
      "Sabato": "09:00 - 13:00",
      "Domenica": "Chiuso"
    },
    google_maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.3!2d16.8!3d41.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzAwLjAiTiAxNsKwNDgnMDAuMCJF!5e0!3m2!1sit!2sit!4v1620000000000"
  },
  footer: {
    description: "Merceria Intimo Pellecchia - La tua merceria di fiducia a Bari dal 1980."
  }
};

async function fix() {
  const { data, error } = await supabase
    .from('leads')
    .update({ website_data: websiteData })
    .eq('id', leadId);

  if (error) console.error('Errore:', error);
  else console.log('Sito di Pellecchia aggiornato con successo!');
}

fix();
