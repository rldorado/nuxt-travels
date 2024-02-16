import type Travel from "~/interfaces/Travel";
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async () => {
    const filePath = path.resolve('static/mock_travels.json');
    const jsonContent = await fs.readFileSync(filePath, 'utf-8');
    const travels: Travel[] = JSON.parse(jsonContent);
    return travels;
});