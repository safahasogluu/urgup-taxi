'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-warm-sandstone/30 overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-warm-cream transition-colors"
          >
            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600 border-t border-warm-sandstone/20">
              <p className="pt-4">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

