// 📱 WHATSAPP NOTIFICATION SERVICE
import axios from 'axios';

const WHATSAPP_API_URL = process.env.REACT_APP_WHATSAPP_API || 'https://api.whatsapp.com/send';
const ADMIN_NUMBER = process.env.REACT_APP_ADMIN_NUMBER || '255653292935';

export const WhatsAppService = {
  // Send match reminder
  sendMatchReminder: async (match, teamNumber) => {
    const message = `🎯 *ONYO WA MECHI - PANDE CUP*\n\n` +
      `⚽ ${match.homeTeam} vs ${match.awayTeam}\n` +
      `📅 ${match.date} @ ${match.time}\n` +
      `📍 ${match.stadium || 'Karibu'}\n\n` +
      `Jitayarisha! Mechi ni muhimu! 💪`;
    
    return sendWhatsAppMessage(teamNumber, message);
  },

  // Send score update
  sendScoreUpdate: async (match) => {
    const message = `⚽ *MATOKEO YA MECHI*\n\n` +
      `${match.homeTeam} ${match.score} ${match.awayTeam}\n\n` +
      `Status: ${match.status}\n` +
      `Sasa karibu Pande Cup! 🔥`;
    
    return broadcastMessage(message);
  },

  // Send payment confirmation
  sendPaymentConfirmation: async (team, amount) => {
    const message = `✅ *MALIPO YAMEPOKELEWA*\n\n` +
      `Timu: ${team}\n` +
      `Kiasi: ${amount}/=\n\n` +
      `Hongera! Usajili wako umekamilika. 🎉\n` +
      `Karibu Pande Cup!`;
    
    return sendWhatsAppMessage(ADMIN_NUMBER, message);
  },

  // Send tournament announcement
  sendAnnouncement: async (message) => {
    return broadcastMessage(`📣 *PANDE CUP ANNOUNCEMENT*\n\n${message}`);
  }
};

const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    // Using WhatsApp Web API (for development)
    // In production, use official WhatsApp Business API
    const url = `${WHATSAPP_API_URL}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new window
    window.open(url, '_blank');
    
    return { success: true, message: 'WhatsApp imegundulika' };
  } catch (error) {
    console.error('WhatsApp Error:', error);
    return { success: false, error: error.message };
  }
};

const broadcastMessage = async (message) => {
  // In production, this would broadcast to all registered numbers
  try {
    const response = await axios.post('/api/whatsapp/broadcast', {
      message,
      timestamp: new Date()
    });
    return response.data;
  } catch (error) {
    console.error('Broadcast Error:', error);
    return { success: false, error: error.message };
  }
};
