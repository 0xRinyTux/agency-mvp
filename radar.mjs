import fs from 'fs';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente dal file .env.local
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.SERPAPI_KEY;
if (!API_KEY) {
    console.error("ERRORE: API_KEY mancante. Assicurati di impostare SERPAPI_KEY nel file .env.local.");
    process.exit(1);
}

// Una serie di ricerche in vari settori e città nel mondo
const queries = [
    "falegname artigiano Lecce",
    "calzolaio riparazioni Napoli",
    "fabbro Campobasso",
    "sartoria riparazioni Palermo",
    "merceria Bari",
    "arrotino Catania"
];

async function fetchLeadsForQuery(query) {
    const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(query)}&type=search&api_key=${API_KEY}`;
    
    try {
        console.log(`\nRicerca per: "${query}"...`);
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.local_results) {
            console.log("Nessun 'local_results' trovato.");
            return [];
        }

        const results = data.local_results;
        console.log(`Trovati ${results.length} risultati.`);
        
        // Non limito ai primi 10, controllo tutti i risultati della prima pagina!
        const filtered = results.filter(result => {
            const rating = result.rating || 0;
            const hasWebsite = !!result.website || (result.links && result.links.website);
            const hasPhone = !!result.phone;
            
            // Requisiti: Rating alto, Nessun sito web, Ha un numero di telefono
            return rating > 4.2 && !hasWebsite && hasPhone;
        });
        
        if (filtered.length > 0) {
            console.log(`🎯 TROVATI ${filtered.length} POTENZIALI CLIENTI (No sito web)!`);
        } else {
            console.log(`Nessun lead qualificato trovato per questa ricerca.`);
        }
        
        return filtered.map(lead => {
            const isItalian = query.includes("Milano") || query.includes("Roma") || query.includes("Napoli") || query.includes("Lecce") || query.includes("Palermo") || query.includes("Campobasso") || query.includes("Bari") || query.includes("Catania");
            const city = query.split(" ").pop() || "in città";
            const service = query.split(" ")[0] || "Artigiano";

            return {
                company_name: lead.title || "Azienda Sconosciuta",
                meta: {
                    company_name: lead.title || "Azienda Sconosciuta",
                    primary_color: "#e11d48",
                    secondary_color: "#f43f5e",
                    main_service: service.charAt(0).toUpperCase() + service.slice(1),
                    city: city.charAt(0).toUpperCase() + city.slice(1)
                },
                hero: {
                    badge: `Emergenza ${service} a ${city}`,
                    title: isItalian ? `Hai un problema urgente con il tuo ${service}?` : `Do you have an urgent problem with your ${service}?`,
                    subtitle: isItalian 
                        ? `Non perdere tempo. Offriamo interventi rapidi e perfetti a ${city}. Affidati a ${lead.title} senza alcun rischio.`
                        : `Don't waste time. We offer quick and perfect interventions in ${city}. Trust ${lead.title} without any risk.`,
                    cta_primary: isItalian ? "Chiama Ora per un Intervento Rapido" : "Call Now for Quick Service",
                    cta_secondary: isItalian ? "Scopri i Servizi" : "Discover Services",
                    image_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    image_alt: `${service} a ${city}`
                },
                services: {
                    title: isItalian ? "I Nostri Servizi" : "Our Services",
                    subtitle: isItalian ? "Soluzioni rapide per ogni tua esigenza." : "Quick solutions for your needs.",
                    items: isItalian ? [
                        "Interventi Rapidi",
                        "Lavorazioni su Misura",
                        "Materiali di Alta Qualità",
                        "Preventivi Trasparenti"
                    ] : [
                        "Quick Interventions",
                        "Custom Work",
                        "High Quality Materials",
                        "Transparent Quotes"
                    ]
                },
                about: {
                    title: isItalian ? `Perché Scegliere Noi a ${city}` : `Why Choose Us in ${city}`,
                    description: isItalian 
                        ? `${lead.title} non è un semplice laboratorio: garantiamo un'attenzione ossessiva al dettaglio. Affidati a veri professionisti.`
                        : `${lead.title} is not just a workshop: we guarantee obsessive attention to detail. Trust real professionals.`,
                    cta: isItalian ? "Richiedi un Preventivo" : "Request a Quote"
                },
                reviews: {
                    title: isItalian ? "Non fidarti solo di noi" : "Don't just trust us",
                    subtitle: isItalian ? "Ascolta chi ha già scelto i nostri servizi." : "Listen to who has already chosen us.",
                    best_review: {
                        name: "Local Guide",
                        text: isItalian ? "Lavoro perfetto e precisissimo! Consigliatissimo." : "Perfect and very precise work! Highly recommended.",
                        rating: lead.rating || 5
                    },
                    items: [
                        {
                            name: "Cliente Entusiasta",
                            text: isItalian ? "Lavoro perfetto e precisissimo! Una vera garanzia." : "Perfect work! A true guarantee.",
                            rating: lead.rating || 5
                        }
                    ]
                },
                contact: {
                    title: isItalian ? "Non Aspettare, Contattaci Ora" : "Don't Wait, Contact Us Now",
                    phone: lead.phone || "+39 000 000 0000",
                    address: lead.address || "Indirizzo non specificato",
                    phone_label: isItalian ? "Assistenza Immediata" : "Immediate Assistance",
                    phone_sublabel: isItalian ? "Siamo pronti ad aiutarti" : "We are ready to help",
                    address_label: isItalian ? "Vieni in Sede" : "Visit Us",
                    hours_title: isItalian ? "Orari di Apertura" : "Opening Hours",
                    google_maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.8680795410185!2d13.3330364!3d38.1631584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319e8cf1689ea55%3A0xc47e3a968600125c!2sSartoria%20Elisa%20La%20bua!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit",
                    opening_hours: {
                        "Lunedì": "9:00 - 18:00",
                        "Martedì": "9:00 - 18:00",
                        "Mercoledì": "9:00 - 18:00",
                        "Giovedì": "9:00 - 18:00",
                        "Venerdì": "9:00 - 18:00",
                        "Sabato": "9:00 - 13:00",
                        "Domenica": "Chiuso"
                    }
                },
                footer: {
                    description: isItalian ? `Servizi eccellenti a ${city}.` : `Excellent services in ${city}.`
                }
            };
        });
    } catch (err) {
        console.error("Errore durante la ricerca per", query, ":", err);
        return [];
    }
}

async function main() {
    console.log("=== INIZIO SCANSIONE GLOBALE LEAD ===");
    let allLeads = [];
    
    for (const q of queries) {
        const leads = await fetchLeadsForQuery(q);
        allLeads = allLeads.concat(leads);
    }
    
    fs.writeFileSync('fresh_leads.json', JSON.stringify(allLeads, null, 4));
    console.log(`\n=== SCANSIONE COMPLETATA ===`);
    console.log(`Creato file fresh_leads.json con ${allLeads.length} leads totali pronti per essere contattati!`);
}

main();
