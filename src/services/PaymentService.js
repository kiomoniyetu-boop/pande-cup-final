// 💰 MOBILE PAYMENT SERVICE - M-Pesa & Airtel Money
import axios from 'axios';

const M_PESA_CODE = '43852599';
const AIRTEL_CODE = process.env.REACT_APP_AIRTEL_CODE || '43852599';
const REGISTRATION_FEE = 70000; // 70,000 TZS with online discount

export const PaymentService = {
  // Initialize M-Pesa payment
  initiateMPesaPayment: async (teamData, amount = REGISTRATION_FEE) => {
    try {
      const paymentData = {
        teamName: teamData.name,
        amount,
        phone: teamData.phone,
        timestamp: new Date(),
        method: 'M-Pesa',
        accountNumber: M_PESA_CODE,
        status: 'PENDING'
      };

      // Store locally for verification
      localStorage.setItem(`payment_${teamData.name}`, JSON.stringify(paymentData));

      return {
        success: true,
        code: M_PESA_CODE,
        amount,
        instructions: [
          '1. Piga *150*...*# kulingana na mtandao wako',
          '2. Chagua "Lipa kwa Simu" > "Lipa Namba"',
          '3. Ingiza: 43852599',
          `4. Kiasi: ${amount}/=`,
          '5. Kamata PIN na wasilisha'
        ],
        accountHolder: 'FESTO HENRY MSANGAWALE'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Verify payment
  verifyPayment: async (teamName, mpesaCode) => {
    try {
      // In production, verify with M-Pesa API
      const paymentRecord = localStorage.getItem(`payment_${teamName}`);
      
      if (paymentRecord) {
        const payment = JSON.parse(paymentRecord);
        payment.status = 'VERIFIED';
        payment.verificationCode = mpesaCode;
        localStorage.setItem(`payment_${teamName}`, JSON.stringify(payment));
        
        return {
          success: true,
          message: 'Malipo yamepatikana',
          paymentId: `PANDE_${Date.now()}`,
          receipt: generateReceipt(payment)
        };
      }
      return { success: false, error: 'Malipo hayajafikiwa' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get payment history
  getPaymentHistory: async () => {
    try {
      const payments = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('payment_')) {
          const data = JSON.parse(localStorage.getItem(key));
          payments.push(data);
        }
      }
      return payments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      return [];
    }
  },

  // Generate receipt
  generateReceipt: (paymentData) => {
    return {
      receiptNumber: `PANDE_${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB'),
      team: paymentData.teamName,
      amount: paymentData.amount,
      method: paymentData.method,
      status: 'PAID',
      message: `Hongera! Timu "${paymentData.teamName}" imepatikana katika Pande Cup. Karibu!`
    };
  }
};

const generateReceipt = (paymentData) => {
  return {
    receiptNumber: `PANDE_${Date.now()}`,
    date: new Date().toLocaleDateString('en-GB'),
    team: paymentData.teamName,
    amount: paymentData.amount,
    method: paymentData.method,
    status: 'PAID'
  };
};
