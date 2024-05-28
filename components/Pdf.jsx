"use client";
import Link from "next/link";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Pdf = ({ doc }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex flex-col items-center">
      <Document file={doc.url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p className="mb-5 text-center">
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button
          type="button"
          className="btn mb-3 mr-1 w-36 border-none bg-blue-400 text-white disabled:bg-blue-200"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn mb-3 ml-1 w-36 border-none bg-blue-400 text-white disabled:bg-blue-200"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <div>
        <Link
          href={doc.url}
          download={doc.url}
          target="_blank"
          className="btn w-52 border-none bg-darkest text-center text-white"
        >
          Download
        </Link>
      </div>
    </div>
  );
};

export default Pdf;
