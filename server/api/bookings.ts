import type { Booking } from "~/interfaces/Booking";

import fs from 'fs';
import path from 'path';

export default defineEventHandler(async () => {
  const filePath = path.resolve('static/mock_bookings.json');
  const jsonContent = await fs.readFileSync(filePath, 'utf8');
  const bookings: Booking[] = JSON.parse(jsonContent);
  return bookings;
});
