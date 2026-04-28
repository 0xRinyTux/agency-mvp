# DIRETTIVE LOCAL SEO (RIGIDE)
Ogni volta che generi o modifichi una pagina (es. `page.tsx` o `layout.tsx`), DEVI applicare queste regole SEO:
1. **Schema.org**: Inietta SEMPRE un tag `<script type="application/ld+json">` con i Dati Strutturati `LocalBusiness`. Estrai i dati dal JSON (Nome, Telefono, Indirizzo, Orari, Recensioni).
2. **Meta Tag Dinamici**: Il tag `<title>` deve seguire il formato: "Servizio Principale a [Città] | [Nome Azienda]". (es. "Sartoria su Misura a Palermo | Sartoria Elisa La Bua").
3. **Alt Text**: Qualsiasi immagine generata o inserita DEVE avere un attributo `alt` descrittivo per la SEO locale (es. `alt="Riparazioni sartoriali a Palermo"`).
4. **Semantica HTML**: Usa sempre un solo `<h1>` per pagina (che deve contenere la parola chiave principale e la città), seguito da `<h2>` per i servizi.