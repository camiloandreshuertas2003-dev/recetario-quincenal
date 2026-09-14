'use client';

import { jsPDF } from 'jspdf';
import { Recipe } from '@/types';
import { scaleAmount } from '@/lib/storage';

function cleanFileName(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function exportRecipeToPdf(recipe: Recipe, servingMultiplier: number = 1.0): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 14;

  const totalServings = Math.round(recipe.yieldServings * servingMultiplier);
  const isCena = recipe.category === 'cena';

  // Helper for page break
  const checkAddPage = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 16) {
      doc.addPage();
      currentY = 14;
      renderHeaderMini();
    }
  };

  const renderHeaderMini = () => {
    doc.setFillColor(11, 159, 82); // Primary Brand Green
    doc.rect(margin, currentY, contentWidth, 1.5, 'F');
    currentY += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('NUESTRO MENÚ • ASISTENTE DE ALIMENTACIÓN COLOMBIANA', margin, currentY);
    doc.text(recipe.title, pageWidth - margin, currentY, { align: 'right' });
    currentY += 4;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 6;
  };

  // ==================== 1. BRAND HEADER ====================
  doc.setFillColor(11, 159, 82); // Brand green
  doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, 'F');

  // App Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('NUESTRO MENÚ', margin + 6, currentY + 9);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(232, 247, 238);
  doc.text(
    'Recetario Quincenal Colombiano • Cenas ricas que dejan listo el almuerzo del día siguiente',
    margin + 6,
    currentY + 16
  );

  // Right tag
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 38, currentY + 5, 34, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(18, 107, 58);
  doc.text('GUÍA COMPLETA', pageWidth - margin - 21, currentY + 10, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Paso a paso & Empaque', pageWidth - margin - 21, currentY + 14, { align: 'center' });

  currentY += 26;

  // ==================== 2. RECIPE TITLE & METADATA ====================
  doc.setFillColor(248, 250, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 26, 3, 3, 'FD');

  // Category Tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6); // Amber
  const catText = isCena
    ? 'CENA DE 4 PORCIONES (CENA + ALMUERZO DE MAÑANA)'
    : recipe.category === 'desayuno'
    ? 'DESAYUNO RÁPIDO Y COMPLETO'
    : 'ALMUERZO RECOMENDADO';
  doc.text(catText, margin + 5, currentY + 6);

  // Recipe Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(recipe.title, contentWidth - 10);
  doc.text(titleLines[0], margin + 5, currentY + 12.5);

  // Metadata Chips
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  const metaItems = [
    `Tiempo: ${recipe.prepTime || '35 min'}`,
    `Porciones: ${totalServings} ${totalServings === 1 ? 'porción' : 'porciones'}`,
    recipe.proteinType ? `Proteína: ${recipe.proteinType.toUpperCase()}` : null,
    recipe.carbType ? `Carbohidrato: ${recipe.carbType}` : null
  ].filter(Boolean);

  doc.text(metaItems.join('   |   '), margin + 5, currentY + 20);

  currentY += 30;

  // ==================== 3. MEAL PREP GOLDEN RULE ====================
  if (isCena) {
    doc.setFillColor(232, 247, 238); // Brand 50
    doc.setDrawColor(167, 243, 208); // Emerald 200
    doc.roundedRect(margin, currentY, contentWidth, 18, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(18, 107, 58);
    doc.text('REGLA DE ORO DEL CICLO NOCTURNO (4 PORCIONES):', margin + 5, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const ruleText =
      'Sirve 2 porciones calientes para cenar rico esta noche y separa de inmediato 2 porciones en recipientes herméticos para llevar al trabajo mañana. De esta forma tienes almuerzo garantizado sin cocinar al mediodía.';
    const splitRule = doc.splitTextToSize(ruleText, contentWidth - 10);
    doc.text(splitRule, margin + 5, currentY + 11);

    currentY += 22;
  }

  // ==================== 4. INGREDIENTS LIST ====================
  checkAddPage(30);

  doc.setFillColor(11, 159, 82);
  doc.circle(margin + 2.5, currentY + 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`INGREDIENTES EXACTOS (${recipe.ingredients.length})`, margin + 7, currentY + 3);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Cantidades calculadas para ${totalServings} porciones (puedes marcar la casilla [ ] al cocinar)`,
    margin + 7,
    currentY + 7
  );

  currentY += 10;

  const ingredients = recipe.ingredients;

  for (let i = 0; i < ingredients.length; i++) {
    checkAddPage(7);
    const ing = ingredients[i];
    const displayAmount = scaleAmount(ing.amount, servingMultiplier);

    // Box check square
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin + 1, currentY, 3.2, 3.2);

    // Amount in Bold Brand Green
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(11, 159, 82);
    doc.text(displayAmount, margin + 7, currentY + 2.7);

    const amountWidth = doc.getTextWidth(displayAmount);

    // Ingredient Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    const nameX = margin + 8 + amountWidth;
    const maxNameWidth = contentWidth - (nameX - margin);
    const nameLines = doc.splitTextToSize(ing.name, maxNameWidth);
    doc.text(nameLines[0], nameX, currentY + 2.7);

    // Note / raw weight note if present
    if (ing.note) {
      currentY += 3.8;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`* ${ing.note}`, margin + 7, currentY + 2);
    }

    currentY += 5.5;
  }

  currentY += 3;

  // ==================== 5. PREPARATION STEPS ====================
  checkAddPage(30);

  doc.setFillColor(11, 159, 82);
  doc.circle(margin + 2.5, currentY + 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`PASO A PASO DE COCCIÓN (${recipe.steps.length} PASOS)`, margin + 7, currentY + 3);

  currentY += 8;

  recipe.steps.forEach((step, idx) => {
    const stepText = step.trim();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const wrappedLines = doc.splitTextToSize(stepText, contentWidth - 14);
    const stepBoxHeight = Math.max(9, wrappedLines.length * 4.2 + 4);

    checkAddPage(stepBoxHeight + 2);

    // Step Number Badge (Filled circle)
    doc.setFillColor(241, 245, 249);
    doc.circle(margin + 4, currentY + 4, 3.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(18, 107, 58);
    doc.text(String(idx + 1), margin + 4, currentY + 5.2, { align: 'center' });

    // Step Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(wrappedLines, margin + 11, currentY + 4);

    currentY += stepBoxHeight + 2.5;
  });

  // ==================== 6. PACKING & FOOD SAFETY INSTRUCTIONS ====================
  if (recipe.packingInstructions) {
    checkAddPage(28);

    doc.setFillColor(254, 243, 199); // Amber 100
    doc.setDrawColor(251, 191, 36); // Amber 400
    doc.roundedRect(margin, currentY, contentWidth, 24, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(146, 64, 14);
    doc.text('GUÍA DE EMPAQUE HERMÉTICO Y SEGURIDAD ALIMENTARIA (MINSALUD / USDA):', margin + 5, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(69, 26, 3);
    const packingLines = doc.splitTextToSize(recipe.packingInstructions, contentWidth - 10);
    doc.text(packingLines, margin + 5, currentY + 11);

    // Safety bullet
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.2);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'Regla de las 2 horas: Deja entibiar brevemente y refrigera a menos de 4°C. Al día siguiente recalentar 2-3 min en microondas.',
      margin + 5,
      currentY + 20
    );

    currentY += 28;
  }

  // ==================== 7. BEVERAGE PAIRING (IF PRESENT) ====================
  if (recipe.beveragePairing) {
    checkAddPage(18);

    doc.setFillColor(238, 242, 255); // Indigo 50
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(margin, currentY, contentWidth, 14, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(49, 46, 129);
    doc.text(`BEBIDA RECOMENDADA: ${recipe.beveragePairing.name.toUpperCase()}`, margin + 5, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 27, 75);
    doc.text(recipe.beveragePairing.description, margin + 5, currentY + 10);

    currentY += 18;
  }

  // ==================== 8. PAGE FOOTER ON ALL PAGES ====================
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Nuestro menú • Recetario Quincenal para Hogares Colombianos • https://optimistic-kepler.vercel.app',
      margin,
      pageHeight - 7
    );
    doc.text(`Página ${p} de ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  // Trigger Save / Download
  const fileName = `${cleanFileName(recipe.title)}-Nuestro-Menu.pdf`;
  doc.save(fileName);
}

/**
 * Alternative: Opens an elegant browser print sheet (Guardar como PDF nativo)
 */
export function printRecipe(recipe: Recipe, servingMultiplier: number = 1.0): void {
  const totalServings = Math.round(recipe.yieldServings * servingMultiplier);
  const isCena = recipe.category === 'cena';

  const printWindow = window.open('', '_blank', 'width=850,height=900');
  if (!printWindow) {
    // Fallback directly to jsPDF download if popup blocked
    exportRecipeToPdf(recipe, servingMultiplier);
    return;
  }

  const catText = isCena
    ? 'CENA DE 4 PORCIONES (CENA + ALMUERZO DE MAÑANA)'
    : recipe.category === 'desayuno'
    ? 'DESAYUNO RÁPIDO Y COMPLETO'
    : 'ALMUERZO RECOMENDADO';

  const ingredientsHtml = recipe.ingredients
    .map((ing) => {
      const displayAmount = scaleAmount(ing.amount, servingMultiplier);
      return `
        <li style="display:flex; align-items:flex-start; margin-bottom: 8px; font-size: 13px; line-height: 1.4;">
          <span style="display:inline-block; width: 14px; height: 14px; border: 1.5px solid #0B9F52; border-radius: 3px; margin-right: 10px; margin-top: 2px; flex-shrink: 0;"></span>
          <div>
            <strong style="color: #0B9F52; font-family: monospace; font-size: 13.5px; margin-right: 6px;">${displayAmount}</strong>
            <span style="color: #1e293b; font-weight: 600;">${ing.name}</span>
            ${ing.note ? `<div style="font-size: 11px; color: #64748b; font-style: italic; margin-top: 1px;">${ing.note}</div>` : ''}
          </div>
        </li>
      `;
    })
    .join('');

  const stepsHtml = recipe.steps
    .map((step, idx) => {
      return `
        <div style="display:flex; align-items:flex-start; margin-bottom: 12px; font-size: 13px; line-height: 1.5;">
          <span style="display:flex; align-items:center; justify-content:center; width: 22px; height: 22px; background: #E8F7EE; color: #126B3A; font-weight: 800; border-radius: 50%; font-size: 11px; margin-right: 10px; flex-shrink: 0; margin-top: 1px;">
            ${idx + 1}
          </span>
          <p style="margin: 0; color: #334155; font-weight: 500;">${step}</p>
        </div>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>${recipe.title} - Nuestro menú</title>
      <style>
        @page {
          size: A4;
          margin: 12mm 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          margin: 0;
          padding: 20px;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header {
          background: linear-gradient(135deg, #0B9F52, #126B3A);
          color: white;
          padding: 16px 20px;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .brand-sub {
          font-size: 11px;
          color: #E8F7EE;
          margin-top: 3px;
        }
        .recipe-box {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
          background: #f8fafc;
          margin-bottom: 16px;
        }
        .badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          background: #FEF3C7;
          color: #92400E;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .recipe-title {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
          margin: 4px 0 10px 0;
        }
        .meta-row {
          font-size: 12px;
          color: #475569;
          font-weight: 600;
          display: flex;
          gap: 16px;
        }
        .rule-box {
          background: #E8F7EE;
          border-left: 4px solid #0B9F52;
          padding: 12px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 12.5px;
          color: #126B3A;
          line-height: 1.4;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 24px;
        }
        h2 {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #0f172a;
          border-bottom: 2px solid #0B9F52;
          padding-bottom: 6px;
          margin-top: 0;
          margin-bottom: 12px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .packing-box {
          background: #FFFBEB;
          border: 1px solid #FDE68A;
          padding: 12px 14px;
          border-radius: 12px;
          margin-top: 20px;
          font-size: 12px;
          color: #78350F;
        }
        .footer {
          margin-top: 30px;
          padding-top: 10px;
          border-top: 1px solid #e2e8f0;
          font-size: 10px;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
        }
        .print-btn-bar {
          position: fixed;
          top: 12px;
          right: 12px;
          background: #0B9F52;
          color: #fff;
          padding: 10px 18px;
          border-radius: 24px;
          border: none;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 159, 82, 0.4);
        }
        @media print {
          .print-btn-bar { display: none; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <button class="print-btn-bar" onclick="window.print()">📥 Imprimir / Guardar como PDF</button>

      <div class="header">
        <div>
          <h1 class="brand-title">NUESTRO MENÚ</h1>
          <div class="brand-sub">Recetario Quincenal Colombiano • Cenas que dejan listo el almuerzo del día siguiente</div>
        </div>
        <div style="text-align: right; font-size: 11px; font-weight: bold;">
          <div>Plan Quincenal</div>
          <div style="opacity: 0.85;">2 Personas</div>
        </div>
      </div>

      <div class="recipe-box">
        <span class="badge">${catText}</span>
        <h2 class="recipe-title">${recipe.title}</h2>
        <div class="meta-row">
          <span>⏱️ Tiempo: <strong>${recipe.prepTime || '35 min'}</strong></span>
          <span>👥 Porciones: <strong>${totalServings} porciones</strong></span>
          ${recipe.proteinType ? `<span>🥩 Proteína: <strong>${recipe.proteinType.toUpperCase()}</strong></span>` : ''}
          ${recipe.carbType ? `<span>🌾 Carbohidrato: <strong>${recipe.carbType}</strong></span>` : ''}
        </div>
      </div>

      ${
        isCena
          ? `
        <div class="rule-box">
          <strong>🍱 REGLA DE ORO (4 PORCIONES):</strong>
          Sirve 2 porciones calientes para cenar rico esta noche y separa de inmediato 2 porciones en recipientes herméticos limpios para llevar al trabajo mañana. ¡Cero minutos de cocina al mediodía!
        </div>
      `
          : ''
      }

      <div class="grid">
        <div>
          <h2>Ingredientes (${recipe.ingredients.length})</h2>
          <ul>
            ${ingredientsHtml}
          </ul>
        </div>

        <div>
          <h2>Preparación (${recipe.steps.length} Pasos)</h2>
          <div>
            ${stepsHtml}
          </div>
        </div>
      </div>

      ${
        recipe.packingInstructions
          ? `
        <div class="packing-box">
          <strong style="display:block; margin-bottom: 4px; font-size: 13px;">📦 Empaque Hermético y Conservación Segura (MinSalud / USDA):</strong>
          <p style="margin: 0; line-height: 1.4;">${recipe.packingInstructions}</p>
          <div style="margin-top: 6px; font-size: 11px; font-style: italic; opacity: 0.9;">
            💡 No dejes enfriar por más de 2 horas sobre el mesón. Refrigera inmediatamente a menos de 4°C y recalienta 2-3 minutos hasta que humee.
          </div>
        </div>
      `
          : ''
      }

      <div class="footer">
        <span>Nuestro menú • https://optimistic-kepler.vercel.app</span>
        <span>¡Buen provecho en casa y en el trabajo!</span>
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 300);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
