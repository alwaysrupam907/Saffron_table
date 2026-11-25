// A hand-drawn underline that draws itself when it scrolls into view.
export default function Under() {
  return (
    <svg className="draw absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 8c30-8 60 6 96-2s60-6 100 0" fill="none" stroke="#F5A524" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
