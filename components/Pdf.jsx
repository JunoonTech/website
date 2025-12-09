"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Pdf = ({ doc }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.clientWidth);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex w-full flex-col items-center px-2 sm:px-4" ref={wrapperRef}>
      <div className="w-full flex justify-center" style={{ overflow: 'hidden' }}>
        <div className="w-full max-w-full flex justify-center">
          <Document file={doc.url} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
            <Page 
              pageNumber={pageNumber} 
              width={containerWidth ? Math.min(containerWidth - 16, 800) : null} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Document>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-4 w-full max-w-full">
        <p className="mb-4 sm:mb-5 text-center text-sm sm:text-base px-2">
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <div className="flex justify-center gap-2 sm:gap-3 mb-3 w-full px-2">
          <button
            type="button"
            className="btn w-24 sm:w-32 md:w-36 text-xs sm:text-sm border-none bg-blue-400 text-white disabled:bg-blue-200 py-2 sm:py-3"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn w-24 sm:w-32 md:w-36 text-xs sm:text-sm border-none bg-blue-400 text-white disabled:bg-blue-200 py-2 sm:py-3"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-full px-2 flex justify-center">
        <Link
          href={doc.url}
          download={doc.url}
          target="_blank"
          className="btn w-40 sm:w-48 md:w-52 border-none bg-darkest text-center text-white block text-sm sm:text-base py-2 sm:py-3"
        >
          Download
        </Link>
      </div>
    </div>
  );
};

export default Pdf;
