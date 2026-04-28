import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const FILALBA_ID = 'f0cba439-98a4-42f9-a1f0-eced36920b70';

async function updateLead() {
    console.log(`⏳ Fix d'urgenza immagine lead ${FILALBA_ID}...`);

    const { data: currentLead, error: fetchError } = await supabase
        .from('leads')
        .select('website_data')
        .eq('id', FILALBA_ID)
        .single();

    if (fetchError || !currentLead) {
        console.error("❌ Errore nel recupero del lead:", fetchError);
        return;
    }

    const currentData = currentLead.website_data;

    const perfectData = {
        ...currentData,
        hero: {
            ...currentData.hero,
            // Uso un URL Unsplash estremamente semplice e testato
            image_url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80"
        }
    };

    const { error: updateError } = await supabase
        .from('leads')
        .update({ website_data: perfectData })
        .eq('id', FILALBA_ID);

    if (updateError) {
        console.error("❌ Errore durante l'aggiornamento:", updateError);
    } else {
        console.log("✅ Immagine aggiornata con successo! Ricarica la pagina.");
    }
}

updateLead();
