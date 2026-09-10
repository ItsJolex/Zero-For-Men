import { useState, useEffect } from 'react';
import {
  Package,
  LogOut,
  RefreshCw,
  Check,
  X,
  Save,
  AlertCircle,
  Tag,
  DollarSign,
  Edit3
} from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: string;
  numeric_price: number;
  compare_at_price: string | null;
  numeric_compare_at_price: number | null;
  discount_percent: number | null;
  price_note: string | null;
  tagline: string;
  description: string;
  image: string;
  category: string;
  in_stock: number;
  featured: number;
  movement: string | null;
  case_material: string | null;
  water_resistance: string | null;
  glass_type: string | null;
  specs: string[];
  badges: string[];
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
  const [bcvRate, setBcvRate] = useState<number | null>(null);
  const [isEditingFull, setIsEditingFull] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch BCV rate
  useEffect(() => {
    const fetchBcvRate = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
        const data = await response.json();
        setBcvRate(data.promedio);
      } catch (err) {
        console.error('Error fetching BCV rate:', err);
      }
    };
    fetchBcvRate();
  }, []);

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
      price: product.price,
      numeric_price: product.numeric_price,
      compare_at_price: product.compare_at_price,
      numeric_compare_at_price: product.numeric_compare_at_price,
      discount_percent: product.discount_percent,
      in_stock: product.in_stock,
    });
  };

  const handleEditFull = (product: Product) => {
    setEditingId(product.id);
    setIsEditingFull(true);
    setEditForm({ ...product });
  };

  const handleCloseFullEdit = () => {
    setIsEditingFull(false);
    setEditingId(null);
  };

  const calculateDiscountPercent = (regularPrice: number | null, salePrice: number | null): number | null => {
    if (!regularPrice || !salePrice || regularPrice <= salePrice) return null;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  const handlePriceChange = (field: string, value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    setEditForm(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'numeric_price') {
        updated.price = `$${numericValue.toFixed(2)}`;
        if (updated.numeric_compare_at_price) {
          updated.discount_percent = calculateDiscountPercent(updated.numeric_compare_at_price, numericValue);
        }
      } else if (field === 'numeric_compare_at_price') {
        updated.compare_at_price = `$${numericValue.toFixed(2)}`;
        if (updated.numeric_price) {
          updated.discount_percent = calculateDiscountPercent(numericValue, updated.numeric_price);
        }
      } else if (field === 'price') {
        updated.numeric_price = numericValue;
        if (updated.numeric_compare_at_price) {
          updated.discount_percent = calculateDiscountPercent(updated.numeric_compare_at_price, numericValue);
        }
      } else if (field === 'compare_at_price') {
        updated.numeric_compare_at_price = numericValue;
        if (updated.numeric_price) {
          updated.discount_percent = calculateDiscountPercent(numericValue, updated.numeric_price);
        }
      }
      
      return updated;
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
      setIsEditingFull(false);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inStockCount = products.filter(p => p.in_stock).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div className="min-h-screen bg-[#090A0C]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#090A0C] border-b border-[#2A2A2A] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
              <Package className="w-4 h-4 text-[#090A0C]" />
            </div>
            <h1 className="font-serif text-lg font-bold text-[#FAFAFA]">
              Admin <span className="font-light text-gray-400">/ Inventario</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchProducts}
              className="p-2 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-mono">Total</p>
                <p className="text-2xl font-bold text-[#FAFAFA]">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-mono">En Stock</p>
                <p className="text-2xl font-bold text-[#FAFAFA]">{inStockCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-mono">Agotados</p>
                <p className="text-2xl font-bold text-[#FAFAFA]">{outOfStockCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-mono">Tasa BCV</p>
                <p className="text-xl font-bold text-[#FAFAFA]">
                  {bcvRate ? `Bs. ${bcvRate.toFixed(2)}` : '...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-400/10 border border-red-400/30 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-[#D4AF37] animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-500 text-xs font-mono mb-4">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} mostrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden"
              >
                {editingId === product.id && !isEditingFull ? (
                  // Quick Edit Mode
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio Oferta</label>
                        <input
                          type="text"
                          value={editForm.price || ''}
                          onChange={(e) => handlePriceChange('price', e.target.value)}
                          className="w-full bg-[#090A0C] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                        />
                        {bcvRate && editForm.numeric_price && (
                          <p className="text-[10px] text-gray-500 mt-1">
                            ≈ Bs. {(editForm.numeric_price * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio Regular</label>
                        <input
                          type="text"
                          value={editForm.compare_at_price || ''}
                          onChange={(e) => handlePriceChange('compare_at_price', e.target.value)}
                          className="w-full bg-[#090A0C] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                        />
                        {editForm.discount_percent && editForm.discount_percent > 0 && (
                          <p className="text-[10px] text-emerald-500 mt-1">
                            {editForm.discount_percent}% OFF
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-gray-400 hover:text-[#FAFAFA] text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSave(product.id)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#C9A02A] hover:to-[#A87609] disabled:opacity-50 text-[#090A0C] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Guardando...' : 'Guardar'}</span>
                      </button>
                    </div>
                  </div>
                ) : editingId === product.id && isEditingFull ? (
                  // Full Edit Mode (Drawer/Modal)
                  <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseFullEdit}></div>
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#090A0C] border-l border-[#2A2A2A] shadow-2xl flex flex-col animate-slideInRight">
                      <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
                        <h2 className="font-serif text-lg font-bold text-[#FAFAFA]">Editar Producto</h2>
                        <button
                          onClick={handleCloseFullEdit}
                          className="p-2 rounded-lg text-gray-500 hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        {/* Basic Info */}
                        <div>
                          <h3 className="text-sm font-bold text-[#D4AF37] mb-3">Información Básica</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Nombre</label>
                              <input
                                type="text"
                                value={editForm.name || ''}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Marca</label>
                                <input
                                  type="text"
                                  value={editForm.brand || ''}
                                  onChange={(e) => setEditForm({...editForm, brand: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Categoría</label>
                                <input
                                  type="text"
                                  value={editForm.category || ''}
                                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Tagline</label>
                              <input
                                type="text"
                                value={editForm.tagline || ''}
                                onChange={(e) => setEditForm({...editForm, tagline: e.target.value})}
                                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Prices */}
                        <div>
                          <h3 className="text-sm font-bold text-[#D4AF37] mb-3">Precios</h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio Oferta</label>
                                <input
                                  type="text"
                                  value={editForm.price || ''}
                                  onChange={(e) => handlePriceChange('price', e.target.value)}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                                {bcvRate && editForm.numeric_price && (
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    ≈ Bs. {(editForm.numeric_price * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio Regular</label>
                                <input
                                  type="text"
                                  value={editForm.compare_at_price || ''}
                                  onChange={(e) => handlePriceChange('compare_at_price', e.target.value)}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                            </div>
                            {editForm.discount_percent && editForm.discount_percent > 0 && (
                              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                                <p className="text-xs text-emerald-400 font-bold">
                                  {editForm.discount_percent}% OFF
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Specs */}
                        <div>
                          <h3 className="text-sm font-bold text-[#D4AF37] mb-3">Especificaciones</h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Movimiento</label>
                                <input
                                  type="text"
                                  value={editForm.movement || ''}
                                  onChange={(e) => setEditForm({...editForm, movement: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Material Caja</label>
                                <input
                                  type="text"
                                  value={editForm.case_material || ''}
                                  onChange={(e) => setEditForm({...editForm, case_material: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Resistencia</label>
                                <input
                                  type="text"
                                  value={editForm.water_resistance || ''}
                                  onChange={(e) => setEditForm({...editForm, water_resistance: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Cristal</label>
                                <input
                                  type="text"
                                  value={editForm.glass_type || ''}
                                  onChange={(e) => setEditForm({...editForm, glass_type: e.target.value})}
                                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Badges */}
                        <div>
                          <h3 className="text-sm font-bold text-[#D4AF37] mb-3">Badges</h3>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={(editForm.badges || []).join(', ')}
                              onChange={(e) => setEditForm({...editForm, badges: e.target.value.split(',').map(b => b.trim()).filter(Boolean)})}
                              placeholder="Separados por coma: Más Vendido, Envío Gratis"
                              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#FAFAFA] text-sm rounded-lg px-3 py-2 outline-none"
                            />
                            <div className="flex flex-wrap gap-2">
                              {(editForm.badges || []).map((badge, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="shrink-0 p-5 border-t border-[#2A2A2A] flex items-center justify-end gap-2">
                        <button
                          onClick={handleCloseFullEdit}
                          className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-gray-400 hover:text-[#FAFAFA] text-xs font-medium transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSave(product.id)}
                          disabled={saving}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#C9A02A] hover:to-[#A87609] disabled:opacity-50 text-[#090A0C] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#FAFAFA] truncate">
                          {product.name}
                        </h3>
                        {saveSuccess === product.id && (
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{product.brand} • {product.category}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-sm font-bold text-[#D4AF37]">{product.price}</p>
                        {product.compare_at_price && (
                          <p className="text-xs text-gray-500 line-through">{product.compare_at_price}</p>
                        )}
                        {product.discount_percent && product.discount_percent > 0 && (
                          <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                            {product.discount_percent}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          product.in_stock
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {product.in_stock ? 'En Stock' : 'Agotado'}
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-gray-500 hover:text-[#D4AF37] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                        title="Editar Precios"
                      >
                        <Tag className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleEditFull(product)}
                        className="p-2 rounded-lg text-gray-500 hover:text-[#D4AF37] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                        title="Editar Ficha Completa"
                      >
                        <Edit3 className="w-4 h-4" />
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