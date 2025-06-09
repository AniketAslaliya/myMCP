import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create an MCP server
const server = new McpServer({
    name: "Weather Data",
    version: "1.0.0"
});

async function getWeatherDataByCityName(city = '') {
    const cityName = city.toLowerCase();

    if (cityName === 'patiala') {
        return { temp: '30c', forecast: 'chance of high rain' };
    }
    if (cityName === 'delhi') {
        return { temp: '40c', forecast: 'chance of high warm winds' };
    }
    return { temp: null, error: 'Unable to get data' };
}

server.tool('getWeatherDataByCityName', {
    city: z.string(),
}, async ({ city }) => {
    const result = await getWeatherDataByCityName(city);
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result)
            }
        ]
    };
});

async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

init(); // Don't forget to call init!
