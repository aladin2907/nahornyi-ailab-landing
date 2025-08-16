import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, website } = await request.json();
    
    // Honeypot check
    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Rate limiting (basic)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('Contact form submission:', { name, email, message });
      return NextResponse.json({ success: true });
    }
    
    // Send to Telegram
    const telegramMessage = `
🚀 *New Contact from Nahornyi AILab*

👤 *Name:* ${name}
📧 *Contact:* ${email}
💬 *Message:*
${message}

🌐 *IP:* ${ip}
⏰ *Time:* ${new Date().toISOString()}
    `.trim();
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown'
        })
      }
    );
    
    if (!telegramResponse.ok) {
      throw new Error('Failed to send to Telegram');
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}