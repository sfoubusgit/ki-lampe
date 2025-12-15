'use client';
import { useState } from 'react';

export default function NewsletterLeadMagnet({ leadSlug = '10-ki-prompts-grafiktablett' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, lead: leadSlug })
    });
    
    const data = await res.json();
    
    if (data.success || data.message) {
  setSuccess(true);
  setDownloadUrl(`/downloads/${leadSlug}.pdf`);  // ← HARDCODE PDF-Pfad!
}
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-emerald-500/20 p-6 rounded-lg border border-emerald-500">
        <h3 className="text-xl font-bold text-emerald-100 mb-4">✅ Download freigeschaltet!</h3>
        <a href={downloadUrl} download className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold block text-center hover:bg-emerald-700">
          📄 PDF jetzt herunterladen
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900/50 p-8 rounded-2xl border border-emerald-500/50 shadow-2xl">
      <h3 className="text-2xl font-bold text-emerald-300 mb-4 text-center">
        💚 10 KI-Prompts GRATIS!
      </h3>
      <p className="text-slate-300 mb-6 text-center">
        Für Wacom/iPad Künstler: Von Sketch zu Artstation in Minuten
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Deine E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
        />
        <label className="flex items-center space-x-2 text-sm text-slate-400">
          <input type="checkbox" required className="w-4 h-4 text-emerald-500" />
          <span>Ich stimme der Datenspeicherung zu (DSGVO)</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 transition-all"
        >
          {loading ? '🔄 Lade...' : '📥 Jetzt herunterladen'}
        </button>
      </form>
    </div>
  );
}