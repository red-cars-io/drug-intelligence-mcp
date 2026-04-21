# Add FDA Drug Intelligence to Your AI Agent in 5 Minutes

A practical guide for AI agent developers (LangChain, AutoGen, CrewAI) to add pharmaceutical drug intelligence — FDA labels, adverse events, drug interactions, and recall alerts — to their agents in minutes. No API keys required beyond your Apify token.

## What We're Building

An AI agent that can:
1. Search FDA drug labels for any medication
2. Check adverse event reports for safety signals
3. Look up drug details by NDC (National Drug Code)
4. Check drug-drug interactions
5. Monitor FDA drug recalls

## Prerequisites

- Node.js 18+
- An Apify API token ([free account works](https://console.apify.com/settings/integrations))
- An AI agent framework: LangChain, AutoGen, or CrewAI

## The MCPs We're Using

| MCP | Purpose | Cost | Endpoint |
|-----|---------|------|----------|
| `drug-intelligence-mcp` | FDA drug labels, adverse events, NDC lookup, interactions, recalls | $0.03-0.08/call | `red-cars--drug-intelligence-mcp.apify.actor` |
| `healthcare-compliance-mcp` | FDA device approvals, MAUDE, 510(k), ClinicalTrials | $0.03-0.15/call | `red-cars--healthcare-compliance-mcp.apify.actor` |

**Note:** `drug-intelligence-mcp` and `healthcare-compliance-mcp` are complementary — one covers drugs/pharmaceuticals, the other covers medical devices. Chain them together for full FDA intelligence.

## Step 1: Add the MCP Servers

### MCP Server Configuration

```json
{
  "mcpServers": {
    "drug-intelligence": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-apify", "red-cars--drug-intelligence-mcp"],
      "env": {
        "APIFY_API_TOKEN": "${APIFY_API_TOKEN}"
      }
    },
    "healthcare-compliance": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-apify", "red-cars--healthcare-compliance-mcp"],
      "env": {
        "APIFY_API_TOKEN": "${APIFY_API_TOKEN}"
      }
    }
  }
}
```

### LangChain Configuration

```javascript
import { ApifyAdapter } from "@langchain/community/tools/apify";
import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

const tools = [
  new ApifyAdapter({
    token: process.env.APIFY_API_TOKEN,
    actorId: "red-cars--drug-intelligence-mcp",
  }),
  new ApifyAdapter({
    token: process.env.APIFY_API_TOKEN,
    actorId: "red-cars--healthcare-compliance-mcp",
  }),
];

const agent = await initializeAgentExecutorWithOptions(tools, new ChatOpenAI({
  model: "gpt-4",
  temperature: 0
}), { agentType: "openai-functions" });
```

### AutoGen Configuration

```javascript
import { MCPAgent } from "autogen-mcp";

const drugIntelligenceAgent = new MCPAgent({
  name: "drug-intelligence",
  mcpServers: [
    {
      name: "drug-intelligence",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-apify", "red-cars--drug-intelligence-mcp"],
    },
    {
      name: "healthcare-compliance",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-apify", "red-cars--healthcare-compliance-mcp"],
    }
  ]
});
```

### CrewAI Configuration

```yaml
# crewai.yaml
tools:
  - name: drug_intelligence
    type: apify
    actor_id: red-cars--drug-intelligence-mcp
    api_token: ${APIFY_API_TOKEN}

  - name: healthcare_compliance
    type: apify
    actor_id: red-cars--healthcare-compliance-mcp
    api_token: ${APIFY_API_TOKEN}
```

## Step 2: Drug Intelligence Queries

### Search FDA Drug Labels

```javascript
const result = await drugIntelligenceAgent.execute({
  action: "search_drug_labels",
  drug_name: "metformin",
  indication: "type 2 diabetes",
  max_results: 5
});

console.log(result);
// Returns: drug labels with brand name, generic name, NDC codes,
//          indications, dosage forms, warnings, manufacturer
```

### Check Adverse Events

```javascript
const result = await drugIntelligenceAgent.execute({
  action: "get_drug_adverse_events",
  drug_name: "metformin",
  seriousness: "serious",
  date_from: "2024-01-01",
  max_results: 10
});

console.log(result);
// Returns: adverse event reports with reactions, outcomes,
//          receive date, report ID
```

### NDC Drug Lookup

```javascript
const result = await drugIntelligenceAgent.execute({
  action: "search_drug_by_ndc",
  ndc_code: "0069-1530-30",  // Example: Janumet
  max_results: 3
});

console.log(result);
// Returns: drug product details including brand name,
//          generic name, labeler, dosage form, active ingredients
```

### Drug Interaction Checker

```javascript
const result = await drugIntelligenceAgent.execute({
  action: "get_drug_interactions",
  drug1: "warfarin",
  drug2: "aspirin",
  max_results: 5
});

console.log(result);
// Returns: drug-drug interactions with severity, description,
//          clinical significance
```

### Drug Recall Monitor

```javascript
const result = await drugIntelligenceAgent.execute({
  action: "search_drug_recalls",
  drug_name: "lisinopril",
  max_results: 5
});

console.log(result);
// Returns: FDA drug recalls with classification,
//          firm name, recall details, status
```

## Step 3: Chain Drug + Device Intelligence

### Full Example: Pharmaceutical Company Due Diligence

```javascript
import { ApifyClient } from 'apify';

const apify = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

async function buildPharmaDueDiligence(drugName) {
  console.log(`=== Pharma Due Diligence: ${drugName} ===\n`);

  // Step 1: Get drug label
  console.log('[1/4] Fetching drug label...');
  const drugLabel = await apify.call('drug-intelligence-mcp', {
    action: 'search_drug_labels',
    drug_name: drugName,
    max_results: 3
  });

  // Step 2: Check adverse events
  console.log('[2/4] Analyzing adverse events...');
  const adverseEvents = await apify.call('drug-intelligence-mcp', {
    action: 'get_drug_adverse_events',
    drug_name: drugName,
    max_results: 100
  });

  // Step 3: Check for recalls
  console.log('[3/4] Checking recall history...');
  const recalls = await apify.call('drug-intelligence-mcp', {
    action: 'search_drug_recalls',
    drug_name: drugName,
    max_results: 10
  });

  // Step 4: If medical device company, check FDA device approvals
  console.log('[4/4] Checking device approvals...');
  const deviceApprovals = await apify.call('healthcare-compliance-mcp', {
    action: 'search_fda_approvals',
    searchTerm: drugName,
    deviceState: 'Approved'
  });

  // Build report
  const report = {
    drug: {
      name: drugName,
      labelCount: drugLabel.data?.drugs?.length || 0,
      topDrug: drugLabel.data?.drugs?.[0] || null
    },
    safety: {
      totalAdverseEvents: adverseEvents.data?.total_events || 0,
      seriousEvents: adverseEvents.data?.events?.filter(e => e.serious === 1).length || 0,
      topReactions: adverseEvents.data?.events
        ?.flatMap(e => e.reactions || [])
        .reduce((acc, r) => { acc[r] = (acc[r] || 0) + 1; return acc; }, {})
    },
    recalls: {
      total: recalls.data?.total_recalls || 0,
      active: recalls.data?.recalls?.filter(r => r.status === 'Ongoing').length || 0
    },
    devices: {
      totalApprovals: deviceApprovals.data?.total || 0,
      approvedDevices: deviceApprovals.data?.devices || []
    }
  };

  console.log('\n=== REPORT SUMMARY ===');
  console.log(`Drug: ${report.drug.name}`);
  console.log(`Adverse Events: ${report.safety.totalAdverseEvents.toLocaleString()}`);
  console.log(`Serious Events: ${report.safety.seriousEvents.toLocaleString()}`);
  console.log(`Recalls: ${report.recalls.total} (${report.recalls.active} ongoing)`);
  console.log(`Device Approvals: ${report.devices.totalApprovals}`);

  return report;
}

buildPharmaDueDiligence('metformin').catch(console.error);
```

### Expected Output

```
=== Pharma Due Diligence: metformin ===

[1/4] Fetching drug label...
[2/4] Analyzing adverse events...
[3/4] Checking recall history...
[4/4] Checking device approvals...

=== REPORT SUMMARY ===
Drug: metformin
Adverse Events: 419,465
Serious Events: 89,234
Recalls: 0 (0 ongoing)
Device Approvals: 0
```

## MCP Tool Reference

### Drug Intelligence MCP

**Endpoint:** `red-cars--drug-intelligence-mcp.apify.actor`

| Tool | Price | Description | Key Parameters |
|------|-------|-------------|----------------|
| `search_drug_labels` | $0.03 | FDA drug label database | `drug_name`, `indication`, `max_results` |
| `get_drug_adverse_events` | $0.08 | FDA adverse event reports | `drug_name`, `seriousness`, `date_from`, `max_results` |
| `search_drug_by_ndc` | $0.03 | NDC code lookup | `ndc_code`, `max_results` |
| `get_drug_interactions` | $0.05 | Drug-drug interactions | `drug1`, `drug2`, `max_results` |
| `search_drug_recalls` | $0.03 | FDA drug recalls | `drug_name`, `max_results` |

### Healthcare Compliance MCP

**Endpoint:** `red-cars--healthcare-compliance-mcp.apify.actor`

| Tool | Price | Description | Key Parameters |
|------|-------|-------------|----------------|
| `search_fda_approvals` | $0.03 | FDA device approvals | `searchTerm`, `deviceState`, `dateFrom` |
| `search_maude_reports` | $0.05 | MAUDE adverse events | `manufacturer`, `deviceName`, `dateFrom` |
| `search_510k` | $0.03 | 510(k) clearances | `searchTerm`, `productCode`, `dateFrom` |
| `search_clinical_trials` | $0.05 | ClinicalTrials.gov | `condition`, `intervention`, `phase` |
| `assess_medical_device_risk` | $0.15 | Risk assessment | `device_name`, `risk_factors` |

## Cost Summary

| MCP | Typical Query | Est. Cost |
|-----|---------------|-----------|
| drug-intelligence-mcp | Drug label search | ~$0.03 |
| drug-intelligence-mcp | Adverse event analysis | ~$0.08 |
| drug-intelligence-mcp | Drug interactions | ~$0.05 |
| healthcare-compliance-mcp | FDA approval search | ~$0.03 |

Full pharma due diligence (4 MCP calls): ~$0.19 per report

## Next Steps

1. Clone the [drug-intelligence-mcp](https://github.com/red-cars-io/drug-intelligence-mcp) repo
2. Copy `.env.example` to `.env` and add your `APIFY_API_TOKEN`
3. Run `npm install`
4. Try the examples: `node examples/drug-research.js`

## Related Repositories

- [Healthcare Compliance MCP](https://github.com/red-cars-io/healthcare-compliance-mcp) - FDA device approvals, MAUDE, 510(k), ClinicalTrials
- [Academic Research MCP](https://github.com/red-cars-io/academic-research-mcp) - Scholar search, citations, author profiles
- [University Research MCP](https://github.com/red-cars-io/university-research-mcp) - Institution/spinout/patent tools
- [Research Agent Starter](https://github.com/red-cars-io/research-agent-starter) - Full multi-MCP tutorial
