-- ============================================================
-- INVESTING NOW — Supabase Database Schema
-- À exécuter dans le SQL Editor de Supabase
-- ============================================================

-- ─── 0. Extensions ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. PROFILES ────────────────────────────────────────────
-- Créé automatiquement quand un user s'inscrit via un trigger
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Noakim Grelier'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. NEOFLOW AGENCY — Clients ───────────────────────────
CREATE TABLE public.agency_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo TEXT DEFAULT '🏢',
  industry TEXT,
  contact_name TEXT,
  contact_email TEXT,
  since DATE,
  status TEXT DEFAULT 'actif' CHECK (status IN ('actif', 'inactif')),
  satisfaction INTEGER DEFAULT 5 CHECK (satisfaction BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. NEOFLOW AGENCY — Projets ───────────────────────────
CREATE TABLE public.agency_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.agency_clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('saas', 'app_interne', 'outil', 'refonte')),
  status TEXT NOT NULL DEFAULT 'pipeline' CHECK (status IN ('pipeline', 'en_cours', 'livre', 'maintenance')),
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  start_date DATE,
  end_date DATE,
  budget NUMERIC(12,2) DEFAULT 0,
  paid NUMERIC(12,2) DEFAULT 0,
  margin NUMERIC(5,2) DEFAULT 0,
  hours_estimated INTEGER DEFAULT 0,
  hours_spent INTEGER DEFAULT 0,
  monthly_recurring NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 4. NEOFLOW AGENCY — Jalons de projet ──────────────────
CREATE TABLE public.project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.agency_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 5. NEOFLOW AGENCY — Revenue mensuel ───────────────────
CREATE TABLE public.agency_revenue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.agency_projects(id) ON DELETE SET NULL,
  month DATE NOT NULL, -- Premier jour du mois (ex: 2025-02-01)
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('projet', 'recurrent', 'maintenance')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 6. NEOFLOW AGENCY — Pipeline ──────────────────────────
CREATE TABLE public.agency_pipeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client_name TEXT,
  type TEXT NOT NULL CHECK (type IN ('saas', 'app_interne', 'outil', 'refonte')),
  value NUMERIC(12,2) DEFAULT 0,
  probability INTEGER DEFAULT 50 CHECK (probability BETWEEN 0 AND 100),
  stage TEXT DEFAULT 'Premier contact',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 7. INVESTISSEMENTS — Positions ────────────────────────
CREATE TABLE public.portfolio_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Action', 'ETF', 'Crypto')),
  quantity NUMERIC(18,8) NOT NULL DEFAULT 0,
  avg_price NUMERIC(18,4) NOT NULL DEFAULT 0,
  current_price NUMERIC(18,4) DEFAULT 0,
  sector TEXT,
  exchange TEXT,
  description TEXT,
  market_cap TEXT,
  pe_ratio NUMERIC(10,2),
  dividend TEXT,
  high_52w NUMERIC(18,4),
  low_52w NUMERIC(18,4),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide par symbole
CREATE INDEX idx_positions_symbol ON public.portfolio_positions(user_id, symbol);

-- ─── 8. INVESTISSEMENTS — Transactions sur positions ───────
CREATE TABLE public.position_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  position_id UUID NOT NULL REFERENCES public.portfolio_positions(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('Achat', 'Vente')),
  quantity NUMERIC(18,8) NOT NULL,
  price NUMERIC(18,4) NOT NULL,
  total NUMERIC(18,4) NOT NULL,
  date DATE NOT NULL,
  fees NUMERIC(10,4) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 9. FINANCES — Transactions bancaires ──────────────────
CREATE TABLE public.bank_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  merchant TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  category TEXT,
  date DATE NOT NULL,
  icon TEXT DEFAULT '💳',
  details TEXT,
  source TEXT DEFAULT 'manual', -- 'manual', 'revolut', 'import'
  external_id TEXT, -- ID from Revolut/GoCardless for dedup
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche par date
CREATE INDEX idx_transactions_date ON public.bank_transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category ON public.bank_transactions(user_id, category);

-- ─── 10. FINANCES — Catégories de budget ───────────────────
CREATE TABLE public.budget_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#8b5cf6',
  monthly_limit NUMERIC(10,2) DEFAULT 0,
  icon TEXT DEFAULT '📁',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 11. FINANCES — Résumés mensuels ───────────────────────
CREATE TABLE public.monthly_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month DATE NOT NULL, -- Premier jour du mois
  total_income NUMERIC(12,2) DEFAULT 0,
  total_expenses NUMERIC(12,2) DEFAULT 0,
  savings_rate NUMERIC(5,2) DEFAULT 0,
  balance NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, month)
);

-- ─── 12. GLOBAL — Historique patrimoine ────────────────────
CREATE TABLE public.wealth_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  total_net_worth NUMERIC(14,2) DEFAULT 0,
  total_agency NUMERIC(14,2) DEFAULT 0,
  total_investments NUMERIC(14,2) DEFAULT 0,
  total_cash NUMERIC(14,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, month)
);


-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — Seul le propriétaire peut voir/modifier
-- ═══════════════════════════════════════════════════════════

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.position_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wealth_snapshots ENABLE ROW LEVEL SECURITY;

-- Policies: chaque user ne voit que SES données
-- Format: SELECT, INSERT, UPDATE, DELETE

-- profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- agency_clients
CREATE POLICY "Own data only" ON public.agency_clients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.agency_clients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.agency_clients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.agency_clients FOR DELETE USING (auth.uid() = user_id);

-- agency_projects
CREATE POLICY "Own data only" ON public.agency_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.agency_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.agency_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.agency_projects FOR DELETE USING (auth.uid() = user_id);

-- project_milestones
CREATE POLICY "Own data only" ON public.project_milestones FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.project_milestones FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.project_milestones FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.project_milestones FOR DELETE USING (auth.uid() = user_id);

-- agency_revenue
CREATE POLICY "Own data only" ON public.agency_revenue FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.agency_revenue FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.agency_revenue FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.agency_revenue FOR DELETE USING (auth.uid() = user_id);

-- agency_pipeline
CREATE POLICY "Own data only" ON public.agency_pipeline FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.agency_pipeline FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.agency_pipeline FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.agency_pipeline FOR DELETE USING (auth.uid() = user_id);

-- portfolio_positions
CREATE POLICY "Own data only" ON public.portfolio_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.portfolio_positions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.portfolio_positions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.portfolio_positions FOR DELETE USING (auth.uid() = user_id);

-- position_transactions
CREATE POLICY "Own data only" ON public.position_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.position_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.position_transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.position_transactions FOR DELETE USING (auth.uid() = user_id);

-- bank_transactions
CREATE POLICY "Own data only" ON public.bank_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.bank_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.bank_transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.bank_transactions FOR DELETE USING (auth.uid() = user_id);

-- budget_categories
CREATE POLICY "Own data only" ON public.budget_categories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.budget_categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.budget_categories FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.budget_categories FOR DELETE USING (auth.uid() = user_id);

-- monthly_summaries
CREATE POLICY "Own data only" ON public.monthly_summaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.monthly_summaries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.monthly_summaries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.monthly_summaries FOR DELETE USING (auth.uid() = user_id);

-- wealth_snapshots
CREATE POLICY "Own data only" ON public.wealth_snapshots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own insert" ON public.wealth_snapshots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own update" ON public.wealth_snapshots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own delete" ON public.wealth_snapshots FOR DELETE USING (auth.uid() = user_id);


-- ═══════════════════════════════════════════════════════════
-- FONCTIONS UTILES
-- ═══════════════════════════════════════════════════════════

-- Fonction: updated_at automatique
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.agency_clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.agency_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.agency_pipeline FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.monthly_summaries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Fonction: calculer remaining automatiquement
CREATE OR REPLACE FUNCTION public.calc_project_remaining()
RETURNS TRIGGER AS $$
BEGIN
  NEW.paid = COALESCE(NEW.paid, 0);
  -- remaining = budget - paid (si budget > 0)
  IF NEW.budget > 0 THEN
    -- On ne modifie pas remaining ici, on le laisse calculable côté app
    NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
