# Investing Now 💰

Application de gestion financière personnelle — Patrimoine, Business SaaS, Investissements & Budget.

## 🚀 Lancer le projet (GitHub Codespaces)

1. **Aller sur le repo GitHub** : `https://github.com/NeoFlowAgency/investing-now`
2. **Cliquer sur** `Code` → `Codespaces` → `Create codespace on main`
3. Attendre que le Codespace se construise (les dépendances s'installent automatiquement grâce au fichier `.devcontainer/devcontainer.json`)
4. Dans le terminal du Codespace, lancer :

```bash
npm run dev
```

5. Ouvrir l'URL affichée dans le terminal (forwarded port 3000)

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx          # Layout global (sidebar + content)
│   ├── page.tsx            # Vue Globale (Dashboard central)
│   ├── globals.css         # Styles globaux (dark theme)
│   ├── neoflow/page.tsx    # NeoFlow BOS (métriques Stripe)
│   ├── investments/page.tsx # Investissements (Actions/ETFs/Crypto)
│   └── finance/page.tsx    # Finances Personnelles (Budget)
├── components/
│   ├── sidebar.tsx         # Navigation latérale
│   ├── kpi-card.tsx        # Composant KPI réutilisable
│   ├── card.tsx            # Container card réutilisable
│   └── charts.tsx          # Graphiques (Area, Bar, Line, Donut)
└── lib/
    ├── mock-data.ts        # Données simulées (à remplacer par les APIs)
    └── utils.ts            # Fonctions utilitaires
```

## 🛠 Stack

- **Frontend** : Next.js 14 (App Router) + TailwindCSS
- **Graphiques** : Recharts
- **Icônes** : Lucide React
- **Backend (futur)** : Supabase
- **APIs (futur)** : Stripe, GoCardless (Revolut), Yahoo Finance, CoinGecko
