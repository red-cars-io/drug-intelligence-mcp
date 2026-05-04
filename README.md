# Drug Intelligence MCP Server

> FDA pharmaceutical intelligence for AI agents — drug labels, adverse events, NDC codes, drug interactions, and recall data. No API key required.

**[View on Apify](https://apify.com/red.cars/drug-intelligence-mcp)** | **[MCP Endpoint](https://drug-intelligence-mcp.apify.actor/mcp)**

---

## Comparison

See how Drug Intelligence MCP compares to free FDA alternatives.

- [Comparison: vs RxNorm, FDA Drugs](COMPARISON.md)

---

## What It Does

Give AI agents direct access to FDA pharmaceutical data — drug labels, adverse events, NDC codes, drug interactions, and recall information. Built for drug research, pharma due diligence, and healthcare AI workflows.

- **Drug labels** — search FDA drug label database for indications, dosage, warnings, active ingredients
- **Adverse events** — search FDA adverse event reporting system (FAERS) for drug safety signals
- **NDC lookup** — find National Drug Codes and associated product information
- **Drug interactions** — check drug-drug interaction descriptions from FDA data
- **Recall tracking** — monitor FDA drug recalls by manufacturer, product, or class

---

## Quick Start

Add to your MCP client:

```json
{
  "mcpServers": {
    "drug-intelligence-mcp": {
      "url": "https://drug-intelligence-mcp.apify.actor/mcp"
    }
  }
}
```

---

## Tools

| Tool | Price | Description |
|------|-------|-------------|
| `search_drug_labels` | $0.03 | Search FDA drug label database |
| `get_drug_adverse_events` | $0.08 | Search FDA adverse event reports (FAERS) |
| `search_drug_by_ndc` | $0.03 | NDC code lookup |
| `get_drug_interactions` | $0.05 | Drug-drug interaction descriptions |
| `search_drug_recalls` | $0.03 | Track FDA drug recalls |

### search_drug_labels
**When to call:** AI agent researching drug indications, contraindications, or active ingredients for clinical or investment research.
**Example AI prompt:** "Show me the FDA label for Keytruda (pembrolizumab) — what are its indications and black box warnings?"

### get_drug_adverse_events
**When to call:** AI agent investigating drug safety signals, adverse event patterns, or pharmacovigilance data.
**Example AI prompt:** "What are the most serious adverse events reported for Ozempic (semaglutide) in the last 2 years?"

### search_drug_by_ndc
**When to call:** AI agent verifying NDC codes for formulary management, insurance verification, or pharmaceutical logistics.
**Example AI prompt:** "Look up NDC code 0001-1234-01 — what's the drug name, strength, and package size?"

### get_drug_interactions
**When to call:** AI agent checking potential drug-drug interactions before clinical decision support or formulary review.
**Example AI prompt:** "What interactions exist between warfarin and aspirin according to FDA data?"

### search_drug_recalls
**When to call:** AI agent tracking drug recall status for pharmacy risk management or supply chain intelligence.
**Example AI prompt:** "Show me all FDA drug recalls involving blood pressure medications in the last 12 months."

---

## Data Sources

| Source | Coverage | What's Available |
|--------|----------|-----------------|
| FDA openFDA Drug Labels | US | Indications, dosage, warnings, ingredients |
| FDA FAERS | US | Adverse event reports, serious outcomes |
| FDA NDC Directory | US | National Drug Codes, package sizes |
| FDA Drug Recalls | US | Class I/II/III pharmaceutical recalls |

---

## Pricing

| Tool | Per Call |
|------|----------|
| `search_drug_labels` | $0.03 |
| `get_drug_adverse_events` | $0.08 |
| `search_drug_by_ndc` | $0.03 |
| `get_drug_interactions` | $0.05 |
| `search_drug_recalls` | $0.03 |

No subscription. Pay per use via Apify PPE. No API keys required.

---

## Example Calls

### Search drug label

```
search_drug_labels(drug_name="Keytruda", max_results=5)
```

Returns:
```json
{
  "query": "Keytruda",
  "total_results": 3,
  "labels": [
    {
      "brand_name": "KEYTRUDA",
      "generic_name": "pembrolizumab",
      "indications": "melanoma, NSCLC, renal cell carcinoma",
      "warnings": ["Grade 4 or life-threatening pneumonitis", "severe colitis"],
      "active_ingredients": ["pembrolizumab 100mg"],
      "dosage_and_administration": "200mg IV every 3 weeks",
      "source": "FDA Drug Label"
    }
  ]
}
```

### Check adverse events

```
get_drug_adverse_events(drug_name="semaglutide", seriousness="death", max_results=10)
```

Returns:
```json
{
  "drug_name": "semaglutide",
  "total_events": 1247,
  "serious_events": [
    {
      "report_id": "2024-345678",
      "outcome": "DEATH",
      "adverse_event": "Thyroid cancer",
      "patient_age": "67",
      "source": "FDA FAERS"
    }
  ],
  "source": "FDA openFDA"
}
```

---

## How It Compares to Alternatives

| Aspect | Drug Intelligence MCP | FDA openFDA API | RxNorm API |
|--------|----------------------|-----------------|------------|
| Price | $0.03–0.08/call | Free | Free |
| API for AI agents | MCP (native) | REST | REST |
| Adverse events | ✅ FAERS | ✅ Raw data | ❌ |
| Drug interactions | ✅ | ✅ | ❌ |
| Recall tracking | ✅ | ✅ | ❌ |
| No API key | ✅ | ✅ | ❌ |

---

## Connect to AI Agents

### Claude Desktop / Cursor / Windsurf
```json
{
  "mcpServers": {
    "drug-intelligence-mcp": {
      "url": "https://drug-intelligence-mcp.apify.actor/mcp"
    }
  }
}
```

---

## SEO Keywords

FDA drug label API, adverse event reporting system, NDC code lookup, drug recall database, FDA openFDA, AI agent pharmaceutical research, drug safety signals, pharmacovigilance API, drug interaction checker, clinical decision support, pharmaceutical intelligence, AI agent drug research, FDA drug database
- [Comparison: vs RxNorm, FDA Drugs](COMPARISON.md)
