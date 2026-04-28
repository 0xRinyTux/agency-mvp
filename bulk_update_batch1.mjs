import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const BATCH_LEADS = [
    { name: "Merceria Intimo Pellecchia", category: "merceria" },
    { name: "la Merceria", category: "merceria" },
    { name: "L'intimo, merceria e negozio di filati", category: "merceria" },
    { name: "Falegnameria Paiano Lecce - Cucine e Arredi su misura - Pietro Paolo", category: "falegname" },
    { name: "Antonio Luigi Scardino - Falegnameria, riparazioni e restauri - Lecce", category: "falegname" }
];

const TEMPLATES = {
    merceria: {
        badge: "Qualità e Tradizione",
        hero_title: "Tutto per la tua creatività",
        hero_subtitle: (name) => `Benvenuti da ${name}. Il punto di riferimento per filati, tessuti e accessori per il cucito. Qualità garantita e consulenza esperta.`,
        services: ["Vasto assortimento Filati", "Merceria Classica", "Accessori per Ricamo", "Consulenza Creativa"],
        about: (name) => `${name} è sinonimo di passione per il dettaglio. Da anni serviamo i nostri clienti con i migliori materiali per ogni progetto creativo.`,
        color: "#be185d",
        img: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80"
    },
    falegname: {
        badge: "Artigianato su Misura",
        hero_title: "L'arte del legno per la tua casa",
        hero_subtitle: (name) => `Scopri il valore del su misura con ${name}. Realizziamo arredi unici, progettati per durare una vita e valorizzare i tuoi spazi.`,
        services: ["Arredi su Misura", "Cucine Artigianali", "Restauro Mobili", "Progettazione 3D"],
        about: (name) => `Con ${name}, la tradizione della falegnameria incontra il design moderno. Ogni pezzo è realizzato con materiali di pregio e cura maniacale.`,
        color: "#92400e",
        img: "https://images.unsplash.com/photo-1629197520635-16570f07bb3a?auto=format&fit=crop&w=1000&q=80"
    }
};

async function bulkUpdate() {
    console.log("🚀 Inizio aggiornamento batch (Versione 2)...");

    for (const item of BATCH_LEADS) {
        const { data: leads, error: fetchError } = await supabase
            .from('leads')
            .select('id, website_data')
            .ilike('company_name', `%${item.name}%`);

        if (fetchError || !leads || leads.length === 0) {
            console.error(`❌ Lead non trovato: ${item.name}`);
            continue;
        }

        const lead = leads[0];
        const template = TEMPLATES[item.category];
        const currentData = lead.website_data || {};
        const meta = currentData.meta || {};
        const city = meta.city || "la tua città";

        const perfectData = {
            ...currentData,
            meta: {
                ...meta,
                company_name: item.name,
                primary_color: template.color,
                main_service: item.category.charAt(0).toUpperCase() + item.category.slice(1),
                city: city
            },
            hero: {
                badge: template.badge,
                title: template.hero_title,
                subtitle: template.hero_subtitle(item.name),
                cta_primary: "Contattaci su WhatsApp",
                cta_secondary: "Vedi i Lavori",
                image_url: template.img,
                image_alt: item.name
            },
            services: {
                title: "I Nostri Servizi",
                subtitle: "Eccellenza e cura in ogni dettaglio.",
                items: template.services
            },
            about: {
                title: "Chi Siamo",
                description: template.about(item.name),
                cta: "Richiedi Informazioni"
            },
            footer: {
                description: `Qualità artigianale a ${city}.`
            }
        };

        const { error: updateError } = await supabase
            .from('leads')
            .update({ website_data: perfectData, status: 'bozza_pronta' })
            .eq('id', lead.id);

        if (updateError) {
            console.error(`❌ Errore aggiornamento ${item.name}:`, updateError);
        } else {
            console.log(`✅ ${item.name} aggiornato! https://agency-mvp-delta.vercel.app/preview/${lead.id}`);
        }
    }
}

bulkUpdate();
