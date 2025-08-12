import {SquidService, webhook, WebhookRequest} from '@squidcloud/backend';
import * as fs from "node:fs";
import * as path from "node:path";
import {randomBytes} from 'crypto';

export interface ProfitAndLossRecord {
    Type: string;
    Date1: Date;
    Date2: Date;
    Company: string;
    Bus1: string;
    Bus2: string;
    Sales: number;
    Profit: number;
    VariableCost: number;
    FixedCost: number;
}

export interface InstructionsRecord {
    instructions: string;
}

interface ChatRequest {
    prompt: string;
}

interface ChatResponse {
    response: string;
}

export class ExampleService extends SquidService {

    private readonly instructionsCollection = this.squid.collection<InstructionsRecord>('Instructions');
    private readonly profitsAndLossesCollection = this.squid.collection<ProfitAndLossRecord>('ProfitsAndLosses');


    // @webhook('loadData')
    async loadCsv(): Promise<ProfitAndLossRecord[][]> {
        // 1. Read raw CSV
        const raw = fs.readFileSync(
            path.join(this.assetsDirectory, 'data.csv'),
            'utf8'
        );

        // 2. Split into non-empty lines
        const lines = raw.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) {
            return [];
        }

        // 3. Parse headers as keys of ProfitAndLossRecord
        const headers = lines[0]
            .split(',')
            .map(h => h.trim()) as Array<keyof ProfitAndLossRecord>;

        // 4. Build typed records
        const data: ProfitAndLossRecord[] = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const rec = {} as ProfitAndLossRecord;

            headers.forEach((hdr, idx) => {
                const val = values[idx] || '';

                switch (hdr) {
                    case 'Date1':
                    case 'Date2': {
                        const year = parseInt(val.slice(0, 4), 10);
                        const month = parseInt(val.slice(4, 6), 10) - 1;
                        rec[hdr] = new Date(year, month, 1);
                        break;
                    }
                    case 'Sales':
                    case 'Profit':
                    case 'VariableCost':
                    case 'FixedCost':
                        rec[hdr] = parseInt(val, 10);
                        break;
                    default:
                        rec[hdr] = val as any;
                }
            });

            return rec;
        });

        // 5. Chunk into batches of 100
        const chunkSize = 100;
        const chunks: ProfitAndLossRecord[][] = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }

        // 6. Persist each chunk with generated IDs
        for (const chunk of chunks) {
            await this.profitsAndLossesCollection
                .insertMany(
                    chunk.map(record => ({
                        id: generateId(),
                        data: record,
                    }))
                );
        }

        return chunks;
    }


    @webhook('deleteInstructions')
    async deleteInstructions(): Promise<void> {
        await this.instructionsCollection.doc('instructions').delete();
    }

    @webhook('chat')
    async chat(request: WebhookRequest<ChatRequest>): Promise<ChatResponse> {
        const instructionsRecord = await this.instructionsCollection.doc('instructions').snapshot();
        let instructions = '';
        if (!instructionsRecord) {
            instructions = `You are a financial assistant. Use the provided data to answer questions about profits and losses.Make sure to answer only the question asked, and do not provide any additional information. Be polite and concise.You need to answer in Japanese!
            Only if the prompt asks for a chart (line bar, pie chart, etc) use https://quickchart.io to embed the chart in the response. Make sure the URL is escaped/encoded, otherwise the markdown won't work. When creating a chart, please also provide the data in a table.`;
            await this.instructionsCollection.doc('instructions').insert({
                instructions,
            });
        } else {
            instructions = instructionsRecord.instructions;
        }
        const aiResponse = await this.squid.ai().executeAiQuery('built_in_db', request.body.prompt, {
            enableCodeInterpreter: false,
            instructions,
            collectionsToUse: ['ProfitsAndLosses'],
            enableRawResults: true
        });
        console.log(aiResponse.rawResultsUrl);
        if (aiResponse.success) {
            // Return a markdown of the response and the query
            return {response: `${aiResponse.answer}\n\n\`\`\`${aiResponse.queryMarkdownType || "text"}\n${aiResponse.executedQuery}\n\`\`\``};
        } else {
            const responseText = aiResponse.answer;
            return {response: responseText};
        }
    }


    @webhook('provideFeedback')
    async provideFeedback(request: WebhookRequest<{ feedback: string }>): Promise<void> {
        const feedback = request.body.feedback;
        if (!feedback) {
            throw new Error('Feedback is required');
        }
        const currentInstructions = await this.instructionsCollection.doc('instructions').snapshot();
        const dbSchema = await this.squid.admin().integrations().getIntegrationSchema('built_in_db');
        const prompt = `
<CurrentInstructions>
  ${currentInstructions ? currentInstructions.instructions : 'No instructions set.'}
</CurrentInstructions>

<DatabaseSchema>
${dbSchema ? JSON.stringify(dbSchema, null, 2) : 'No database schema available.'}
</DatabaseSchema>

<Feedback>
    ${feedback}
</Feedback>`;
        const newInstructionsJsonString = await this.squid.ai().agent().ask(prompt, {
            model: 'o3',
            responseFormat: 'json_object',
            instructions: `You are a bot that accepts feedback and modify the existing instructions based on the feedback. You will receive three sections:
            CurrentInstructions - Instructions sent to another agent, DatabaseSchema - Based on this database schema the other agent answers questions, and Feedback - The feedback provided by the user.
            You need to see whether the feedback makes sense, if it does you need to modify the instructions in the CurrentInstructions section, and return the modified instructions in the response.
            
            Note: If the feedback is not clear or will make the new instructions not clear, you need to return null as the instructions in the response.
            
            You need to return this JSON object: {instructions: string | null}            
            `
        });

        const newInstructions = JSON.parse(newInstructionsJsonString)['instructions'] as string | null;
        if (newInstructions) {
            await this.instructionsCollection.doc('instructions').update({
                instructions: newInstructions,
            });
        } else {
            console.log('Feedback was not clear or did not make sense, not updating instructions.');
        }
    }

}

function generateId(): string {
    return randomBytes(6).toString('hex'); // 6 bytes * 2 hex chars/byte = 12 chars
}