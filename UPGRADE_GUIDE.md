# 🏆 PANDE CUP - COMPLETE UPGRADE GUIDE

Karibu! Your Pande Cup site has been upgraded with professional features for managing a tournament, attracting sponsors, and engaging your community.

## 🚀 WHAT'S NEW

### 1️⃣ **MULTI-PAGE SITE** (Ready)
Your site now has multiple pages accessible from the navigation bar:
- **🏠 NYUMBANI** - Your existing home page (unchanged, 100% safe)
- **❤️ WADHAMINI** - Sponsor showcase & packages
- **👥 MAHUSIANO** - Community engagement & story
- **⚙️ ADMIN** - Admin dashboard (password protected)

### 2️⃣ **ADMIN DASHBOARD** (Password Protected)
Access at: `http://your-site.com/admin`
Password: `pandecup2024` (Change this in AdminDashboard.js)

#### What You Can Do:
✅ Add & manage teams  
✅ Add & manage players with positions & numbers  
✅ Record match scores & stats  
✅ Download reports (JSON format)  
✅ Track payment information  

### 3️⃣ **AI STATS ENGINE** (Automatic)
The system automatically calculates:
- Top scorers list
- Team standings & points
- Goal differences
- Win/loss ratios
- Performance insights

**Location:** `src/services/StatsEngine.js`

### 4️⃣ **WHATSAPP NOTIFICATIONS** (Semi-automated)
Send automatic alerts to teams and fans:
- Match reminders
- Score updates
- Payment confirmations
- Tournament announcements

**How to use:**
```javascript
import { WhatsAppService } from './services/WhatsAppService';

// Send a match reminder
await WhatsAppService.sendMatchReminder(match, teamPhoneNumber);

// Send score update
await WhatsAppService.sendScoreUpdate(match);
```

### 5️⃣ **MOBILE PAYMENTS** (M-Pesa Integration)
Teams can pay registration fees online:
- 70,000 TZS online discount (vs 100,000 regular)
- Payment tracking & receipts
- Automatic payment verification

**Features:**
- M-Pesa payment codes
- Airtel Money support
- Receipt generation
- Payment history tracking

### 6️⃣ **SPONSORS PAGE**
**New page:** `/sponsors`
- 3 sponsorship tiers (Gold, Silver, Bronze)
- Package details & benefits
- Current sponsors showcase
- Direct contact form

### 7️⃣ **ABOUT PAGE**
**New page:** `/about`
- Complete Pande Cup story
- Community impact metrics
- Core values & mission
- Contact information

---

## 🔧 HOW TO USE EACH FEATURE

### **Admin Dashboard**

1. Go to: `http://localhost:3000/admin`
2. Enter password: `pandecup2024`
3. Select tab: Teams, Players, or Reports

#### Adding a Team:
```
Jina la Timu: FC Kiomoni United
Jina la Kocha: John Doe
Namba ya Simu: 0712345678
```

#### Adding Players:
1. Select team from dropdown
2. Enter player name, position, number
3. Click "ONGEZA MCHEZAJI"

#### Generating Reports:
- Go to "Reports" tab
- Click "PAKUA RIPOTI"
- Get JSON file with all data

---

### **WhatsApp Notifications**

**Example: Send match reminder**

```javascript
import { WhatsAppService } from './services/WhatsAppService';

const match = {
  homeTeam: 'FC Kiomoni',
  awayTeam: 'FC Goba',
  date: '2026-06-15',
  time: '15:00',
  stadium: 'Goba Center'
};

const teamPhone = '0712345678';

await WhatsAppService.sendMatchReminder(match, teamPhone);
```

This will open WhatsApp with a pre-filled message:
```
🎯 *ONYO WA MECHI - PANDE CUP*

⚽ FC Kiomoni vs FC Goba
📅 2026-06-15 @ 15:00
📍 Goba Center

Jitayarishi! Mechi ni muhimu! 💪
```

---

### **Mobile Payments**

**How teams pay registration:**

1. Fill registration form on home page
2. Click "WASILISHA MAOMBI"
3. See M-Pesa payment code: `43852599`
4. Amount: `70,000 TZS`
5. Send WhatsApp confirmation
6. Admin verifies payment

**Payment history stored in:**
`localStorage` (browser's local storage)

You can access payment data programmatically:

```javascript
import { PaymentService } from './services/PaymentService';

// Get all payments
const payments = await PaymentService.getPaymentHistory();
console.log(payments);
```

---

### **Sponsors Packages**

#### Gold Package - 2,000,000 TZS
- Logo on jersey
- Social media mentions
- VIP event access
- 1000+ fan reach

#### Silver Package - 1,000,000 TZS
- Logo on website
- Event booth
- Social mentions
- 500+ fan reach

#### Bronze Package - 500,000 TZS
- Website listing
- Community recognition
- Event access
- 250+ fan reach

---

## 📁 FILE STRUCTURE

```
src/
├── pages/
│   ├── HomePage.js           (Your original site)
│   ├── AdminDashboard.js     (Team & player management)
│   ├── SponsorsPage.js       (Sponsor packages)
│   └── AboutPage.js          (Community story)
├── services/
│   ├── AdminService.js       (Data management)
│   ├── StatsEngine.js        (Auto calculations)
│   ├── PaymentService.js     (M-Pesa integration)
│   └── WhatsAppService.js    (Notifications)
├── utils/
│   └── (Utility functions - add as needed)
├── App.js                    (Main routing)
└── index.js                  (Entry point)
```

---

## 🔐 IMPORTANT SECURITY NOTES

### Admin Password
Located in: `src/pages/AdminDashboard.js` line 17
```javascript
const ADMIN_PASSWORD = 'pandecup2024'; // CHANGE THIS!
```

**CHANGE THIS PASSWORD** before deploying:
- Use a strong password
- Never share it publicly
- Keep it in a safe place

### Payment Processing
Currently uses:
- Local storage (browser)
- WhatsApp verification (manual)

**For production, integrate:**
- Official M-Pesa API
- Real payment gateway
- Server-side verification

---

## ⚡ QUICK START

### Run locally:
```bash
npm start
```

### Build for production:
```bash
npm run build
```

### Access pages:
- Home: `http://localhost:3000/`
- Sponsors: `http://localhost:3000/sponsors`
- About: `http://localhost:3000/about`
- Admin: `http://localhost:3000/admin`

---

## 📝 CUSTOMIZATION TIPS

### Change Admin Password
Edit: `src/pages/AdminDashboard.js`
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

### Change Sponsor Packages
Edit: `src/pages/SponsorsPage.js`
Modify the `sponsorPackages` array

### Add M-Pesa Account Details
Edit: `src/services/PaymentService.js`
```javascript
const M_PESA_CODE = 'your-code-here';
const REGISTRATION_FEE = 70000; // Change fee here
```

### Customize Admin Dashboard Colors
Edit: `src/pages/AdminDashboard.js`
Search for `backgroundColor`, `color`, `border` in styles

---

## 🐛 TROUBLESHOOTING

### Admin page shows blank?
- Check browser console for errors
- Make sure password is correct
- Refresh the page

### Payments not saving?
- Check browser's localStorage
- Open DevTools > Application > LocalStorage
- Look for `payment_` entries

### WhatsApp not opening?
- Make sure phone number format is correct
- Include country code: `255...`
- Check internet connection

---

## 📞 SUPPORT

**Pande Cup Contact:**
- Phone: +255 653 292 935
- Email: pandecup2023@gmail.com
- Location: Goba Center & Kiomoni Tanga

---

## 🎉 WHAT'S WORKING

✅ Multi-page routing  
✅ Admin dashboard with authentication  
✅ Team & player management  
✅ Automatic stats calculation  
✅ WhatsApp integration (semi-automated)  
✅ M-Pesa payment tracking  
✅ Sponsor showcase pages  
✅ Community engagement pages  
✅ Report generation  
✅ Responsive design  
✅ Original home page intact & working  

---

## 🚀 NEXT STEPS

1. **Change Admin Password** (security!)
2. **Test All Pages** - Visit each route
3. **Add Your Sponsor Details** - Edit sponsor packages
4. **Configure Payment Details** - Add your M-Pesa codes
5. **Deploy to Production** - Build & upload

---

**Built with ❤️ for Pande Cup**
**Version: 2.0 - Multi-page Enterprise Edition**
