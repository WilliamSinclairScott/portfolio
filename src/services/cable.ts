import { createConsumer, Consumer } from '@rails/actioncable';

let consumer: Consumer | null = null;

function createCable(): Consumer {
  consumer = createConsumer(process.env.NEXT_PUBLIC_CABLE_URL || 'ws://localhost:3000/cable');
  return consumer!;
}

export function getCable(): Consumer {
  if (!consumer) createCable();
  return consumer!;
}
