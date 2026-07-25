'use client';

import { useState } from 'react';
import type { Locale, ContactFormData } from '@/types';
import { getDictionary } from '@/i18n/config';

interface ContactFormProps {
  locale: Locale;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const dict = getDictionary(locale);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">{dict.contact.nameLabel}</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={locale === 'tr' ? 'Adınızı giriniz...' : 'Enter your name...'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">{dict.contact.emailLabel}</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={locale === 'tr' ? 'ornek@email.com' : 'example@email.com'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          {dict.contact.phoneLabel}
          <span className="form-optional"> ({locale === 'tr' ? 'isteğe bağlı' : 'optional'})</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder={locale === 'tr' ? '05XX XXX XX XX' : '+1 (555) 123-4567'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">{dict.contact.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          className="form-input form-textarea"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={locale === 'tr' ? 'Mesajınızı yazınız...' : 'Write your message...'}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg contact-submit"
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? (locale === 'tr' ? 'Gönderiliyor...' : 'Sending...')
          : dict.contact.sendButton
        }
      </button>

      {status === 'success' && (
        <div className="form-message form-success">
          {dict.contact.successMessage}
        </div>
      )}

      {status === 'error' && (
        <div className="form-message form-error">
          {dict.contact.errorMessage}
        </div>
      )}
    </form>
  );
}
