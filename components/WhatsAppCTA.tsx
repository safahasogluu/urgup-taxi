'use client';

import { useState, useCallback, useEffect, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { trackWhatsApp } from '@/lib/analytics';
import {
  WHATSAPP_NUMBER,
  MessageLanguage,
  LANGUAGE_LABELS,
  TransferFormData,
  buildWhatsAppUrl,
  buildAirportTransferMessage,
  buildVipTransferMessage,
  buildTaxiMessage,
  getStoredLanguage,
  storeLanguage,
} from '@/lib/whatsapp';

interface WhatsAppCTAProps {
  routeFrom?: string;
  routeTo?: string;
  routeType?: 'airport' | 'vip' | 'taxi';
  className?: string;
  buttonText?: string;
}

export default function WhatsAppCTA({ 
  routeFrom = '', 
  routeTo = '', 
  routeType = 'airport',
  className = '',
  buttonText,
}: WhatsAppCTAProps) {
  const [showModal, setShowModal] = useState(false);
  const [messageLang, setMessageLang] = useState<MessageLanguage>('tr');
  const locale = useLocale();
  const t = useTranslations('common');
  const tWa = useTranslations('whatsapp');
  
  // Initialize language from localStorage on mount
  useEffect(() => {
    setMessageLang(getStoredLanguage(locale));
  }, [locale]);

  // Form state with defaults from route
  const [formData, setFormData] = useState<TransferFormData>({
    pickup: routeFrom,
    dropoff: routeTo,
    date: '',
    time: '',
    passengers: '2',
    luggage: '',
    hotel: '',
    flightNo: '',
  });

  const handleOpenModal = useCallback(() => {
    setFormData({
      pickup: routeFrom,
      dropoff: routeTo,
      date: '',
      time: '',
      passengers: '2',
      luggage: '',
      hotel: '',
      flightNo: '',
    });
    setShowModal(true);
  }, [routeFrom, routeTo]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLanguageChange = useCallback((lang: MessageLanguage) => {
    setMessageLang(lang);
    storeLanguage(lang);
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    trackWhatsApp();
    
    let message: string;
    switch (routeType) {
      case 'vip':
        message = buildVipTransferMessage(formData, messageLang);
        break;
      case 'taxi':
        message = buildTaxiMessage(formData, messageLang);
        break;
      default:
        message = buildAirportTransferMessage(formData, messageLang);
    }
    
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, '_blank');
    setShowModal(false);
  }, [routeType, formData, messageLang]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`btn-whatsapp px-6 py-3 text-lg inline-flex items-center justify-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {buttonText || tWa('getQuote')}
      </button>

      {/* Form Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-basalt-900">
              {tWa('formTitle')}
            </h3>
            
            {/* Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-basalt-700 mb-2">
                {tWa('selectLanguage')}
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(LANGUAGE_LABELS) as MessageLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      messageLang === lang
                        ? 'bg-primary-600 text-white'
                        : 'bg-sand-100 text-basalt-700 hover:bg-sand-200'
                    }`}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pickup */}
              <div>
                <label htmlFor="pickup" className="block text-sm font-medium text-basalt-700 mb-1">
                  {tWa('pickup')} *
                </label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={routeFrom || 'Urgup, Goreme...'}
                />
              </div>

              {/* Dropoff */}
              <div>
                <label htmlFor="dropoff" className="block text-sm font-medium text-basalt-700 mb-1">
                  {tWa('dropoff')} *
                </label>
                <input
                  type="text"
                  id="dropoff"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={routeTo || 'ASR, NAV...'}
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-basalt-700 mb-1">
                    {tWa('date')} *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={minDate}
                    required
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-basalt-700 mb-1">
                    {tWa('time')} *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Passengers and Luggage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-basalt-700 mb-1">
                    {tWa('passengers')} *
                  </label>
                  <select
                    id="passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                    <option value="9+">9+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="luggage" className="block text-sm font-medium text-basalt-700 mb-1">
                    {tWa('luggage')} *
                  </label>
                  <select
                    id="luggage"
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">{tWa('luggage')}</option>
                    <option value={tWa('luggageSmall')}>{tWa('luggageSmall')}</option>
                    <option value={tWa('luggageMedium')}>{tWa('luggageMedium')}</option>
                    <option value={tWa('luggageLarge')}>{tWa('luggageLarge')}</option>
                  </select>
                </div>
              </div>

              {/* Hotel/Address */}
              <div>
                <label htmlFor="hotel" className="block text-sm font-medium text-basalt-700 mb-1">
                  {tWa('hotel')} *
                </label>
                <input
                  type="text"
                  id="hotel"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Hotel Cappadocia..."
                />
              </div>

              {/* Flight Number (optional for airport transfers) */}
              {routeType === 'airport' && (
                <div>
                  <label htmlFor="flightNo" className="block text-sm font-medium text-basalt-700 mb-1">
                    {tWa('flightNo')}
                  </label>
                  <input
                    type="text"
                    id="flightNo"
                    name="flightNo"
                    value={formData.flightNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="TK1234"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-whatsapp py-3 text-lg font-semibold mt-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {tWa('sendMessage')}
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-2 text-basalt-600 hover:text-basalt-800 transition-colors"
              >
                {tWa('cancel')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
