# kupuj-bitcoiny
Zdrojové kódy k webové službě


Zatím je tento dokument takový plánem a rozvahou. 

Cílem je napsat stránku k službě nákup bitcoinů přímo pomocí příkazu z banky. Následuje jednoduchý popis toho, jak to má fungovat
 1. uživatel se zaregistruje
 2. uživatel pošle příkaz z banky na vybraný účet
 3. příkaz je identifikován a spárovan s registrací
 4. je proveden nákup bitcoinů na burze dle množství prostředků v příkazu
 5. nakoupené bitcoiny jsou převedeny na zaregistrovanou adresu (a malá část na adresu provozovatele jako poplatek)
 6. body 2-5 lze libovolně opakovat, nejlépe jedenkrát měsíčně
 

## Rozdělení projektu

 * webová prezentace
 * admin sekce
 
## Použité technologie

 * CouchDB 
 * HTML
 * JS
 * nginx
 * PHP na skripty na backendu
 
 Většina funkcionality je realizována přímo pomocí JS+Ajax. Webová stránka by měla mít přímý přístup do databáze CouchDB. 
 
 Stejným způsobem bude nejspíš realizována admin sekce s tím rozdílem, že poběží v neveřejné síti. 
 
 Data mezi jednotlivými sekcemi budou replikována master-master
 
 ## Funkce webovky
 
  * Registrace uživatele
  * sběr udajů nutných pro ověření uživatele AML a KYC
  * přístup k statistickým údajům ať již veřejným, tak údajům dostupným konkrétnímu uživateli (například přehled o nákupech)
  
  
 ## Funkce admin sekce
  
  Tato část se bude rozvíjet později. Z počátku bude sloužit ke snadné ide ntifikaci příchozích plateb,
  dále na výpočet podílů z celkové transakce (pokud se nákupy budou sdružovat), a generování transakcí, případně určitá část 
  bude realizovat výplatu za pomocí TREZOR-api.
  
  ## Návrh datového modelu
  
   * Co uživatel to dokument v CouchDB
   * ID uživatele = SHA256(email+sůl) 
   
   (poznámka: z povahy CouchDB bude k přístupu k uživatelskému účtu znát jeho ID, tohoto benefitu se bude využívat tak,
   že uživatel vždy e-mailem dostane platný link na jeho profil, ten link si také může uložit do oblíbených položek 
   - zároveň to nijak nesnižuje zabezpečení, protože nalezení platného ID je možné pouze brutal-force)
    
   * záznamy o obchodech budou samostatné dokumenty
   * dokumenty představující e-mailovou frontu
  
  
## Registrace - popis usecase

 1. nový uživatel na úvodní stránce vyplní svůj e-mail a potvrdí záměr se registrovat
 2. na jeho e-mail dojde speciálně konstruovaný odkaz, obsahující jeho e-mail a vypočítané ID
 3. uživatel přejde na webovou stránku pomocí linku a tam dojde k založení nového dokumentu o uživateli. (validační funkce zkontroluje, že ID odpívá e-mailu)
 4. po založení dokumentu pokračuje registrace vyplněním základních údajů: jméno, příjmení, datum narození, rodné číslo, číslo OP nebo pasu, bydliště, PSČ, telefoní kontakt atd
 5. Na další stránce pokračuje registrace bankovními údaji: číslo účtu, číslo banky
 6. další stránka - upload fotografie občnaského průkazu nebo pasu 
 7. další stránka - upload aktuálního výpisu z účtu nebo kopie (jako obrázek)
 8. poslední část ověření - vygenerování kódu a upload selfie obrázku uživatele držícího papírek s napsaným kódem (lze použít webkameru)
 9. dokončení - nastavení adresy nebo registrace Trezoru
 10. Vygenerování variabilního symbolu, závěrečné informace, odeslání e-mailu se smlouvou. Součástí e-mailu je link 
 na který uživatel musí kliknout, aby smlouvu potvrdil
 
 ## Změny v profilech
 
 Změny v profilech nejsou možné. Je vždy potřeba projít novým kolečkem registrace. V tomto směru bude existovat mechanismus
 založení registrace na stejný e-mail (SHA256(email+revize+sůl)). Pokud uživatel ztratí přístup k adrese nebo registrovanému
 Trezoru, může pouze registraci deaktivovat
 
 ## Přístup k profilu
 
 1. existující uživatel na úvodní stránce vyplní svůk e-mail
 2. na jeho e-mail dojde speciálně konstruovaný odkaz obsahující jeho e-mail a vypočítané ID
 3. Uživatel přejde na webovou stránku pomocí linku a tam se zjistí, že registrace již existuje, a přejde se do zobrazení profilu
 4. Uživatel si v profilu může prohlédnout základní údaje, které zadal, dále pak historii nákupů a detaily nákupů
 
 


 
 
