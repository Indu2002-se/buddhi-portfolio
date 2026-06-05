# 📧 Email Setup Instructions (සිංහලෙන්)

## EmailJS භාවිතයෙන් Contact Form Setup කරන විදිහ

### Step 1: EmailJS Account එකක් හදන්න

1. **Website එකට යන්න**: https://www.emailjs.com/
2. **Sign Up** button එක click කරන්න
3. ඔබේ email එකෙන් account එකක් හදන්න (නොමිලේ)

### Step 2: Email Service එකක් Connect කරන්න

1. Dashboard එකේ **"Add New Service"** click කරන්න
2. **Gmail** select කරන්න (හෝ ඔබ use කරන email provider)
3. **"Connect Account"** click කරලා ඔබේ Gmail account එක connect කරන්න
4. Service එකට name එකක් දෙන්න (උදා: "gmail_service")
5. **"Create Service"** click කරන්න
6. **⚠️ Service ID එක copy කරන්න** (මේක ඕන වෙයි!)

### Step 3: Email Template එකක් හදන්න

1. Dashboard එකේ **"Email Templates"** වෙත යන්න
2. **"Create New Template"** click කරන්න
3. Template එක මේ විදිහට setup කරන්න:

**Template Name**: project_inquiry

**Template Settings**:
- **From Name**: Portfolio Contact Form
- **From Email**: {{email}} (client's email)
- **To Email**: bwithanage327@gmail.com (ඔබේ email)
- **Reply To**: {{email}}

**Subject Line**:
```
🔔 New Project Inquiry from {{name}}
```

**Content Type**: HTML

**Email Body** (HTML format):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <div style="font-size: 48px; margin-bottom: 10px;">💼</div>
    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">New Project Inquiry</h1>
  </div>

  <!-- Content -->
  <div style="padding: 30px;">
    <p style="color: #2c3e50; font-size: 16px; margin-bottom: 20px;">
      Hello Buddhi! 👋<br><br>
      You have received a new project inquiry:
    </p>

    <!-- Client Info -->
    <div style="background-color: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #ef4444;">
      <div style="color: #1a202c; font-size: 20px; font-weight: bold; margin-bottom: 10px;">{{name}}</div>
      <div style="margin: 8px 0;">
        <span style="color: #ef4444;">📧</span> 
        <a href="mailto:{{email}}" style="color: #3182ce;">{{email}}</a>
      </div>
      <div style="margin: 8px 0;">
        <span style="color: #ef4444;">📞</span> 
        <a href="tel:{{phone}}" style="color: #3182ce;">{{phone}}</a>
      </div>
    </div>

    <!-- Project Details -->
    <h2 style="color: #1a202c; font-size: 18px; margin: 20px 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
      📋 Project Details
    </h2>

    <div style="margin-bottom: 15px;">
      <div style="color: #718096; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Project Type</div>
      <div style="color: #1a202c; font-size: 15px; font-weight: bold; padding: 10px; background-color: #fef2f2; border-radius: 8px;">
        {{projectType}}
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="color: #718096; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Budget Range</div>
      <div style="color: #1a202c; font-size: 15px; font-weight: bold; padding: 10px; background-color: #f0fdf4; border-radius: 8px;">
        💰 {{budget}}
      </div>
    </div>

    <!-- Requirements -->
    <div style="border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
      <div style="color: #1a202c; font-size: 15px; font-weight: bold; margin-bottom: 10px;">
        📝 Project Requirements
      </div>
      <div style="color: #4a5568; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">{{requirements}}</div>
    </div>

    <!-- Action Buttons -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:{{email}}?subject=Re: Your Project Inquiry" style="display: inline-block; background: #ef4444; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; margin: 5px;">
        📧 Reply via Email
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="margin: 0; color: #718096; font-size: 13px;">
      Sent from your portfolio website contact form
    </p>
  </div>

</div>
```

**⚠️ වැදගත්**: 
- Template variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{projectType}}`, `{{budget}}`, `{{requirements}}`
- මේ variables code එකේ යවන data එක්ක match වෙන්න ඕන

4. **"Save"** click කරන්න
5. **⚠️ Template ID එක copy කරන්න** (මේක ඕන වෙයි!)

### Step 4: Public Key එක ගන්න

1. Dashboard එකේ **"Account"** section එකට යන්න
2. **"API Keys"** tab එක click කරන්න
3. **⚠️ Public Key එක copy කරන්න** (මේක ඕන වෙයි!)

### Step 5: Code එකේ Values Update කරන්න

දැන් `src/App.jsx` file එකේ මේ values update කරන්න:

```javascript
const serviceId = 'YOUR_SERVICE_ID';  // ← Step 2 එකෙන් copy කරපු Service ID දාන්න
const templateId = 'YOUR_TEMPLATE_ID'; // ← Step 3 එකෙන් copy කරපු Template ID දාන්න
const publicKey = 'YOUR_PUBLIC_KEY';   // ← Step 4 එකෙන් copy කරපු Public Key දාන්න
```

**උදාහරණයක්:**
```javascript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'Xy4BcD3fGh8jK_';
```

### Step 6: Test කරන්න

1. ඔබේ website එක run කරන්න:
   ```bash
   npm run dev
   ```

2. Contact form එකෙන් test message එකක් යවන්න

3. ඔබේ email එක check කරන්න - message එක ආවා නම් success! ✅

---

## 🔒 Security Tips

1. **Public Key එක public වෙන එක OK** - එකට "public" කියන්නේ ඒකයි
2. Service ID සහ Template ID public වෙන එකත් OK
3. **Private Key එක කවදාවත් code එකේ දාන්න එපා!**

---

## 🆓 Free Plan Limits

EmailJS Free Plan එකෙන්:
- මාසෙකට emails **200ක්** යවන්න පුළුවන්
- **2 email services** use කරන්න පුළුවන්
- **3 email templates** හදන්න පුළුවන්

වැඩි emails ඕන නම් paid plan එකක් ගන්න පුළුවන් (වැඩි details: https://www.emailjs.com/pricing)

---

## 🐛 Common Problems සහ විසඳුම්

### Problem 1: "Service ID not found"
**විසඳුම:** Service ID එක correctly copy කරලා තියෙනවද check කරන්න

### Problem 2: "Template ID not found"
**විසඳුම:** Template ID එක correctly copy කරලා තියෙනවද check කරන්න

### Problem 3: "Invalid public key"
**විසඳුම:** Public Key එක correctly copy කරලා තියෙනවද check කරන්න

### Problem 4: Emails එන්නේ නෑ
**විසඳුම:** 
- EmailJS dashboard එකේ "Logs" section එක check කරන්න
- Gmail account එක correctly connect වෙලා තියෙනවද check කරන්න
- Spam folder එක check කරන්න

---

## 📞 Alternative Methods

EmailJS වැඩ කරන්නේ නැත්නම් මේ alternatives use කරන්න පුළුවන්:

### Option 1: Formspree (ලේසි, නමුත් free plan එකේ limits තියෙනවා)
- Website: https://formspree.io/
- මාසෙකට submissions 50ක් free

### Option 2: Backend API එකක් හදන්න (Advanced)
- Node.js + Express backend එකක් හදන්න
- Nodemailer use කරලා emails යවන්න
- Hosting ඕන වෙයි (Heroku, Railway, etc.)

### Option 3: Netlify Forms (Netlify එකේ host කරනවා නම්)
- Netlify එකේ built-in form handling
- මාසෙකට submissions 100ක් free

---

## 📧 Email Templates

ඔබේ project folder එකේ email template files 2ක් තියෙනවා:

1. **EMAIL_TEMPLATE.html** - Full featured template with advanced styling
2. **EMAIL_TEMPLATE_SIMPLE.html** - Simple version (EmailJS compatible) ⭐ Use this one

EmailJS Template Editor එකේ HTML mode එකට switch කරලා `EMAIL_TEMPLATE_SIMPLE.html` file එකේ content එක copy/paste කරන්න.

**Template Variables** (මේවා code එකෙන් automatically fill වෙනවා):
- `{{name}}` - Client's name
- `{{email}}` - Client's email
- `{{phone}}` - Client's phone number  
- `{{projectType}}` - Type of project (web/mobile/backend/fullstack/other)
- `{{budget}}` - Budget range
- `{{requirements}}` - Detailed project requirements

---

## ✅ Next Steps

EmailJS setup කරපු පස්සේ:

1. ✅ Test message එකක් යවලා check කරන්න
2. ✅ Browser console එකේ errors තියෙනවද බලන්න
3. ✅ Different browsers එකේ test කරන්න
4. ✅ Mobile එකේ test කරන්න
5. ✅ Spam folder එක periodically check කරන්න

---

## 💡 Pro Tips

1. **Auto-reply Template එකක්** හදන්න - user ට instant confirmation email එකක් යවන්න
2. **Email notifications** on කරන්න - mobile එකටත් alerts එන්න
3. **Spam filter** setup කරන්න - unwanted messages block කරන්න
4. **Analytics** enable කරන්න - කීයක් දෙනෙක් contact කරනවද බලන්න

---

සාර්ථකව setup කරන්න පුළුවන් වේවා! 🎉

කිසි ප්‍රශ්නයක් තියෙනවා නම් EmailJS documentation එක බලන්න:
https://www.emailjs.com/docs/
