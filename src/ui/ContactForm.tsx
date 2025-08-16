'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface ContactFormProps {
  title: string;
  form: {
    name: string;
    email: string;
    message: string;
  };
  submit: string;
  thanks: string;
  copy: {
    contact_messages: {
      response_time: string;
    };
    roi_results: {
      sending: string;
    };
  };
}

export default function ContactForm({ title, form, submit, thanks, copy }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to server action that sends to Telegram
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  if (isSubmitted) {
    return (
      <section id="contact" className="py-32 bg-gradient-to-t from-[--background]/60 to-[#0F0F1A]/60 backdrop-blur-sm">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center glass-hover p-12"
            >
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-3xl font-bold text-[--accent] mb-4">
                {thanks}
              </h3>
              <p className="text-lg opacity-80">
                {copy.contact_messages.response_time}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="contact" className="py-32 bg-gradient-to-t from-[--background]/60 to-[#0F0F1A]/60 backdrop-blur-sm">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h2>
          </motion.div>
          
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-hover p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {form.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-[--background] border border-[--subtle] rounded-lg focus:border-[--accent] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {form.email}
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-[--background] border border-[--subtle] rounded-lg focus:border-[--accent] focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                {form.message}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 bg-[--background] border border-[--subtle] rounded-lg focus:border-[--accent] focus:outline-none transition-colors resize-vertical"
              />
            </div>
            
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? copy.roi_results.sending : submit}
              </Button>
            </div>
            
            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          </motion.form>
        </div>
      </div>
    </section>
  );
}