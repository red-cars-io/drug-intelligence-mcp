/**
 * Drug Intelligence MCP Server
 * Pharmaceutical drug intelligence for AI agents.
 * Data source: FDA openFDA API (free, no auth required)
 */

import http from 'http';
import Apify, { Actor } from 'apify';

// MCP manifest
const MCP_MANIFEST = {
    schema_version: "1.0",
    name: "drug-intelligence-mcp",
    version: "1.0.0",
    description: "Pharmaceutical drug intelligence for AI agents. Access FDA drug labeling, adverse events, NDC codes, drug interactions, and recall data.",
    tools: [
        {
            name: "search_drug_labels",
            description: "Search FDA drug label database for medication labeling information",
            input_schema: {
                type: "object",
                properties: {
                    drug_name: { type: "string", description: "Drug name (e.g., 'aspirin', 'ibuprofen', 'metformin')" },
                    indication: { type: "string", description: "Therapeutic indication or condition" },
                    max_results: { type: "integer", description: "Maximum results (default: 10)", default: 10 }
                }
            },
            output_schema: {
                type: "object",
                properties: {
                    query: { type: "object", description: "The original search parameters" },
                    total_results: { type: "integer", description: "Total matching drug labels in FDA database" },
                    drugs: {
                        type: "array",
                        description: "List of drug label records",
                        items: {
                            type: "object",
                            properties: {
                                brand_name: { type: "string", description: "Brand/generic name" },
                                generic_name: { type: "string", description: "Generic name" },
                                ndc_codes: { type: "array", items: { type: "string" }, description: "National Drug Codes" },
                                indications: { type: "string", description: "Indications and usage" },
                                dosage_forms: { type: "array", items: { type: "string" }, description: "Available dosage forms" },
                                manufacturer: { type: "string", description: "Labeler/manufacturer name" },
                                active_ingredients: { type: "array", items: { type: "string" }, description: "Active ingredients" },
                                warnings: { type: "array", items: { type: "string" }, description: "Warnings" },
                                dosage_and_administration: { type: "string", description: "Dosage and administration instructions" }
                            }
                        }
                    },
                    source: { type: "string", description: "Data source (FDA Drug Label)" }
                }
            },
            price: 0.03
        },
        {
            name: "get_drug_adverse_events",
            description: "Search FDA adverse event reporting system for drug safety signals",
            input_schema: {
                type: "object",
                properties: {
                    drug_name: { type: "string", description: "Drug name" },
                    seriousness: { type: "string", description: "Seriousness filter (serious, death, disability, etc.)" },
                    date_from: { type: "string", description: "Start date YYYYMMDD" },
                    date_to: { type: "string", description: "End date YYYYMMDD" },
                    max_results: { type: "integer", description: "Maximum results (default: 10)", default: 10 }
                }
            },
            output_schema: {
                type: "object",
                properties: {
                    query: { type: "object", description: "The original search parameters" },
                    total_events: { type: "integer", description: "Total matching adverse event reports" },
                    events: {
                        type: "array",
                        description: "List of adverse event reports",
                        items: {
                            type: "object",
                            properties: {
                                report_id: { type: "string", description: "FDA report identifier" },
                                receive_date: { type: "string", description: "Date FDA received report" },
                                serious: { type: "integer", description: "1 if serious outcome" },
                                serious_outcomes: { type: "array", items: { type: "string" }, description: "Serious outcome types" },
                                reactions: { type: "array", items: { type: "string" }, description: "Reported adverse reactions" },
                                drug_name: { type: "string", description: "Suspect drug name" },
                                drug_indication: { type: "string", description: "Drug indication for use" }
                            }
                        }
                    },
                    source: { type: "string", description: "Data source (FDA Adverse Event)" }
                }
            },
            price: 0.08
        },
        {
            name: "search_drug_by_ndc",
            description: "Look up drug information by National Drug Code (NDC)",
            input_schema: {
                type: "object",
                properties: {
                    ndc_code: { type: "string", description: "10 or 11-digit NDC code (e.g., '0069-1530-30')" },
                    max_results: { type: "integer", description: "Maximum results (default: 10)", default: 10 }
                }
            },
            output_schema: {
                type: "object",
                properties: {
                    query: { type: "object", description: "The original search parameters" },
                    total_results: { type: "integer", description: "Total matching NDC records" },
                    drugs: {
                        type: "array",
                        description: "List of drug products",
                        items: {
                            type: "object",
                            properties: {
                                ndc_code: { type: "string", description: "National Drug Code" },
                                brand_name: { type: "string", description: "Brand name" },
                                generic_name: { type: "string", description: "Generic name" },
                                labeler_name: { type: "string", description: "Labeler/manufacturer" },
                                product_type: { type: "string", description: "Product type" },
                                dosage_form: { type: "string", description: "Dosage form" },
                                route: { type: "string", description: "Route of administration" },
                                active_ingredients: { type: "array", items: { type: "object" }, description: "Active ingredients with strength" },
                                packaging: { type: "array", items: { type: "object" }, description: "Packaging information" }
                            }
                        }
                    },
                    source: { type: "string", description: "Data source (FDA NDC)" }
                }
            },
            price: 0.03
        },
        {
            name: "get_drug_interactions",
            description: "Check drug-drug interactions and contraindications",
            input_schema: {
                type: "object",
                properties: {
                    drug1: { type: "string", description: "First drug name", required: true },
                    drug2: { type: "string", description: "Second drug name", required: true },
                    max_results: { type: "integer", description: "Maximum results (default: 10)", default: 10 }
                }
            },
            output_schema: {
                type: "object",
                properties: {
                    query: { type: "object", description: "The original search parameters" },
                    interactions: {
                        type: "array",
                        description: "List of drug interactions",
                        items: {
                            type: "object",
                            properties: {
                                drug1: { type: "string", description: "First drug" },
                                drug2: { type: "string", description: "Second drug" },
                                severity: { type: "string", description: "Interaction severity (high, moderate, low)" },
                                description: { type: "string", description: "Interaction description" },
                                clinical_effects: { type: "array", items: { type: "string" }, description: "Clinical effects" },
                                management: { type: "string", description: "Clinical management recommendations" }
                            }
                        }
                    },
                    source: { type: "string", description: "Data source (FDA Drug Label)" }
                }
            },
            price: 0.05
        },
        {
            name: "search_drug_recalls",
            description: "Search FDA drug recall database for medication recalls",
            input_schema: {
                type: "object",
                properties: {
                    drug_name: { type: "string", description: "Drug name" },
                    recalling_firm: { type: "string", description: "Recalling firm/manufacturer" },
                    classification: { type: "string", description: "Recall classification (Class I, II, III)" },
                    reason: { type: "string", description: "Reason for recall" },
                    date_from: { type: "string", description: "Start date YYYYMMDD" },
                    date_to: { type: "string", description: "End date YYYYMMDD" },
                    max_results: { type: "integer", description: "Maximum results (default: 10)", default: 10 }
                }
            },
            output_schema: {
                type: "object",
                properties: {
                    query: { type: "object", description: "The original search parameters" },
                    total_recalls: { type: "integer", description: "Total matching recall records" },
                    recalls: {
                        type: "array",
                        description: "List of drug recall records",
                        items: {
                            type: "object",
                            properties: {
                                recall_id: { type: "string", description: "FDA recall identifier" },
                                drug_name: { type: "string", description: "Recalled drug name" },
                                recalling_firm: { type: "string", description: "Recalling firm" },
                                classification: { type: "string", description: "Recall classification (Class I, II, III)" },
                                recall_date: { type: "string", description: "Date recall was initiated" },
                                reason_for_recall: { type: "string", description: "Reason for recall" },
                                product_description: { type: "string", description: "Product description" },
                                status: { type: "string", description: "Recall status" }
                            }
                        }
                    },
                    source: { type: "string", description: "Data source (FDA Drug Recall)" }
                }
            },
            price: 0.03
        }
    ]
};

// Tool price map (in USD)
const TOOL_PRICES = {
    "search_drug_labels": 0.03,
    "get_drug_adverse_events": 0.08,
    "search_drug_by_ndc": 0.03,
    "get_drug_interactions": 0.05,
    "search_drug_recalls": 0.03
};

// ============================================
// FDA openFDA API CLIENTS
// ============================================

async function fetchFDA(endpoint, searchParams = {}) {
    try {
        const params = new URLSearchParams();
        if (searchParams.search) params.set('search', searchParams.search);
        if (searchParams.limit) params.set('limit', searchParams.limit);
        if (searchParams.count) params.set('count', searchParams.count);

        const url = `https://api.fda.gov/drug/${endpoint}.json?${params}`;
        const resp = await fetch(url);

        if (!resp.ok) {
            console.error(`FDA API error (${endpoint}): HTTP ${resp.status}`);
            return { results: [], meta: { results: { total: 0 } } };
        }

        return await resp.json();
    } catch (e) {
        console.error(`FDA API error (${endpoint}):`, e.message);
        return { results: [], meta: { results: { total: 0 } } };
    }
}

// ============================================
// DRUG LABEL SEARCH
// ============================================

async function searchDrugLabels(params = {}) {
    const searchParts = [];
    if (params.drug_name) searchParts.push(`openfda.brand_name:${params.drug_name}+OR+openfda.generic_name:${params.drug_name}`);
    if (params.indication) searchParts.push(`indications_and_usage:${params.indication}`);

    const search = searchParts.join('+');
    const result = await fetchFDA('label', { search, limit: params.max_results || 10 });

    const drugs = (result.results || []).map(label => {
        const openfda = label.openfda || {};
        return {
            brand_name: openfda.brand_name?.[0] || label.brand_name?.[0] || '',
            generic_name: openfda.generic_name?.[0] || label.generic_name?.[0] || '',
            ndc_codes: openfda.ndc_code || [],
            indications: Array.isArray(label.indications_and_usage) ? label.indications_and_usage[0] : label.indications_and_usage || '',
            dosage_forms: openfda.dosage_form || [],
            manufacturer: openfda.manufacturer_name?.[0] || label.labeler?.[0] || '',
            active_ingredients: label.active_ingredient || [],
            warnings: label.warnings || [],
            dosage_and_administration: Array.isArray(label.dosage_and_administration)
                ? label.dosage_and_administration[0]
                : label.dosage_and_administration || ''
        };
    });

    return {
        query: params,
        total_results: result.meta?.results?.total || drugs.length,
        drugs,
        source: "FDA Drug Label"
    };
}

// ============================================
// ADVERSE EVENTS SEARCH
// ============================================

async function getDrugAdverseEvents(params = {}) {
    const searchParts = [];
    if (params.drug_name) searchParts.push(`patient.drug.medicinalproduct:${params.drug_name}`);
    if (params.seriousness) searchParts.push(`serious:${params.seriousness}`);
    if (params.date_from && params.date_to) {
        searchParts.push(`receivedate:[${params.date_from}+TO+${params.date_to}]`);
    }

    const search = searchParts.join('+');
    const result = await fetchFDA('event', { search, limit: params.max_results || 10 });

    const events = (result.results || []).map(event => {
        const patient = event.patient || {};
        const drug = Array.isArray(patient.drug) ? patient.drug[0] : patient.drug || {};
        return {
            report_id: event.safetyreportid || '',
            receive_date: event.receivedate || '',
            serious: event.serious || 0,
            serious_outcomes: event.seriousnessdeath
                ? ['death', ...(event.seriousnesslifethreatening ? ['lifethreatening'] : [])]
                : [],
            reactions: patient.reaction?.map(r => r.reactionmeddrapt || '') || [],
            drug_name: drug.medicinalproduct || '',
            drug_indication: drug.drugindication || ''
        };
    });

    return {
        query: params,
        total_events: result.meta?.results?.total || events.length,
        events,
        source: "FDA Adverse Event"
    };
}

// ============================================
// NDC LOOKUP
// ============================================

async function searchDrugByNDC(params = {}) {
    const searchParts = [];
    if (params.ndc_code) {
        // NDC can be 10 or 11 digits, handle both formats
        const ndcClean = params.ndc_code.replace(/[^0-9]/g, '');
        searchParts.push(`product_ndc:${ndcClean}`);
    }

    const search = searchParts.join('+');
    const result = await fetchFDA('ndc', { search, limit: params.max_results || 10 });

    const drugs = (result.results || []).map(product => {
        const openfda = product.openfda || {};
        return {
            ndc_code: product.product_ndc || '',
            brand_name: product.brand_name || openfda.brand_name?.[0] || '',
            generic_name: product.generic_name || openfda.generic_name?.[0] || '',
            labeler_name: product.labeler_name || '',
            product_type: product.product_type || '',
            dosage_form: product.dosage_form || '',
            route: product.route || '',
            active_ingredients: (product.active_ingredients || []).map(ing => ({
                name: ing.name || '',
                strength: ing.strength || ''
            })),
            packaging: product.packaging || []
        };
    });

    return {
        query: params,
        total_results: result.meta?.results?.total || drugs.length,
        drugs,
        source: "FDA NDC"
    };
}

// ============================================
// DRUG INTERACTIONS
// ============================================

async function getDrugInteractions(params = {}) {
    // openFDA doesn't have a dedicated interactions endpoint, so we search drug labels
    // for both drugs and look for interaction/warning information
    const search1 = `openfda.brand_name:${params.drug1}+OR+openfda.generic_name:${params.drug1}`;
    const search2 = `openfda.brand_name:${params.drug2}+OR+openfda.generic_name:${params.drug2}`;

    const [result1, result2] = await Promise.all([
        fetchFDA('label', { search: search1, limit: 5 }),
        fetchFDA('label', { search: search2, limit: 5 })
    ]);

    const interactions = [];

    // Look for drug_interactions in the label data
    const labels1 = result1.results || [];
    const labels2 = result2.results || [];

    // Check if both drugs exist and look for interaction info
    if (labels1.length > 0 && labels2.length > 0) {
        // Get drug names for the interaction
        const drug1Name = labels1[0]?.openfda?.brand_name?.[0] || labels1[0]?.openfda?.generic_name?.[0] || params.drug1;
        const drug2Name = labels2[0]?.openfda?.brand_name?.[0] || labels2[0]?.openfda?.generic_name?.[0] || params.drug2;

        // Check labels for drug_interactions, warnings, contraindications
        const interactions1 = labels1[0]?.drug_interactions || [];
        const interactions2 = labels2[0]?.drug_interactions || [];
        const warnings1 = labels1[0]?.warnings || [];
        const warnings2 = labels2[0]?.warnings || [];
        const contra1 = labels1[0]?.contraindications || [];
        const contra2 = labels2[0]?.contraindications || [];

        const allInteractions = [...interactions1, ...interactions2];
        const allWarnings = [...warnings1, ...warnings2];
        const allContra = [...contra1, ...contra2];

        if (allInteractions.length > 0 || allWarnings.length > 0 || allContra.length > 0) {
            interactions.push({
                drug1: drug1Name,
                drug2: drug2Name,
                severity: allContra.length > 0 ? 'high' : allWarnings.length > 0 ? 'moderate' : 'low',
                description: allInteractions[0] || allWarnings[0] || allContra[0] || 'Potential interaction detected',
                clinical_effects: allWarnings.slice(0, 3),
                management: 'Consult prescribing information and healthcare provider before combining medications.'
            });
        } else {
            interactions.push({
                drug1: drug1Name,
                drug2: drug2Name,
                severity: 'unknown',
                description: 'No documented interactions found in FDA labeling',
                clinical_effects: [],
                management: 'No specific interactions documented. Always consult a healthcare provider.'
            });
        }
    } else {
        // One or both drugs not found
        interactions.push({
            drug1: params.drug1,
            drug2: params.drug2,
            severity: 'unknown',
            description: 'One or both drugs not found in FDA database',
            clinical_effects: [],
            management: 'Verify drug names and try again'
        });
    }

    return {
        query: params,
        interactions,
        source: "FDA Drug Label"
    };
}

// ============================================
// DRUG RECALLS SEARCH
// ============================================

async function searchDrugRecalls(params = {}) {
    const searchParts = [];
    if (params.drug_name) searchParts.push(`drug_name:${params.drug_name}`);
    if (params.recalling_firm) searchParts.push(`recalling_firm:${params.recalling_firm}`);
    if (params.classification) searchParts.push(`classification:${params.classification}`);
    if (params.reason) searchParts.push(`reason_for_recall:${params.reason}`);
    if (params.date_from && params.date_to) {
        searchParts.push(`report_date:[${params.date_from}+TO+${params.date_to}]`);
    }

    const search = searchParts.join('+');
    const result = await fetchFDA('recall', { search, limit: params.max_results || 10 });

    const recalls = (result.results || []).map(recall => ({
        recall_id: recall.recall_number || '',
        drug_name: recall.drug_name || '',
        recalling_firm: recall.recalling_firm || '',
        classification: recall.classification || '',
        recall_date: recall.report_date || '',
        reason_for_recall: recall.reason_for_recall || '',
        product_description: recall.product_description || '',
        status: recall.status || ''
    }));

    return {
        query: params,
        total_recalls: result.meta?.results?.total || recalls.length,
        recalls,
        source: "FDA Drug Recall"
    };
}

// ============================================
// REQUEST HANDLER
// ============================================

async function handleTool(toolName, params = {}) {
    const handlers = {
        "search_drug_labels": async () => searchDrugLabels(params),
        "get_drug_adverse_events": async () => getDrugAdverseEvents(params),
        "search_drug_by_ndc": async () => searchDrugByNDC(params),
        "get_drug_interactions": async () => getDrugInteractions(params),
        "search_drug_recalls": async () => searchDrugRecalls(params)
    };

    const handler = handlers[toolName];
    if (handler) {
        const result = await handler();
        const price = TOOL_PRICES[toolName];
        if (price) {
            try {
                await Actor.charge(price, { eventName: toolName });
            } catch (e) {
                console.error("Charge failed:", e.message);
            }
        }
        return result;
    }
    return { error: `Unknown tool: ${toolName}` };
}

// ============================================
// HTTP SERVER FOR STANDBY MODE
// ============================================

await Actor.init();

const isStandby = Actor.config.get('metaOrigin') === 'STANDBY';

if (isStandby) {
    // Standby mode: start HTTP server for MCP requests
    const PORT = Actor.config.get('containerPort') || process.env.ACTOR_WEB_SERVER_PORT || 3000;

    const server = http.createServer(async (req, res) => {
        // Handle readiness probe
        if (req.headers['x-apify-container-server-readiness-probe']) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('OK');
            return;
        }

        // Handle MCP requests
        if (req.method === 'POST' && req.url === '/mcp') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
                try {
                    const jsonBody = JSON.parse(body);
                    const id = jsonBody.id ?? null;

                    const reply = (result) => {
                        const resp = id !== null
                            ? { jsonrpc: '2.0', id, result }
                            : result;
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(resp));
                    };

                    const replyError = (code, message) => {
                        const resp = id !== null
                            ? { jsonrpc: '2.0', id, error: { code, message } }
                            : { status: 'error', error: message };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(resp));
                    };

                    const method = jsonBody.method;

                    // Standard MCP: initialize
                    if (method === 'initialize') {
                        return reply({
                            protocolVersion: '2024-11-05',
                            capabilities: { tools: {} },
                            serverInfo: { name: 'drug-intelligence-mcp', version: '1.0.0' }
                        });
                    }

                    // Standard MCP: tools/list
                    if (method === 'tools/list' || (!method && jsonBody.tool === 'list')) {
                        return reply({ tools: MCP_MANIFEST.tools });
                    }

                    // Standard MCP: tools/call
                    if (method === 'tools/call') {
                        const toolName = jsonBody.params?.name;
                        const toolArgs = jsonBody.params?.arguments || {};
                        if (!toolName) return replyError(-32602, 'Missing params.name');
                        const toolResult = await handleTool(toolName, toolArgs);
                        return reply({
                            content: [{ type: 'text', text: JSON.stringify(toolResult, null, 2) }]
                        });
                    }

                    // Legacy: tools/{toolName} method format
                    if (method && method.startsWith('tools/')) {
                        const toolName = method.slice(6);
                        const toolArgs = jsonBody.params || {};
                        const toolResult = await handleTool(toolName, toolArgs);
                        return reply({
                            content: [{ type: 'text', text: JSON.stringify(toolResult, null, 2) }]
                        });
                    }

                    // Legacy direct: {tool: "...", params: {...}}
                    if (jsonBody.tool) {
                        const toolResult = await handleTool(jsonBody.tool, jsonBody.params || {});
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ status: 'success', result: toolResult }));
                        return;
                    }

                    replyError(-32601, `Method not found: ${method}`);
                } catch (error) {
                    console.error('MCP error:', error.message);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', error: error.message }));
                }
            });
            return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    });

    server.listen(PORT, () => {
        console.log(`Drug Intelligence MCP listening on port ${PORT}`);
    });

    // Keep process alive
    process.on('SIGTERM', () => {
        server.close(() => process.exit(0));
    });
} else {
    // Batch mode (apify call): run tool and exit
    const input = await Actor.getInput();
    if (input) {
        const { tool, params = {} } = input;
        if (tool) {
            console.log(`Running tool: ${tool}`);
            const result = await handleTool(tool, params);
            await Actor.setValue('OUTPUT', result);
        }
    }
    await Actor.exit();
}

// Export handleRequest for MCP gateway compatibility
export default {
    handleRequest: async ({ request, response, log }) => {
        log.info("Drug Intelligence MCP received request");

        try {
            const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
            const id = body.id ?? null;
            const method = body.method;

            // Helper to send JSON-RPC response
            const reply = (result) => {
                const resp = id !== null
                    ? { jsonrpc: '2.0', id, result }
                    : result;
                response.send(resp);
            };

            const replyError = (code, message) => {
                const resp = id !== null
                    ? { jsonrpc: '2.0', id, error: { code, message } }
                    : { status: 'error', error: message };
                response.send(resp);
            };

            // Standard MCP JSON-RPC methods
            if (method === 'initialize') {
                log.info('MCP initialize');
                return reply({
                    protocolVersion: '2024-11-05',
                    capabilities: { tools: {} },
                    serverInfo: { name: 'drug-intelligence-mcp', version: '1.0.0' }
                });
            }

            if (method === 'tools/list' || (!method && body.tool === 'list')) {
                log.info('MCP tools/list');
                return reply({ tools: MCP_MANIFEST.tools });
            }

            if (method === 'tools/call') {
                const toolName = body.params?.name;
                const toolArgs = body.params?.arguments || {};
                if (!toolName) return replyError(-32602, 'Missing params.name');
                log.info(`MCP tools/call: ${toolName}`);
                const toolResult = await handleTool(toolName, toolArgs);
                return reply({
                    content: [{ type: 'text', text: JSON.stringify(toolResult, null, 2) }]
                });
            }

            // Legacy format: { tool, params }
            const { tool, params = {} } = body;
            if (!tool) return replyError(-32602, 'Missing tool name');

            log.info(`Calling tool: ${tool}`);
            const result = await handleTool(tool, params);

            reply({ status: "success", result });
        } catch (error) {
            log.error(`Error: ${error.message}`);
            response.send({ status: "error", error: error.message });
        }
    }
};
