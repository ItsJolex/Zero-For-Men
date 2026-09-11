import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error de autenticación');
        setLoading(false);
        return;
      }

      const data = await res.json();
      sessionStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch {
      setError('Error de conexión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B5A2B]/10 border border-[#8B5A2B]/30 mb-4">
            <Lock className="w-7 h-7 text-[#8B5A2B]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#0A0A0A] mb-1">Panel Admin</h1>
          <p className="text-[#0A0A0A]/70 text-sm">Zero For Men</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa tu PIN"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-4 py-3.5 pr-12 outline-none transition-colors placeholder-[#0A0A0A]/40"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/50 hover:text-[#8B5A2B] transition-colors cursor-pointer"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !pin}
              className="w-full bg-[#8B5A2B] hover:bg-[#6F441F] disabled:opacity-50 disabled:cursor-not-allowed text-[#FFFFFF] font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
