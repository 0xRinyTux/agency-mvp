import fs from 'fs';

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
            const isItalian = query.includes("Milano") || query.includes("Roma") || query.includes("Napoli");
            
            return {
                company_name: lead.title || "Azienda Sconosciuta",
                hero_title: isItalian ? `Benvenuti da ${lead.title}` : `Welcome to ${lead.title}`,
                hero_subtitle: isItalian 
                    ? "Scopri i nostri servizi di alta qualità. Siamo fieri di offrire la migliore esperienza ai nostri clienti."
                    : "Discover our high quality services. We pride ourselves on providing the best experience for our customers.",
                services: isItalian ? [
                    "Servizio Clienti Dedicato",
                    "Consulenza Gratuita",
                    "Massima Professionalità",
                    "Preventivi su Misura"
                ] : [
                    "Dedicated Customer Service",
                    "Free Consultation",
                    "Professional Approach",
                    "Custom Quotes"
                ],
                about_us: isItalian 
                    ? `${lead.title} offre servizi eccellenti garantendo la massima competenza. Siamo pronti ad assisterti con professionalità e cortesia.`
                    : `${lead.title} provides excellent services ensuring maximum competence. We are ready to assist you.`,
                contact_phone: lead.phone || "",
                address: lead.address || "Indirizzo non specificato",
                google_maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d449278.7375341314!2d9.06353296905437!3d45.44472950995973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMilano!5e1!3m2!1sit!2sit!4v1777294181826!5m2!1sit!2sit", 
                opening_hours: {
                    "Lunedì": "9:00 - 18:00",
                    "Martedì": "9:00 - 18:00",
                    "Mercoledì": "9:00 - 18:00",
                    "Giovedì": "9:00 - 18:00",
                    "Venerdì": "9:00 - 18:00",
                    "Sabato": "10:00 - 14:00",
                    "Domenica": "Chiuso"
                },
                reviews: [
                    {
                        "name": "Local Guide",
                        "text": isItalian ? "Servizio fantastico e personale molto disponibile. Assolutamente consigliato!" : "Fantastic service and very helpful staff. Highly recommended!",
                        "rating": lead.rating || 5
                    }
                ],
                _metadata: {
                    rating: lead.rating,
                    reviews_count: lead.reviews || 0,
                    search_query: query
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
