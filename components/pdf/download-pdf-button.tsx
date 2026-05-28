"use client";

import jsPDF from "jspdf";

type Props = {
  audit: any;
};

export function DownloadPdfButton({
  audit,
}: Props) {
  function handleDownload() {
    const pdf =
      new jsPDF({
        orientation:
          "portrait",

        unit: "mm",

        format: "a4",
      });

    // BACKGROUND
    pdf.setFillColor(
      5,
      5,
      5
    );

    pdf.rect(
      0,
      0,
      210,
      297,
      "F"
    );

    // TOP GRADIENT BAR
    pdf.setFillColor(
      139,
      92,
      246
    );

    pdf.rect(
      0,
      0,
      210,
      16,
      "F"
    );

    // BRAND
    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(30);

    pdf.text(
      "CREDEX",
      20,
      34
    );

    pdf.setTextColor(
      180,
      180,
      180
    );

    pdf.setFontSize(15);

    pdf.text(
      "Executive AI Spend Audit",
      20,
      44
    );

    // HERO SAVINGS CARD
    pdf.setFillColor(
      14,
      14,
      14
    );

    pdf.roundedRect(
      20,
      58,
      170,
      42,
      8,
      8,
      "F"
    );

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFontSize(12);

    pdf.text(
      "ESTIMATED MONTHLY SAVINGS",
      30,
      76
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setTextColor(
      34,
      197,
      94
    );

    pdf.setFontSize(30);

    pdf.text(
      `$${audit.total_monthly_savings}`,
      30,
      92
    );

    // TEAM + YEARLY
    pdf.setFillColor(
      18,
      18,
      18
    );

    pdf.roundedRect(
      20,
      112,
      80,
      35,
      6,
      6,
      "F"
    );

    pdf.roundedRect(
      110,
      112,
      80,
      35,
      6,
      6,
      "F"
    );

    // TEAM
    pdf.setTextColor(
      180,
      180,
      180
    );

    pdf.setFontSize(11);

    pdf.text(
      "TEAM SIZE",
      30,
      126
    );

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(24);

    pdf.text(
      `${audit.team_size}`,
      30,
      140
    );

    // YEARLY
    pdf.setTextColor(
      180,
      180,
      180
    );

    pdf.setFontSize(11);

    pdf.text(
      "YEARLY SAVINGS",
      120,
      126
    );

    pdf.setTextColor(
      103,
      232,
      249
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(24);

    pdf.text(
      `$${audit.total_yearly_savings}`,
      120,
      140
    );

    // SECTION TITLE
    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFontSize(18);

    pdf.text(
      "Optimization Recommendations",
      20,
      170
    );

    let y = 182;

    if (
      !audit.recommendations ||
      audit.recommendations
        .length === 0
    ) {
      pdf.setTextColor(
        160,
        160,
        160
      );

      pdf.setFontSize(12);

      pdf.text(
        "No major optimization opportunities detected.",
        20,
        y
      );
    } else {
      audit.recommendations.forEach(
        (
          rec: any,
          index: number
        ) => {
          // CARD
          pdf.setFillColor(
            15,
            15,
            15
          );

          pdf.roundedRect(
            20,
            y,
            170,
            58,
            7,
            7,
            "F"
          );

          // LEFT ACCENT BAR
          pdf.setFillColor(
            139,
            92,
            246
          );

          pdf.roundedRect(
            20,
            y,
            4,
            58,
            2,
            2,
            "F"
          );

          // TOOL NAME
          pdf.setTextColor(
            255,
            255,
            255
          );

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(16);

          pdf.text(
            rec.tool,
            32,
            y + 14
          );

          // SAVINGS BADGE
          pdf.setFillColor(
            22,
            101,
            52
          );

          pdf.roundedRect(
            135,
            y + 7,
            40,
            12,
            4,
            4,
            "F"
          );

          pdf.setTextColor(
            255,
            255,
            255
          );

          pdf.setFontSize(11);

          pdf.text(
            `$${rec.monthlySavings}/mo`,
            143,
            y + 15
          );

          // CURRENT PLAN
          pdf.setTextColor(
            170,
            170,
            170
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(11);

          pdf.text(
            `Current: ${rec.currentPlan}`,
            32,
            y + 28
          );

          pdf.text(
            `Recommended: ${rec.recommendedPlan}`,
            32,
            y + 38
          );

          pdf.text(
            `Confidence: ${rec.confidence}`,
            32,
            y + 48
          );

          // REASON
          const reason =
            pdf.splitTextToSize(
              rec.reason,
              75
            );

          pdf.text(
            reason,
            100,
            y + 28
          );

          y += 72;

          // NEW PAGE
          if (y > 250) {
            pdf.addPage();

            pdf.setFillColor(
              5,
              5,
              5
            );

            pdf.rect(
              0,
              0,
              210,
              297,
              "F"
            );

            y = 30;
          }
        }
      );
    }

    // FOOTER
    pdf.setDrawColor(
      40,
      40,
      40
    );

    pdf.line(
      20,
      280,
      190,
      280
    );

    pdf.setTextColor(
      120,
      120,
      120
    );

    pdf.setFontSize(10);

    pdf.text(
      "Generated by CREDEX AI Audit Platform",
      20,
      287
    );

    pdf.save(
      "credex-executive-report.pdf"
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.06]"
    >
      Download PDF
    </button>
  );
}