// Netlify Function: cc-status.js
// Polls a CloudConvert job by ID and returns its status + download URL.

exports.handler = async (event) => {
    const allowedOrigins = ['https://tiinytools.netlify.app', 'http://localhost:8888', 'http://localhost:8000'];
    const origin = event.headers.origin || '';
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    const corsHeaders = {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const apiKey = process.env.CLOUDCONVERT_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'API key not configured on server.' }) };
    }

    let jobId;
    try {
        ({ jobId } = JSON.parse(event.body));
    } catch {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request body.' }) };
    }

    try {
        const res = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
            headers: { 'Authorization': `Bearer ${apiKey}` },
        });

        if (!res.ok) {
            return { statusCode: res.status, headers: corsHeaders, body: JSON.stringify({ error: `CloudConvert status check failed (${res.status}).` }) };
        }

        const data = await res.json();
        const tasks = data.data.tasks;
        const status = data.data.status;

        if (status === 'finished') {
            const exportTask = tasks.find(t => t.name === 'export-file');
            const downloadUrl = exportTask?.result?.files?.[0]?.url || null;
            return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ status: 'finished', downloadUrl }) };
        }

        if (status === 'error') {
            const errTask = tasks.find(t => t.status === 'error');
            return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ status: 'error', message: errTask?.message || 'Conversion failed on CloudConvert.' }) };
        }

        return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ status }) };
    } catch (err) {
        return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message || 'Internal server error.' }) };
    }
};
