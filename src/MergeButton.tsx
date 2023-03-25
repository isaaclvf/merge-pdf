import { PDFDocument } from "pdf-lib";

function MergeButton({ files }: { files: File[] }): JSX.Element {
  async function mergePDFs(files: File[]): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();

    for (let file of files) {
      const pdfBytes = await new Promise<Uint8Array>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) =>
          resolve(new Uint8Array(event.target?.result as ArrayBuffer));
        reader.readAsArrayBuffer(file);
      });

      const pdfDocToMerge = await PDFDocument.load(pdfBytes);
      const pages = await pdfDoc.copyPages(
        pdfDocToMerge,
        pdfDocToMerge.getPageIndices()
      );
      pages.forEach((page) => pdfDoc.addPage(page));
    }

    const mergedPdfBytes = await pdfDoc.save();
    return new Blob([mergedPdfBytes], { type: "application/pdf" });
  }

  const handleClick = async () => {
    const mergedPdfBlob = await mergePDFs(files);
    const pdfUrl = URL.createObjectURL(mergedPdfBlob);

    // Download the merged PDF
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "merged.pdf";
    link.click();

    // Or display the merged PDF in an iframe
    // return <iframe src={pdfUrl} width="100%" height="600px" />;
  };

  return <button onClick={handleClick}>Merge PDFs</button>;
}

export default MergeButton;
