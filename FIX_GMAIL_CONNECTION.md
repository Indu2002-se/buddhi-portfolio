# 🔧 Fix Gmail Connection Error

## Error: "Gmail_API: Invalid grant. Please reconnect your Gmail account"

මේ error එක එන්නේ EmailJS service එක Gmail එක්ක connection එක expire වෙලා හෝ invalid වෙලා. මේක fix කරන්න පහසයි!

---

## ✅ Solution: Reconnect Gmail Account

### Step 1: EmailJS Dashboard එකට යන්න
1. Go to: https://dashboard.emailjs.com/
2. Login කරන්න

### Step 2: Email Service එක Edit කරන්න
1. Left sidebar එකේ **"Email Services"** click කරන්න
2. ඔබේ Gmail service එක (service_wvl4rol) තියෙන එක find කරන්න
3. Service එක click කරන්න

### Step 3: Reconnect කරන්න
1. **"Reconnect"** හෝ **"Connect Account"** button එක click කරන්න
2. Google account selection popup එකක් එනවා
3. ඔබේ Gmail account එක select කරන්න (bwithanage327@gmail.com)
4. **"Allow"** හෝ **"Continue"** click කරන්න permissions දෙන්න
5. Success message එකක් පෙන්වයි!

### Step 4: Test කරන්න
1. ඔබේ website එක refresh කරන්න
2. Contact form එකෙන් test message එකක් යවන්න
3. Email එක receive වෙනවද check කරන්න

---

## 🔄 Alternative: Create New Gmail Service

පරණ service එක reconnect වෙන්නේ නැත්නම්:

1. **Add New Service**:
   - Dashboard → "Email Services" → "Add New Service"
   - "Gmail" select කරන්න
   - "Connect Account" click කරන්න
   - Gmail account එක authorize කරන්න

2. **New Service ID එක Copy කරන්න**:
   - Service එක create වෙච්ච පස්සේ Service ID එක පෙන්නනවා
   - Copy කරන්න (e.g., `service_xyz123`)

3. **Code එක Update කරන්න**:
   - Open `src/App.jsx`
   - Line ~56 එකේ:
   ```javascript
   const serviceId = 'service_xyz123'; // ← New Service ID එක දාන්න
   ```

4. **Test කරන්න**:
   ```bash
   npm run dev
   ```

---

## 🎯 Current Working Solution

දැන් ඔබේ code එකේ **fallback mechanism** එකක් තියෙනවා:

1. **First**: EmailJS try කරනවා (direct email delivery)
2. **If fails**: Automatic ව mailto link එක open කරනවා (user's email client)

So even if EmailJS connection fails, form එක හැමදාම වැඩ කරයි! ✅

---

## 🐛 Why This Happens

Gmail connection expire වෙන්නේ මේ reasons වලින්:

1. **Google security settings changed**
2. **Token expired** (happens after ~6 months)
3. **Password changed** on Gmail account
4. **2FA enabled/disabled** on Gmail
5. **Less secure app access** settings changed

---

## 📝 Prevention Tips

මේ problem එක නැවත නැවත එන්න නැති කරගන්න:

1. **Regularly check** EmailJS dashboard (මාසෙකට වරක්)
2. **Test contact form** නිතරම (සතියකට වරක්)
3. **Enable notifications** EmailJS dashboard එකේ
4. **Keep backup** of Service ID, Template ID, Public Key

---

## ✅ Quick Checklist

Current status of your setup:

- ✅ EmailJS library installed
- ✅ Service ID: `service_wvl4rol`
- ✅ Template ID: `template_nyudov8`
- ✅ Public Key: `kdbLgmYxD-Ja8RWC1`
- ⚠️ Gmail connection: **Needs reconnection**
- ✅ Fallback working: **Yes (mailto)**

---

## 🎯 What to Do Now

### Option 1: Fix Gmail Connection (Recommended)
Follow steps above to reconnect Gmail in EmailJS dashboard.

### Option 2: Use Current Fallback
Form already works with mailto fallback. Users will see their email client open.

### Option 3: Try Different Email Service
Instead of Gmail, use:
- Outlook/Hotmail
- Yahoo Mail
- Custom SMTP

---

## 📞 Still Not Working?

1. **Check EmailJS Status**: https://status.emailjs.com/
2. **View Logs**: EmailJS Dashboard → Logs
3. **Browser Console**: Press F12, check Console tab for errors
4. **Clear Cache**: Ctrl + Shift + Delete, clear browser cache
5. **Try Different Browser**: Test in Chrome, Firefox, Edge

---

## 💡 Pro Tip

EmailJS dashboard එකේ **Auto-reconnect** feature එකක් තියෙනවා:
- Settings → Auto-reconnect → Enable
- මේක enable කරොත් automatic ව reconnect වෙනවා!

---

## ✨ Summary

**Problem**: Gmail connection expired
**Solution**: Reconnect Gmail in EmailJS dashboard
**Time**: 2 minutes
**Current status**: Fallback working (form still functional)

---

Good luck! 🎉

If still having issues, feel free to:
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Contact EmailJS support
- Use the working mailto fallback
