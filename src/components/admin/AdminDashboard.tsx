import { useState, useEffect } from 'react';
import {
  Package,
  LogOut,
  RefreshCw,
  Check,
  X,
  Save,
  AlertCircle,
} from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: string;
  numeric_price: number;
  price_note: string | null;
  tagline: string;
  description: string;
  image: string;
  category: string;
  in_stock: number;
  featured: number;
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export const AdminDashboard = ({ token, onLogout }: AdminDashboardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.products as Product[]);
      setError('');
    } catch {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      numeric_price: product.numeric_price,
      price_note: product.price_note,
      tagline: product.tagline,
      description: product.description,
      in_stock: product.in_stock,
    });
  };

  const handleSave = async (productId: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: productId, ...editForm }),
      });

      if (!res.ok) throw new Error('Failed to save');

      setSaveSuccess(productId);
      setEditingId(null);
      setTimeout(() => setSaveSuccess(null), 2000);
      fetchProducts();
    } catch {
      setError('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStock = async (product: Product) => {
    try {
      await fetch('/api/admin/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: product.id,
          in_stock: product.in_stock ? 0 : 1,
        }),
      });
      fetchProducts();
    } catch {
      setError('Error al actualizar stock');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="sticky top-0 z-10 bg-[#111827] border-b border-[#1F2937] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-[#8B5A2B]" />
            <h1 className="font-serif text-lg font-bold text-[#FAFAFA]">
              Admin <span className="font-light text-gray-400">/ Inventario</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchProducts}
              className="p-2 rounded-lg text-gray-400 hover:text-[#FAFAFA] hover:bg-[#1F2937] transition-colors cursor-pointer"
              title="Refrescar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_token');
                onLogout();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 text-xs font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-400/10 border border-red-400/30 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-[#8B5A2B] animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-500 text-xs font-mono mb-4">
              {products.length} producto{products.length !== 1 ? 's' : ''}
            </p>

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden"
              >
                {editingId === product.id ? (
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Nombre</label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-[#111827] border border-[#374151] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#8B5A2B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio</label>
                        <input
                          type="text"
                          value={editForm.price || ''}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-full bg-[#111827] border border-[#374151] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#8B5A2B]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editForm.tagline || ''}
                        onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                        className="w-full bg-[#111827] border border-[#374151] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#8B5A2B]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Descripción</label>
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#111827] border border-[#374151] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#8B5A2B] resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg border border-[#374151] text-gray-400 hover:text-[#FAFAFA] text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSave(product.id)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8B5A2B] hover:bg-[#6F441F] disabled:opacity-50 text-[#FAFAFA] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Guardando...' : 'Guardar'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#111827] border border-[#374151] shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-[#FAFAFA] truncate">
                          {product.name}
                        </h3>
                        {saveSuccess === product.id && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{product.brand} • {product.category}</p>
                      <p className="text-sm font-bold text-[#8B5A2B] mt-0.5">{product.price}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          product.in_stock
                            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                            : 'bg-red-400/10 text-red-400 border border-red-400/30'
                        }`}
                      >
                        {product.in_stock ? 'En Stock' : 'Agotado'}
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-gray-400 hover:text-[#FAFAFA] hover:bg-[#374151] transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <X className="w-4 h-4 hidden" />
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
