# 🚀 Quick Setup Guide - Email Integration

## Step-by-Step Setup (5 minutes)

### 1️⃣ Create EmailJS Account
- Go to: https://www.emailjs.com/
- Click "Sign Up" (FREE)
- Verify your email

### 2️⃣ Add Email Service
- Dashboard → "Add New Service"
- Choose "Gmail"
- Click "Connect Account" 
- Authorize your Gmail
- **COPY the Service ID** (e.g., `service_abc123`)

### 3️⃣ Create Email Template
- Dashboard → "Email Templates"
- Click "Create New Template"
- **Template Name**: `project_inquiry`

**Settings**:
- From Name: `Portfolio Contact`
- To Email: `bwithanage327@gmail.com`
- Reply To: `{{email}}`

**Subject**:
```
🔔 New Project Inquiry from {{name}}
```

**Content**: 
- Switch to HTML mode
- Copy content from `EMAIL_TEMPLATE_SIMPLE.html` file
- Paste it in the editor
- **COPY the Template ID** (e.g., `template_xyz789`)

### 4️⃣ Get Public Key
- Dashboard → "Account" → "API Keys"
- **COPY your Public Key** (e.g., `Xy4BcD3fGh8jK_`)

### 5️⃣ Update Code
Open `src/App.jsx` and find these lines (around line 56):

```javascript
const serviceId = 'YOUR_SERVICE_ID';   // ← Paste Service ID here
const templateId = 'YOUR_TEMPLATE_ID'; // ← Paste Template ID here
const publicKey = 'YOUR_PUBLIC_KEY';   // ← Paste Public Key here
```

Replace with your actual values:

```javascript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'Xy4BcD3fGh8jK_';
```

### 6️⃣ Test It!
```bash
npm run dev
```

1. Open website in browser
2. Fill contact form
3. Submit
4. Check your email! 📧

---

## 🎨 Email Template Preview

Your clients will see a beautiful email with:

```
┌─────────────────────────────────┐
│     💼 New Project Inquiry      │
│    Portfolio Website Form       │
├─────────────────────────────────┤
│                                 │
│  👤 John Doe                    │
│  📧 john@example.com            │
│  📞 +1 555-0000                 │
│                                 │
│  📋 Project Details             │
│  ─────────────────              │
│  Project Type: Web Application  │
│  Budget: $5,000 - $10,000       │
│                                 │
│  📝 Requirements:               │
│  "I need a modern website..."   │
│                                 │
│  [📧 Reply via Email]           │
│                                 │
└─────────────────────────────────┘
```

---

## 📊 What Happens When Someone Submits?

1. **User fills form** on your website
2. **Form validates** data
3. **EmailJS sends** formatted email
4. **You receive** professional notification
5. **User sees** success message
6. **Everyone's happy!** 🎉

---

## 🆓 Free Plan Limits

EmailJS Free Tier:
- ✅ 200 emails/month
- ✅ 2 email services
- ✅ 3 email templates
- ✅ No credit card required

That's enough for most portfolios! If you need more, paid plans start at $7/month.

---

## ✨ Features

Your contact form now has:

- ✅ Professional email notifications
- ✅ Detailed project information
- ✅ Client contact details with clickable links
- ✅ Beautiful HTML formatting
- ✅ Loading states ("Sending...")
- ✅ Success/error messages
- ✅ Form validation
- ✅ Mobile responsive
- ✅ Works everywhere (no email client needed)

---

## 🐛 Troubleshooting

### Problem: "Service ID not found"
**Fix**: Double-check the Service ID in EmailJS dashboard

### Problem: "Invalid public key"
**Fix**: Make sure you copied the ENTIRE public key

### Problem: No emails received
**Fix**: 
1. Check EmailJS dashboard logs
2. Check spam folder
3. Verify Gmail connection is active

### Problem: Form not submitting
**Fix**: Open browser console (F12) and check for errors

---

## 📞 Need Help?

1. Check EmailJS docs: https://www.emailjs.com/docs/
2. Watch their tutorial videos
3. Check browser console for error messages
4. Test with simple text template first, then add HTML

---

## 🎯 Pro Tips

1. **Test first** with a simple template before using HTML
2. **Check spam folder** after first test
3. **Save IDs** in a secure note for future reference
4. **Enable notifications** in Gmail for instant alerts
5. **Create auto-reply** template for clients (optional)

---

## ✅ Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Service ID copied
- [ ] Email template created
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] Code updated with IDs
- [ ] Test email sent successfully
- [ ] Email received in inbox
- [ ] Ready to receive client inquiries! 🚀

---

**Setup Time**: ~5 minutes
**Difficulty**: Easy ⭐
**Cost**: FREE
**Result**: Professional contact form! 💼

Good luck! 🎉
