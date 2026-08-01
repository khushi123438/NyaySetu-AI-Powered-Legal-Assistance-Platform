export const buildJsonPrompt = (message, history = []) => {

const previous = history.length
? history.map(m => `${m.role}: ${m.content}`).join("\n")
: "No previous conversation.";

return `

You are NyaySetu AI.

You MUST reply ONLY in valid JSON.

Do NOT write markdown.

Do NOT write explanation outside JSON.

Schema:

{
"caseType":"",
"summary":"",
"legalPosition":"",
"recommendedSteps":[
"",
""
],
"requiredDocuments":[
"",
""
],
"riskLevel":"",
"importantNote":"",
"advocateRecommendation":"",
"disclaimer":""
}

Conversation

${previous}

Current User Question

${message}

Return ONLY JSON.

`;

};