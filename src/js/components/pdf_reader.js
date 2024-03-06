//Laboratoire/src/compinents/pdf_reader.js
import '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';

let pdfjsLib;
let fulltext;

// Import the PDF.js library when the DOM is ready
document.addEventListener('DOMContentLoaded', async function(){
  pdfjsLib = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm');
});

async function extractTextFromPDF(pdf) {
    const numPages = pdf.numPages;
    let textContent = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const pageText = await page.getTextContent();
        textContent += '\n\n' + `Page ${pageNum}` + '\n\n'
        textContent += pageText.items.map(item => item.str + ' ').join('');
    }

    return textContent;
}

async function extractText(pdfInput) {
    return new Promise(async (resolve, reject) => {
        if (!pdfInput) {
            fulltext = "Erreur : absence de fichier";
            reject(fulltext);
        }

        if (!pdfjsLib) {
            fulltext = "Erreur : importation système ";
            reject(fulltext);
        }

        const fileReader = new FileReader();

        fileReader.onload = async function () {
            const typedArray = new Uint8Array(this.result);

            try {
                const loadingTask = pdfjsLib.getDocument(typedArray);
                const pdf = await loadingTask.promise;
                const textContent = await extractTextFromPDF(pdf);
                resolve(textContent);
            } catch (error) {
                fulltext = `Erreur lors de l'extraction du texte: ${error}`;
                reject(fulltext)
            }
        };

        fileReader.readAsArrayBuffer(pdfInput);
    });
}

export { extractText };
