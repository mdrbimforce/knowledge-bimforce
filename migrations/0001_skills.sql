-- Migration number: 0001 	 2026-11-25
-- Downloadteller voor /skills en aanmeldingen voor de nieuwsbrief (D1, binding DB).
-- Toepassen: npx wrangler d1 migrations apply knowledge-bimforce [--local | --remote]

-- Eén teller per skill per dag (UTC). Bewust zonder IP, user-agent, cookie of referrer.
CREATE TABLE IF NOT EXISTS skill_download (
  slug   TEXT    NOT NULL,
  dag    TEXT    NOT NULL,            -- JJJJ-MM-DD (UTC)
  aantal INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, dag)
);

-- Aanmeldingen voor de nieuwsbrief. Verzending en dubbele opt-in volgen
-- (Resend, task-1790606908355); tot dan blijft elke aanmelding 'onbevestigd'.
CREATE TABLE IF NOT EXISTS nieuwsbrief_inschrijving (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  adres             TEXT    NOT NULL UNIQUE,      -- altijd in kleine letters opgeslagen
  aangemeld_op      TEXT    NOT NULL,             -- ISO 8601, UTC
  status            TEXT    NOT NULL DEFAULT 'onbevestigd'
                    CHECK (status IN ('onbevestigd', 'bevestigd', 'afgemeld')),
  bevestigingstoken TEXT    NOT NULL UNIQUE,      -- 32 willekeurige bytes, hex
  bron              TEXT                          -- pagina of blok waar de aanmelding vandaan kwam
);

CREATE INDEX IF NOT EXISTS idx_nieuwsbrief_aangemeld_op ON nieuwsbrief_inschrijving (aangemeld_op);
