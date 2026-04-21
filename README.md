# Drug Intelligence MCP Server

> **[View on Apify](https://apify.com)** | **[Use on Apify Store](https://apify.com)**

AI agents for pharmaceutical research — FDA drug data for drug intelligence, adverse event monitoring, drug interaction checking, and pharmaceutical due diligence.

---

## 1. Purpose Statement

Drug Intelligence MCP is an MCP (Model Context Protocol) server that gives AI agents access to FDA pharmaceutical data via openFDA APIs. AI agents performing drug research, pharma intelligence, clinical decision support, or healthcare workflows can query real-time FDA drug labels, adverse events, NDC codes, drug interactions, and recall data without requiring API keys or manual database navigation.

**Built for:** AI agents doing drug research, pharma intelligence, clinical decision support, healthcare compliance, drug safety monitoring, and pharmaceutical due diligence.

---

## 2. Quick Start

Add to your MCP client:

```json
{
  "mcpServers": {
    "drug-intelligence-mcp": {
      "url": "https://red-cars--drug-intelligence-mcp.apify.actor/mcp"
    }
  }
}
```

AI agents can now search FDA drug data, check adverse events, look up NDC codes, verify drug interactions, and track recalls.

---

## 3. When to Call This MCP

Use Drug Intelligence MCP when you need to:

- **Research drug labeling** — Get indications, dosage, warnings, and active ingredients for any FDA-approved medication
- **Monitor drug safety** — Search adverse event reports to identify safety signals
- **Verify NDC codes** — Look up National Drug Codes for pharmaceutical verification
- **Check drug interactions** — Verify drug-drug interactions before prescribing
- **Track drug recalls** — Monitor FDA drug recalls by manufacturer or product
- **Pharma due diligence** — Research drug safety profiles for investment or procurement decisions
- **Clinical decision support** — Access FDA labeling data for clinical decision making
- **Formulary verification** — Confirm drug availability and NDC codes for insurance/payer systems

---

## 4. What Drug Intelligence Data Can You Access?

| Data Type | Source | Example |
|-----------|--------|---------|
| Drug Labels | FDA openFDA | Indications, dosage, warnings, active ingredients |
| Adverse Events | FDA openFDA | Reported safety signals, serious outcomes |
| NDC Codes | FDA openFDA | National Drug Code verification |
| Drug Interactions | FDA openFDA | Drug-drug interaction descriptions |
| Drug Recalls | FDA openFDA | Class I/II/III recall notices |

---

## 5. Why Use Drug Intelligence MCP?

**The problem:** Drug research — FDA approvals, adverse events, NDC codes, drug interactions, recalls — requires searching multiple government databases and synthesizing findings into actionable intelligence. For clinical decision support, pharma due diligence, and healthcare AI agents, this data is essential for drug safety monitoring, formulary verification, and regulatory compliance. Manual research takes hours across disconnected FDA systems.

**The solution:** AI agents use Drug Intelligence MCP to get instant, structured pharmaceutical intelligence on any FDA-approved drug — the FDA data layer for drug research and clinical decision support workflows.

### Key benefits:

- **Drug label search** — Search across all FDA-approved drug labeling information
- **Adverse event monitoring** — Search adverse event reports across all drug categories
- **NDC code lookup** — Verify National Drug Codes for pharmaceutical products
- **Drug interaction checking** — Identify potential drug-drug interactions
- **Recall tracking** — Monitor Class I/II/III recalls by drug or manufacturer
- **No API key required** — Uses free openFDA APIs, works immediately
- **Parallel data fetching** — Fast responses for time-sensitive drug research

---

## 6. Features

**Comprehensive FDA Coverage**
Access all major FDA pharmaceutical databases: drug labels, adverse events, NDC codes, and recall reports.

**Clinical Decision Support**
Search drug labeling for indications, dosage forms, warnings, contraindications, and active ingredients.

**Drug Safety Intelligence**
Monitor adverse event reports for safety signals, serious outcomes, and patient demographics.

**NDC Verification**
Look up exact National Drug Codes for formulary verification, insurance processing, and pharmaceutical authentication.

**Drug Interaction Checking**
Identify potential drug-drug interactions and contraindications from FDA labeling.

**Recall Monitoring**
Track FDA drug recalls by drug name, manufacturer, classification, or date range.

---

## 7. How It Compares to Alternatives

| Aspect | Our MCP | GoodRx | DrugBank |
|--------|---------|--------|----------|
| Price | $0.03-$0.08/call | Subscription required | $15,000+/year |
| API access | MCP (AI-native) | REST (limited) | REST (expensive) |
| Tool coverage | 5 tools (labels, events, NDC, interactions, recalls) | Limited drug data | Full database |
| Data source | FDA openFDA (free) | Aggregated | Licensed |
| AI agent integration | Native MCP protocol | No MCP support | No MCP support |
| No API key | Yes | No | No |
| Adverse events | Yes | No | Yes |
| Recall tracking | Yes | No | Limited |

**Why choose our MCP:**
- MCP protocol is designed for AI agent integration — call drug intelligence tools with natural language
- Free FDA openFDA data source — no API key, no registration, no approval required
- DrugBank costs $15,000+/year for enterprise — our MCP is fractions of a cent per call
- GoodRx has no MCP support — our MCP works natively with Claude, Cursor, and other AI clients
- Drug interaction checking from FDA labeling data — clinical-grade information
- Recall monitoring for pharmaceutical due diligence and drug safety

**Competitor APIs:**
- GoodRx: https://www.goodrx.com/developers (requires approval, subscription-based)
- DrugBank: https://dev.drugbank.com (enterprise pricing, $15,000+/year)
- FDA openFDA: https://open.fda.gov/ (free, but requires implementation work)

---

## 8. Use Cases for Drug Intelligence

### Drug Label Research
*Persona: Clinical pharmacist using AI to verify drug information*

```
AI agent: "Get the drug label information for metformin including indications, dosage, and warnings"
MCP call: search_drug_labels({ drug_name: "metformin", max_results: 5 })
Returns: brand_name, generic_name, indications, dosage_forms, warnings, active_ingredients
```

### Adverse Event Monitoring
*Persona: Pharmacovigilance specialist monitoring drug safety*

```
AI agent: "Search for adverse event reports on warfarin in the last 6 months, focus on serious outcomes"
MCP call: get_drug_adverse_events({ drug_name: "warfarin", seriousness: "serious", max_results: 20 })
Returns: report_id, receive_date, serious_outcomes, reactions, drug_indication
```

### NDC Code Verification
*Persona: Healthcare IT specialist verifying pharmaceutical codes*

```
AI agent: "Look up the NDC code for Lipitor 20mg tablets"
MCP call: search_drug_by_ndc({ drug_name: "Lipitor", max_results: 5 })
Returns: ndc_code, brand_name, generic_name, labeler_name, dosage_form, active_ingredients
```

### Drug Interaction Checking
*Persona: Clinical decision support system checking prescriptions*

```
AI agent: "Check if there are any known drug interactions between warfarin and aspirin"
MCP call: get_drug_interactions({ drug1: "warfarin", drug2: "aspirin" })
Returns: interactions with severity, description, clinical_effects, management
```

### Recall Tracking
*Persona: Pharmacy manager monitoring drug recalls*

```
AI agent: "Find all FDA Class I recalls on blood pressure medications in the last year"
MCP call: search_drug_recalls({ drug_name: "lisinopril", classification: "Class I", max_results: 10 })
Returns: recall_id, drug_name, recalling_firm, classification, reason_for_recall, recall_date
```

### Pharmaceutical Due Diligence
*Persona: Biotech analyst researching drug safety profiles*

```
AI agent: "Generate a drug safety profile for the GLP-1 agonist semaglutide including adverse events and recalls"
MCP calls: search_drug_labels({ drug_name: "semaglutide" })
          + get_drug_adverse_events({ drug_name: "semaglutide" })
          + search_drug_recalls({ drug_name: "semaglutide" })
Returns: complete drug profile with labels, events, and recall data
```

---

## 9. How to Connect Drug Intelligence MCP Server to Your AI Client

### Step 1: Get your Apify API token (optional)

Sign up at [apify.com](https://apify.com) and copy your API token from the console. The MCP works without an API token for tool calls, but Apify authentication may be required by some MCP clients.

### Step 2: Add the MCP server to your client

**Claude Desktop:**
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "drug-intelligence-mcp": {
      "url": "https://red-cars--drug-intelligence-mcp.apify.actor/mcp"
    }
  }
}
```

**Cursor/Windsurf:**
Add to MCP settings:
```json
{
  "mcpServers": {
    "drug-intelligence-mcp": {
      "url": "https://red-cars--drug-intelligence-mcp.apify.actor/mcp"
    }
  }
}
```

### Step 3: Start querying

```
AI agent: "Check for drug interactions between lisinopril and potassium supplements"
```

### Step 4: Retrieve results

The MCP returns structured JSON with drug data, adverse events, NDC codes, or recall information.

---

## 10. MCP Tools

| Tool | Price | Description |
|------|-------|-------------|
| search_drug_labels | $0.03 | Search FDA drug label database for medication labeling information |
| get_drug_adverse_events | $0.08 | Search FDA adverse event reporting system for drug safety signals |
| search_drug_by_ndc | $0.03 | Look up drug information by National Drug Code (NDC) |
| get_drug_interactions | $0.05 | Check drug-drug interactions and contraindications |
| search_drug_recalls | $0.03 | Search FDA drug recall database for medication recalls |

---

## 11. Tool Parameters

### search_drug_labels

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| drug_name | string | No | Drug name (e.g., 'aspirin', 'ibuprofen', 'metformin') |
| indication | string | No | Therapeutic indication or condition |
| max_results | integer | No | Maximum results (default: 10) |

**When to call:** Persona: Clinical pharmacist or healthcare AI agent. Scenario: "I need to verify the indications and warnings for a medication before dispensing."

**Example AI prompt:** "Get the drug label information for metformin including its indications for Type 2 diabetes, recommended dosage, and any black box warnings."

---

### get_drug_adverse_events

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| drug_name | string | No | Drug name |
| seriousness | string | No | Seriousness filter (serious, death, disability, etc.) |
| date_from | string | No | Start date YYYYMMDD |
| date_to | string | No | End date YYYYMMDD |
| max_results | integer | No | Maximum results (default: 10) |

**When to call:** Persona: Pharmacovigilance specialist or drug safety AI. Scenario: "Monitor adverse event reports for a drug to identify safety signals."

**Example AI prompt:** "Search FDA adverse event reports for pembrolizumab (Keytruda) in the last 12 months, focusing on serious outcomes like death or life-threatening reactions."

---

### search_drug_by_ndc

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ndc_code | string | No | 10 or 11-digit NDC code (e.g., '0069-1530-30') |
| drug_name | string | No | Drug name (alternative to NDC code) |
| max_results | integer | No | Maximum results (default: 10) |

**When to call:** Persona: Healthcare IT specialist or pharmacy system AI. Scenario: "Verify the NDC code for a specific pharmaceutical product for formulary or insurance processing."

**Example AI prompt:** "Look up the NDC code and manufacturer information for Eliquis (apixaban) 5mg tablets to verify for insurance prior authorization."

---

### get_drug_interactions

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| drug1 | string | Yes | First drug name |
| drug2 | string | Yes | Second drug name |
| max_results | integer | No | Maximum results (default: 10) |

**When to call:** Persona: Clinical decision support AI or pharmacist. Scenario: "Check for drug-drug interactions before a prescription is finalized."

**Example AI prompt:** "Check if there are any known drug interactions between warfarin and amiodarone. What is the severity and clinical management guidance?"

---

### search_drug_recalls

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| drug_name | string | No | Drug name |
| recalling_firm | string | No | Recalling firm/manufacturer |
| classification | string | No | Recall classification (Class I, II, III) |
| reason | string | No | Reason for recall |
| date_from | string | No | Start date YYYYMMDD |
| date_to | string | No | End date YYYYMMDD |
| max_results | integer | No | Maximum results (default: 10) |

**When to call:** Persona: Pharmacy manager or drug safety AI. Scenario: "Check for active Class I or II recalls on blood pressure medications before dispensing."

**Example AI prompt:** "Find all FDA Class I recalls on ACE inhibitors (like lisinopril or enalapril) in the last 2 years and show the reason for each recall."

---

## 12. Connection Examples

### cURL

```bash
curl -X POST "https://red-cars--drug-intelligence-mcp.apify.actor/mcp" \
  -H "Authorization: Bearer YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "search_drug_labels",
    "params": { "drug_name": "metformin", "max_results": 5 }
  }'
```

### Node.js

```javascript
const response = await fetch('https://red-cars--drug-intelligence-mcp.apify.actor/mcp', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_APIFY_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tool: 'search_drug_labels',
    params: { drug_name: 'metformin', max_results: 5 }
  })
});
const data = await response.json();
console.log(data.result.drugs[0].indications);
```

---

## 13. Output Example

```json
{
  "status": "success",
  "result": {
    "query": { "drug_name": "metformin", "max_results": 5 },
    "total_results": 125,
    "drugs": [
      {
        "brand_name": "Glucophage",
        "generic_name": "metformin hydrochloride",
        "ndc_codes": ["0378-0224-01", "0378-0225-01"],
        "indications": "Glucophage (metformin hydrochloride) is indicated as an adjunct to diet and exercise to improve glycemic control in adults and children with type 2 diabetes mellitus.",
        "dosage_forms": ["Tablet"],
        "manufacturer": "Mylan Pharmaceuticals Inc.",
        "active_ingredients": ["metformin hydrochloride"],
        "warnings": ["Lactic acidosis is a rare but serious metabolic complication.", "Should not be used in patients with renal disease."],
        "dosage_and_administration": "The usual starting dose is 500 mg twice daily or 850 mg once daily."
      }
    ],
    "source": "FDA Drug Label"
  }
}
```

---

## 14. Output Fields

| Field | Description |
|-------|-------------|
| query | The original search parameters |
| total_results | Total matching records in FDA database |
| drugs/events/recalls | Array of matching records |
| source | Data source (FDA Drug Label/Adverse Event/NDC/Recall) |
| ndc_code | National Drug Code (11-digit format) |
| brand_name | FDA established name |
| generic_name | Active ingredient name |
| classification | Recall class (I, II, III) |

---

## 15. How Much Does It Cost to Run Drug Intelligence MCP?

**PPE (Pay-Per-Event) pricing — $0.03 to $0.08 per tool call.**

| Tool | Price |
|------|-------|
| search_drug_labels | $0.03 |
| get_drug_adverse_events | $0.08 |
| search_drug_by_ndc | $0.03 |
| get_drug_interactions | $0.05 |
| search_drug_recalls | $0.03 |

No subscription. No monthly fee. Pay only when AI agents use the tools.

**FDA openFDA is free** — we charge for the MCP infrastructure and AI agent integration, not the underlying data.

---

## 16. How Drug Intelligence MCP Works

### Phase 1: Request parsing
AI agent sends tool call via MCP protocol. Server parses tool name and parameters.

### Phase 2: FDA API query
For each tool, the server constructs the appropriate openFDA API query:
- Drug label: `/drug/label.json` with search parameters
- Adverse events: `/drug/event.json` with drug name and date filters
- NDC lookup: `/drug/ndc.json` with product NDC or drug name
- Drug interactions: Searches drug labels for both drugs, extracts interaction info
- Drug recalls: `/drug/recall.json` with drug/firm/classification filters

### Phase 3: Response formatting
All results returned as structured JSON with normalized field names and source attribution.

### Phase 4: Pricing
PPE charges applied via Apify Actor.charge() for cost tracking.

---

## 17. Tips for Best Results

1. **Use specific drug names** — More specific queries (e.g., "metformin hydrochloride") return better results than generic ("metformin")

2. **Include brand names when known** — Searching both brand and generic names improves recall

3. **Filter by date for trending** — Use date_from/date_to to track adverse events or recalls over specific time periods

4. **Use NDC codes for verification** — NDC codes are the gold standard for pharmaceutical product identification

5. **Check interactions before prescribing** — Use get_drug_interactions for clinical decision support

6. **Monitor recalls regularly** — Set up recurring checks for Class I and II recalls on critical medications

7. **Adverse events ≠ causation** — FDA adverse event reports indicate suspicion, not confirmed causation

---

## 18. Combine with Other Apify Actors

**For comprehensive healthcare and pharma intelligence:**

- **healthcare-compliance-mcp** — Medical device compliance data (device ↔ drug overlap)
- **academic-research-mcp** — Drug literature search and academic papers
- **tech-scouting-report-mcp** — Pharma R&D momentum and patent intelligence

**Research chain:**
```
Drug Intelligence MCP → healthcare-compliance-mcp → academic-research-mcp
```
AI agents researching a drug can: (1) check FDA labeling and adverse events, (2) verify medical device interactions, (3) find academic literature on clinical trials.

**Note:** Drug Intelligence MCP provides FDA regulatory data (drug labels, adverse events, recalls). For clinical decision support, always verify with healthcare professionals. No API key required — AI agents can call these tools directly.

---

## SEO Keywords

drug intelligence MCP, FDA drug label API, adverse event reporting, NDC code lookup, drug interaction checker, FDA drug recall, pharmaceutical AI agent, drug safety monitoring, openFDA, no API key needed, AI agent, MCP server, LLM drug research, Claude FDA, Cursor pharmaceutical, drug discovery AI, pharmacovigilance MCP, clinical decision support, drug formulary verification, pharma due diligence, healthcare AI

---

## License

Apache 2.0
