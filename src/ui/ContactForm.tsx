'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';

interface ContactFormProps {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
  };
  submit: string;
  thanks: string;
  sending: string;
}

export default function ContactForm({ title, subtitle, form, submit, thanks, sending }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // For static export, just show success
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact-form" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[--neon-cyan] blur-[200px] opacity-5 rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[800px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name & Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">
                {form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[--neon-lime]/50 focus:outline-none focus:ring-1 focus:ring-[--neon-lime]/30 transition-colors font-mono"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">
                {form.email}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[--neon-lime]/50 focus:outline-none focus:ring-1 focus:ring-[--neon-lime]/30 transition-colors font-mono"
                placeholder="john@company.com or @telegram"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">
              {form.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[--neon-lime]/50 focus:outline-none focus:ring-1 focus:ring-[--neon-lime]/30 transition-colors font-mono resize-none"
              placeholder="Describe your project or the process you want to automate..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className={`
                group relative px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300
                ${status === 'sent' 
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400 cursor-default'
                  : 'bg-[--neon-lime] text-black hover:shadow-[0_0_30px_var(--neon-lime)]'
                }
                disabled:opacity-70
              `}
            >
              <span className="flex items-center gap-3">
                {status === 'sending' && (
                  <>
                    <span className="animate-spin">⚡</span>
                    {sending}
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <FaCheck />
                    {thanks}
                  </>
                )}
                {(status === 'idle' || status === 'error') && (
                  <>
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    {submit}
                  </>
                )}
              </span>
            </button>
          </div>

          {status === 'error' && (
            <p className="text-center text-red-400 text-sm font-mono">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

