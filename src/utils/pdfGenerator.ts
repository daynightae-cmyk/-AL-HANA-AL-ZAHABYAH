type PdfProjectData = {
  projectTitle?: string;
  customerName?: string;
  projectType?: string;
  location?: string;
  progress?: number;
  estimateMin?: number;
  estimateMax?: number;
  milestones?: { stage_label?: string; status?: string; note?: string }[];
};

const loadPdfDeps = async () => {
  const jspdfModule = await import('jspdf');
  const html2canvasModule = await import('html2canvas');
  return {
    jsPDF: (jspdfModule as any).jsPDF,
    html2canvas: (html2canvasModule as any).default,
  };
};

export const generateProjectSummaryPDF = async (elementIdOrData: string | PdfProjectData) => {
  const { jsPDF, html2canvas } = await loadPdfDeps();

  if (typeof elementIdOrData === 'string') {
    const element = document.getElementById(elementIdOrData);
    if (!element) throw new Error('PDF source element not found');
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#070707' });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const img = canvas.toDataURL('image/png');
    const width = 210;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(img, 'PNG', 0, 0, width, Math.min(height, 297));
    pdf.save('AL-HANA-Project-Summary.pdf');
    return;
  }

  const data = elementIdOrData;
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.setFillColor(7, 7, 7);
  pdf.rect(0, 0, 210, 297, 'F');
  pdf.setTextColor(212, 175, 55);
  pdf.setFontSize(22);
  pdf.text('AL HANA AL ZAHABYAH', 18, 24);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.text('Professional Project Summary', 18, 34);
  pdf.setDrawColor(212, 175, 55);
  pdf.line(18, 42, 192, 42);

  pdf.setFontSize(11);
  pdf.setTextColor(245, 245, 245);
  const rows = [
    ['Project', data.projectTitle || 'Interior Design Project'],
    ['Customer', data.customerName || 'Client'],
    ['Project Type', data.projectType || 'Design & Decoration'],
    ['Location', data.location || 'United Arab Emirates'],
    ['Progress', `${data.progress ?? 0}%`],
    ['Generated', new Date().toLocaleDateString()],
  ];
  let y = 56;
  rows.forEach(([label, value]) => {
    pdf.setTextColor(212, 175, 55);
    pdf.text(label, 18, y);
    pdf.setTextColor(255, 255, 255);
    pdf.text(String(value), 65, y);
    y += 10;
  });

  if (data.estimateMin || data.estimateMax) {
    y += 4;
    pdf.setTextColor(212, 175, 55);
    pdf.text('Quote Estimate', 18, y);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`${data.estimateMin || 0} - ${data.estimateMax || 0} AED`, 65, y);
    y += 12;
  }

  pdf.setTextColor(212, 175, 55);
  pdf.text('Milestones', 18, y);
  y += 8;
  (data.milestones || []).forEach((m, i) => {
    pdf.setTextColor(255, 255, 255);
    pdf.text(`${i + 1}. ${m.stage_label || 'Stage'} — ${m.status || 'pending'}`, 22, y);
    y += 7;
  });

  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.text('www.alhanaalzahabyah.com | admin@alhanaalzahabyah.com | +971555587699', 18, 282);
  pdf.save('AL-HANA-Project-Summary.pdf');
};

export const generateInvoicePDF = generateProjectSummaryPDF;
