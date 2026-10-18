import { jsPDF } from 'jspdf';
import { RESUME_DATA } from '../data/portfolioData';
import defaultPortrait from '../assets/images/gautam_yadav_portrait_1791782839559.jpg';

/**
 * Convert an image URL or import to Base64 Data URL for embedding in PDF / HTML
 */
export const getImageBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('Could not convert image to base64:', err);
    return null;
  }
};

/**
 * Generate and download a real PDF file: Gautam_Kumar_Resume.pdf
 */
export const downloadResumePdf = async (customPhotoSrc?: string): Promise<boolean> => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;
    const contentWidth = pageWidth - margin * 2;

    // Header Background Accent Bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 42, 'F');

    // Teal accent line
    doc.setFillColor(13, 148, 136); // teal-600
    doc.rect(0, 42, pageWidth, 2.5, 'F');

    // Attempt to embed portrait image
    const photoToUse = customPhotoSrc || localStorage.getItem('gautam_custom_photo') || defaultPortrait;
    let imageAdded = false;

    try {
      let base64 = photoToUse;
      if (!photoToUse.startsWith('data:')) {
        base64 = (await getImageBase64(photoToUse)) || '';
      }

      if (base64 && base64.startsWith('data:image')) {
        // Embed square/rectangular portrait at top-right
        const imgWidth = 24;
        const imgHeight = 28;
        const imgX = pageWidth - margin - imgWidth;
        const imgY = 7;

        // White border backing
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 1, imgY - 1, imgWidth + 2, imgHeight + 2, 2, 2, 'F');

        doc.addImage(base64, 'JPEG', imgX, imgY, imgWidth, imgHeight, undefined, 'FAST');
        imageAdded = true;
      }
    } catch (e) {
      console.warn('PDF image embedding skipped:', e);
    }

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(RESUME_DATA.fullName.toUpperCase(), margin, 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(45, 212, 191); // teal-400
    doc.text(RESUME_DATA.title, margin, 24);

    // Contact Details in Header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240); // slate-200
    const contactLine1 = `Email: ${RESUME_DATA.contact.email}  |  Phone: ${RESUME_DATA.contact.phone}`;
    const contactLine2 = `GitHub: ${RESUME_DATA.contact.github}  |  Location: ${RESUME_DATA.contact.location}`;
    doc.text(contactLine1, margin, 31);
    doc.text(contactLine2, margin, 36);

    let yPos = 52;

    const drawSectionHeading = (title: string) => {
      if (yPos > pageHeight - 35) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(title.toUpperCase(), margin, yPos);

      // Accent underline
      doc.setDrawColor(13, 148, 136); // teal-600
      doc.setLineWidth(0.6);
      doc.line(margin, yPos + 1.5, margin + 45, yPos + 1.5);

      // Light gray full rule
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(margin + 46, yPos + 1.5, pageWidth - margin, yPos + 1.5);

      yPos += 7;
    };

    // 1. CAREER OBJECTIVE
    drawSectionHeading('Career Objective');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85); // slate-700
    const objectiveLines = doc.splitTextToSize(RESUME_DATA.objective, contentWidth);
    doc.text(objectiveLines, margin, yPos);
    yPos += objectiveLines.length * 4.4 + 4;

    // 2. EDUCATION
    drawSectionHeading('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(RESUME_DATA.education.degree, margin, yPos);
    
    // Year on right
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    const periodWidth = doc.getTextWidth(RESUME_DATA.education.period);
    doc.text(RESUME_DATA.education.period, pageWidth - margin - periodWidth, yPos);
    yPos += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(RESUME_DATA.education.institution, margin, yPos);
    yPos += 4.5;

    // Relevant Coursework
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('Relevant Coursework: ', margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const courseworkLines = doc.splitTextToSize(RESUME_DATA.education.coursework.join(', '), contentWidth - 36);
    doc.text(courseworkLines, margin + 35, yPos);
    yPos += courseworkLines.length * 4.2 + 4;

    // 3. TECHNICAL SKILLS
    drawSectionHeading('Technical Skills');
    
    const renderSkillRow = (categoryName: string, items: string[]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`•  ${categoryName}: `, margin, yPos);

      const labelWidth = doc.getTextWidth(`•  ${categoryName}: `);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const text = items.join(', ');
      const lines = doc.splitTextToSize(text, contentWidth - labelWidth - 2);
      doc.text(lines, margin + labelWidth, yPos);
      yPos += Math.max(lines.length * 4.2, 4.8);
    };

    RESUME_DATA.skills.forEach(skillCategory => {
      renderSkillRow(skillCategory.category, skillCategory.items);
    });
    yPos += 2;

    // 4. HIGHLIGHTED ENGINEERING PROJECTS
    drawSectionHeading('Highlighted Engineering Projects');

    RESUME_DATA.projects.forEach((proj, idx) => {
      if (yPos > pageHeight - 28) {
        doc.addPage();
        yPos = 20;
      }

      // Project title and badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}. ${proj.title}`, margin, yPos);

      const tagText = `[ ${proj.category} ]`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(13, 148, 136);
      doc.text(tagText, pageWidth - margin - doc.getTextWidth(tagText), yPos);
      yPos += 4.5;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const descLines = doc.splitTextToSize(proj.description, contentWidth - 4);
      doc.text(descLines, margin + 4, yPos);
      yPos += descLines.length * 4.2 + 3.5;
    });

    // Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = `Gautam Kumar Portfolio & Resume  •  Verified Candidate  •  gautamkumar07-lab  •  Generated ${new Date().toLocaleDateString()}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });

    // Save and download directly to computer / device
    doc.save('Gautam_Kumar_Resume.pdf');
    return true;
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    return false;
  }
};

/**
 * Download Standalone HTML Resume File: Gautam_Kumar_Resume.html
 */
export const downloadResumeHtml = async (customPhotoSrc?: string) => {
  try {
    const photoToUse = customPhotoSrc || localStorage.getItem('gautam_custom_photo') || defaultPortrait;
    let base64Photo = photoToUse;
    if (!photoToUse.startsWith('data:')) {
      base64Photo = (await getImageBase64(photoToUse)) || photoToUse;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gautam Kumar | Executive Resume</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 24px;
    }
    .resume-container {
      max-width: 850px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .photo-frame {
      width: 100px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
      border: 3px solid #14b8a6;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      flex-shrink: 0;
      background: #000;
    }
    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header-info h1 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }
    .header-info .title {
      color: #2dd4bf;
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      font-size: 13px;
      color: #cbd5e1;
    }
    .contacts a {
      color: #99f6e4;
      text-decoration: none;
    }
    .content {
      padding: 32px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0d9488;
      border-bottom: 2px solid #0d9488;
      padding-bottom: 4px;
      margin-bottom: 12px;
    }
    .section p {
      font-size: 14px;
      color: #334155;
    }
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .edu-degree {
      font-weight: 700;
      font-size: 15px;
      color: #0f172a;
    }
    .edu-period {
      font-weight: 700;
      font-size: 13px;
      color: #0d9488;
    }
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .skill-row {
      font-size: 13.5px;
      line-height: 1.5;
    }
    .skill-cat {
      font-weight: 700;
      color: #0f172a;
    }
    .project-card {
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .project-card:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .project-title {
      font-weight: 700;
      font-size: 14.5px;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
    }
    .project-tag {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: #f0fdfa;
      color: #0d9488;
      border: 1px solid #ccfbf1;
      font-weight: 600;
    }
    .actions-bar {
      max-width: 850px;
      margin: 0 auto 16px auto;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .btn {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      background: #0d9488;
      color: #ffffff;
      text-decoration: none;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .actions-bar { display: none !important; }
      .resume-container { border: none; box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="actions-bar">
    <button class="btn" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <div class="resume-container">
    <div class="header">
      <div class="header-info">
        <h1>${RESUME_DATA.fullName}</h1>
        <div class="title">${RESUME_DATA.title}</div>
        <div class="contacts">
          <span>📧 ${RESUME_DATA.contact.email}</span>
          <span>📞 ${RESUME_DATA.contact.phone}</span>
          <span>🌐 <a href="https://${RESUME_DATA.contact.github}" target="_blank">${RESUME_DATA.contact.github}</a></span>
          <span>📍 ${RESUME_DATA.contact.location}</span>
        </div>
      </div>
      <div class="photo-frame">
        <img src="${base64Photo}" alt="Gautam Kumar" />
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">Career Objective</div>
        <p>${RESUME_DATA.objective}</p>
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        <div class="edu-header">
          <div class="edu-degree">${RESUME_DATA.education.degree}</div>
          <div class="edu-period">${RESUME_DATA.education.period}</div>
        </div>
        <p style="color: #64748b; font-size: 13px; margin-bottom: 6px;">${RESUME_DATA.education.institution}</p>
        <p><strong>Relevant Coursework:</strong> ${RESUME_DATA.education.coursework.join(', ')}</p>
      </div>

      <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
          ${RESUME_DATA.skills
            .map(
              (s) =>
                `<div class="skill-row"><span class="skill-cat">• ${s.category}:</span> ${s.items.join(', ')}</div>`
            )
            .join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Highlighted Engineering Projects</div>
        ${RESUME_DATA.projects
          .map(
            (p) => `
          <div class="project-card">
            <div class="project-title">
              <span>${p.title}</span>
              <span class="project-tag">${p.category}</span>
            </div>
            <p style="margin-top: 4px; font-size: 13.5px;">${p.description}</p>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Gautam_Kumar_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Failed to download HTML resume:', err);
    return false;
  }
};

/**
 * Download Plain Text / ATS-Friendly Resume File: Gautam_Kumar_Resume.txt
 */
export const downloadResumeTxt = () => {
  try {
    const text = `================================================================================
${RESUME_DATA.fullName.toUpperCase()}
${RESUME_DATA.title}
================================================================================
Email:    ${RESUME_DATA.contact.email}
Phone:    ${RESUME_DATA.contact.phone}
GitHub:   https://${RESUME_DATA.contact.github}
Location: ${RESUME_DATA.contact.location}

--------------------------------------------------------------------------------
CAREER OBJECTIVE
--------------------------------------------------------------------------------
${RESUME_DATA.objective}

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
${RESUME_DATA.education.degree} (${RESUME_DATA.education.period})
${RESUME_DATA.education.institution}
Relevant Coursework:
${RESUME_DATA.education.coursework.join(', ')}

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
${RESUME_DATA.skills.map((s) => `${s.category}:\n  ${s.items.join(', ')}`).join('\n\n')}

--------------------------------------------------------------------------------
HIGHLIGHTED ENGINEERING PROJECTS
--------------------------------------------------------------------------------
${RESUME_DATA.projects.map((p, idx) => `${idx + 1}. ${p.title} [${p.category}]\n   ${p.description}`).join('\n\n')}

================================================================================
Generated from Portfolio: https://${RESUME_DATA.contact.github}
================================================================================
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Gautam_Kumar_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Failed to download text resume:', err);
    return false;
  }
};
