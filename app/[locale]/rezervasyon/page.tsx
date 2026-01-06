'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { trackBookingSubmit, trackCall } from '@/lib/analytics';

export default function BookingPage() {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    from: '',
    to: '',
    passengers: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      trackBookingSubmit({
        locale,
        pagePath: pathname,
        ctaLocation: 'hero',
      });
      setSubmitted(true);
    } catch (err) {
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-green-800 mb-4">{tCommon('success')}</h2>
          <p className="text-green-700 mb-6">{t('form.success')}</p>
          <button
            type="button"
            onClick={() => {
              trackCall({
                locale,
                pagePath: pathname,
                ctaLocation: 'hero',
              });
              window.location.href = `tel:${tCommon('phone')}`;
            }}
            className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block"
          >
            {tCommon('callNow')}
          </button>
        </div>
      </div>
    );
  }

  const mailtoLink = `mailto:info@urguptaxi.com?subject=${encodeURIComponent(tCommon('bookingRequest'))}&body=${encodeURIComponent(
    `${t('form.name')}: ${formData.name}\n${t('form.phone')}: ${formData.phone}\n${t('form.email')}: ${formData.email}\n${t('form.date')}: ${formData.date}\n${t('form.time')}: ${formData.time}\n${t('form.from')}: ${formData.from}\n${t('form.to')}: ${formData.to}\n${t('form.passengers')}: ${formData.passengers}`
  )}`;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
      <p className="text-xl text-gray-600 mb-8">{t('description')}</p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.date')}
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.time')}
              </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.from')}
            </label>
            <input
              type="text"
              id="from"
              name="from"
              required
              value={formData.from}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.to')}
            </label>
            <input
              type="text"
              id="to"
              name="to"
              required
              value={formData.to}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.passengers')}
            </label>
            <select
              id="passengers"
              name="passengers"
              required
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{t('form.error')}</p>
              <a href={mailtoLink} className="text-red-600 underline mt-2 inline-block">
                {tCommon('orEmailUs')}
              </a>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
            className="flex-1 bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              {t('form.submit')}
            </button>
            <a
              href={mailtoLink}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
            >
              {tCommon('emailInstead')}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
