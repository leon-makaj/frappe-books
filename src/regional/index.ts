import { Fyo } from 'fyo';
import { createCroatianRecords } from './hr/hr';

export async function createRegionalRecords(country: string, fyo: Fyo) {
  if (country === 'Croatia') {
    await createCroatianRecords(fyo);
    return;
  }
}