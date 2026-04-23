import re

with open('frontend/src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

# 1. Update font and Add @import
home_content = home_content.replace(":root {", "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');\n      :root {")
home_content = home_content.replace("'DM Sans'", "'Outfit'").replace("'Syne'", "'Outfit'")

# 2. Update Rocket
home_content = home_content.replace(
    '<div id="em-rocket" style="position:fixed; z-index:9999; font-size:12rem; pointer-events:none; left: -100px; bottom: -100px; transition: transform 0.1s ease-out">🚀</div>',
    '<div id="em-rocket" style="position:fixed; z-index:0; font-size:18rem; pointer-events:none; left: -150px; bottom: -150px; transition: transform 0.1s linear">🚀</div>'
)

# 3. Form fp1
home_content = re.sub(
    r'<div class="fpg act" id="fp1">.*?<div class="fnav">',
    '<div class="fpg act" id="fp1">\n      <div class="fgd">\n        <div class="fl full"><label>Full Name</label><input type="text" id="fn" placeholder="Your name"/></div>\n        <div class="fl"><label>Education Level</label><select id="fe"><option value="">Select</option><option>High School</option><option>Undergraduate</option><option>Postgraduate / PhD</option><option>Graduated / Working</option></select></div>\n        <div class="fl"><label>College / University</label><input type="text" id="fc" placeholder="Institution name"/></div>\n      </div>\n      <div class="fnav">',
    home_content,
    flags=re.DOTALL
)

# 4. Form fp2
home_content = re.sub(
    r'<div class="fl full"><label>Other skills.*?id="fh" placeholder="e.g. Chess, writing, gaming, open source..."></textarea></div>\n      </div>',
    '</div>',
    home_content,
    flags=re.DOTALL
)

# 5. Form fp3
home_content = re.sub(
    r'<div class="fpg" id="fp3">.*?<div class="fnav">',
    '<div class="fpg" id="fp3">\n      <div class="fgd">\n        <div class="fl full"><label>🎯 Target Role</label><input type="text" id="fro" placeholder="e.g. Backend Developer at a startup, ML Engineer"/></div>\n        <div class="fl full"><label>Biggest obstacle right now</label><textarea id="fob" placeholder="e.g. Weak DSA, no real projects..."></textarea></div>\n        <div class="fl"><label>Timeline</label><select id="ftl"><option value="">Select</option><option>3 months</option><option>6 months</option><option>1+ year</option></select></div>\n        <div class="fl"><label>Target location/domain</label><select id="fl2"><option value="">Select</option><option>Startup</option><option>MNC / Big Tech</option><option>Remote</option></select></div>\n      </div>\n      <div class="fnav">',
    home_content,
    flags=re.DOTALL
)

# 6. Form fp4
home_content = re.sub(
    r'<div class="fpg" id="fp4">.*?<div class="fnav">',
    '<div class="fpg" id="fp4">\n      <div class="fgd">\n        <div class="fl"><label>Learning style</label><select id="fls"><option value="">Select</option><option>Video courses</option><option>Reading docs / books</option><option>Building projects</option><option>Mix of everything</option></select></div>\n        <div class="fl"><label>Consistency level</label><select id="fco"><option value="">Select</option><option>Highly consistent</option><option>Moderate</option><option>Inconsistent</option></select></div>\n        <div class="fl full"><label>Anything else the AI should know?</label><textarea id="fex" rows="3" placeholder="Side projects, internships, special context..."></textarea></div>\n      </div>\n      <div class="fnav">',
    home_content,
    flags=re.DOTALL
)

with open('frontend/src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home_content)


# --- aiController tweaks ---
with open('backend/controllers/aiController.js', 'r', encoding='utf-8') as f:
    ai_content = f.read()

# Make model generation more creative and less static
# Wait, let's just do a simple replacement for the call: getGenerativeModel
ai_content = ai_content.replace(
    'genAI.getGenerativeModel({ model: "gemini-1.5-flash" })',
    'genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 0.85 } })'
)

# Inform the AI to be highly creative explicitly in the prompt
ai_content = ai_content.replace(
    'Be SPECIFIC to their GitHub languages, target role, GPA, college tier and obstacles. Do not give generic advice.',
    'Be HIGHLY SPECIFIC, CREATIVE, and UNIQUE to their GitHub languages, target role, and obstacles. Do NOT use generic or repetitive formatting. Personalize the language so that no two roadmaps sound exactly the same! Write entirely tailored content.'
)

with open('backend/controllers/aiController.js', 'w', encoding='utf-8') as f:
    f.write(ai_content)

print("Patch applied successfully.")
