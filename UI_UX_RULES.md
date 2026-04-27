# DIRETTIVE UI/UX & CONVERSION RATE (RIGIDE)
Usa il design system di Stitch, ma applica OBBILGATORIAMENTE queste regole di conversione:
1. **Mobile First & Sticky CTA**: Il 90% degli utenti locali cerca da smartphone. Il pulsante "Chiama Ora" DEVE essere 'sticky' (fissato in basso allo schermo) sui dispositivi mobili.
2. **Social Proof Immediata**: Le recensioni (le 5 stelle dorate e il testo della migliore recensione) DEVONO essere "Above the Fold", ovvero visibili immediatamente sotto l'intestazione principale senza bisogno di scrollare.
3. **Contrasto Tattico per l'Azione**: I colori neutri (slate, bianco, grigio) vanno usati per la struttura. Il colore 'Primary' va usato SOLO ED ESCLUSIVAMENTE per i pulsanti di contatto (Telefono/WhatsApp) o per le icone di emergenza.
4. **Zero Attrito**: Nessun modulo di contatto complesso. Il pulsante principale deve avere un `href="tel:[NUMERO]"` o un link a WhatsApp.
5. **Ottimizzazione Immagini (SEO Tecnico - CRITICO)**: DEVI utilizzare esclusivamente il componente `<Image>` di `next/image` per tutte le immagini.
    - Le immagini 'Above the fold' (Hero, Recensioni) devono avere l'attributo `priority={true}` per azzerare il Largest Contentful Paint (LCP).
    - Non usare tag `<img>` standard.
    - Specifica sempre gli attributi `width` e `height` per evitare salti di layout (CLS).