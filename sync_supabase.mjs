import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Legge le chiavi dal tuo file .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Usa la SERVICE_ROLE_KEY per bypassare le restrizioni di sicurezza durante gli script backend
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("Errore: Mancano SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY nel file .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncLeads() {
  const rawData = fs.readFileSync('fresh_leads.json', 'utf-8');
  const leads = JSON.parse(rawData);

  console.log(`🚀 Trovati ${leads.length} lead. Inizio la generazione dei siti...`);

  for (const lead of leads) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        company_name: lead.company_name,
        website_data: lead,
        status: 'bozza'
      })
      .select('id, company_name')
      .single();

    if (error) {
      console.error(`❌ Errore per ${lead.company_name}:`, error.message);
    } else {
      console.log(`✅ Sito creato: ${data.company_name}`);
      console.log(`🔗 LINK: https://agency-mvp-delta.vercel.app/preview/${data.id}\n`);
    }
  }
  
  console.log("🔥 Sincronizzazione completata! Hai un'agenzia chiavi in mano.");
}

syncLeads();
