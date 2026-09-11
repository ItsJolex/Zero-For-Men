import { useState, useEffect, useRef } from 'react';
import {
  Package,
  LogOut,
  RefreshCw,
  Check,
  X,
  AlertCircle,
  Tag,
  DollarSign,
  Edit3,
  Eye,
  Plus,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { optimizeImageToWebP, type OptimizedImageResult } from '../../utils/imageOptimizer';

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
  is_hidden: number;
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

const BRANDS = ['Poedagar', 'Curren', 'Nibosi', 'Pagani Design', 'Casio', 'Pablo Raez', 'Zero For Men', 'Zero Mayoristas'];

const CATEGORIES = [
  { id: 'todos', name: 'Todos' },
  { id: 'elegantes', name: 'Elegantes' },
  { id: 'automaticos', name: 'Automáticos' },
  { id: 'deportivos', name: 'Deportivos' },
  { id: 'dama', name: 'Damas' },
  { id: 'mayoristas', name: 'Mayoristas' },
  { id: 'parejas', name: 'Parejas' },
];

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
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Estados para Creación de Nuevo Reloj
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [creating, setCreating] = useState(false);
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);
  const [imageOptimizationInfo, setImageOptimizationInfo] = useState<OptimizedImageResult | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialNewProductState = {
    name: '',
    brand: 'Poedagar',
    category: 'elegantes',
    numeric_price: 35,
    numeric_compare_at_price: null as number | null,
    discount_percent: null as number | null,
    price_note: 'Tasa BCV',
    tagline: '',
    description: '',
    image: '',
    in_stock: 1,
    is_hidden: 0,
    movement: 'Cuarzo Japonés',
    case_material: 'Acero Inoxidable',
    water_resistance: 'Resistente al agua (3 ATM)',
    glass_type: 'Cristal Mineral Antirrayaduras',
    specs: ['Acero Inoxidable', 'Resistente al Agua', 'Cristal Mineral'],
    badges: ['Envío Gratis'],
  };

  const [newProductForm, setNewProductForm] = useState(initialNewProductState);

  // Fetch BCV rate
  useEffect(() => {
    const fetchBcvRate = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
        const data = await response.json();
        const rate = data.promedio || data.venta || data.precio || 0;
        setBcvRate(rate);
      } catch (err) {
        console.error('Error fetching BCV rate:', err);
      }
    };
    fetchBcvRate();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      const res = await fetch(`/api/products?include_hidden=true&t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
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
      is_hidden: product.is_hidden,
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
        updated.numeric_price = numericValue;
        updated.price = `$${numericValue}`;
        if (updated.numeric_compare_at_price) {
          updated.discount_percent = calculateDiscountPercent(updated.numeric_compare_at_price, numericValue);
        }
      } else if (field === 'numeric_compare_at_price') {
        updated.numeric_compare_at_price = numericValue;
        updated.compare_at_price = numericValue > 0 ? `$${numericValue}` : null;
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

  const handleNewProductPriceChange = (field: 'numeric_price' | 'numeric_compare_at_price', value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    setNewProductForm(prev => {
      const updated = { ...prev, [field]: numericValue };
      if (field === 'numeric_compare_at_price' && numericValue === 0) {
        updated.numeric_compare_at_price = null;
      }
      
      const regular = field === 'numeric_compare_at_price' ? numericValue : prev.numeric_compare_at_price;
      const sale = field === 'numeric_price' ? numericValue : prev.numeric_price;
      updated.discount_percent = calculateDiscountPercent(regular, sale);
      
      return updated;
    });
  };

  // Procesamiento de Imagen con conversión a WebP
  const handleProcessImageFile = async (file: File) => {
    setImageError(null);
    setIsOptimizingImage(true);
    try {
      if (!file.type.startsWith('image/')) {
        setImageError('Formato inválido. Sube una foto en formato WebP, PNG o JPG.');
        return;
      }
      const result = await optimizeImageToWebP(file, 1000, 1000, 0.82);
      setImageOptimizationInfo(result);
      setNewProductForm(prev => ({ ...prev, image: result.dataUrl }));
    } catch (err: any) {
      console.error(err);
      setImageError(err.message || 'Error al procesar la imagen.');
    } finally {
      setIsOptimizingImage(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleProcessImageFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleCreateProduct = async () => {
    setCreateError(null);
    setImageError(null);

    // Validación de imagen obligatoria
    if (!newProductForm.image) {
      setImageError('¡La imagen del reloj es obligatoria! Por favor selecciona una foto.');
      return;
    }

    if (!newProductForm.name.trim()) {
      setCreateError('El nombre del reloj es obligatorio.');
      return;
    }

    if (!newProductForm.numeric_price || newProductForm.numeric_price <= 0) {
      setCreateError('El precio debe ser un monto mayor a $0.');
      return;
    }

    setCreating(true);
    try {
      const res = await fetch('/api/admin/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProductForm,
          compare_at_price: newProductForm.numeric_compare_at_price 
            ? `$${newProductForm.numeric_compare_at_price}` 
            : null
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar el reloj');
      }

      // Éxito: cerrar modal y refrescar
      setIsAddingProduct(false);
      setNewProductForm(initialNewProductState);
      setImageOptimizationInfo(null);
      setSaveSuccess(data.product?.id || 'new');
      setTimeout(() => setSaveSuccess(null), 3000);
      fetchProducts();
    } catch (err: any) {
      setCreateError(err.message || 'Error al registrar el reloj');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!window.confirm(`¿Deseas eliminar permanentemente el reloj "${product.name}"?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/delete-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: product.id }),
      });

      if (!res.ok) throw new Error('Error al eliminar');
      fetchProducts();
    } catch {
      setError('Error al eliminar el producto');
    }
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

  const handleToggleVisibility = async (product: Product) => {
    try {
      await fetch('/api/admin/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: product.id,
          is_hidden: product.is_hidden ? 0 : 1,
        }),
      });
      fetchProducts();
    } catch {
      setError('Error al actualizar visibilidad');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'todos' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const inStockCount = products.filter(p => p.in_stock).length;
  const visibleCount = products.filter(p => !p.is_hidden).length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5A2B] to-[#6F441F] flex items-center justify-center shadow-sm">
              <Package className="w-4 h-4 text-[#FFFFFF]" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-[#0A0A0A]">
                Zero For Men <span className="font-light text-gray-500">/ Suite Admin</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setImageError(null);
                setCreateError(null);
                setIsAddingProduct(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8B5A2B] to-[#6F441F] hover:from-[#7A4A1B] hover:to-[#5E340F] text-[#FFFFFF] text-xs sm:text-sm font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Reloj</span>
            </button>
            <button
              onClick={fetchProducts}
              className="p-2 rounded-lg text-gray-600 hover:text-[#8B5A2B] hover:bg-[#FAFAFA] transition-colors cursor-pointer"
              title="Refrescar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_token');
                onLogout();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-600 hover:text-[#8B5A2B] hover:bg-[#FAFAFA] text-xs font-medium transition-colors cursor-pointer"
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
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B5A2B]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#8B5A2B]" />
              </div>
              <div>
                <p className="text-[#0A0A0A] text-xs uppercase font-mono">Total Colección</p>
                <p className="text-2xl font-bold text-[#0A0A0A]">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[#0A0A0A] text-xs uppercase font-mono">En Stock</p>
                <p className="text-2xl font-bold text-[#0A0A0A]">{inStockCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B5A2B]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#8B5A2B]" />
              </div>
              <div>
                <p className="text-[#0A0A0A] text-xs uppercase font-mono">Visibles en Web</p>
                <p className="text-2xl font-bold text-[#0A0A0A]">{visibleCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B5A2B]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#8B5A2B]" />
              </div>
              <div>
                <p className="text-[#0A0A0A] text-xs uppercase font-mono">Tasa Oficial BCV</p>
                <p className="text-2xl font-bold text-[#8B5A2B]">
                  {bcvRate ? `Bs. ${bcvRate.toFixed(2)}` : 'Cargando...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buscador y Filtros por Categoría */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-4 mb-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por modelo, marca o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F3F4F6]">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#8B5A2B] text-white shadow-sm'
                    : 'bg-[#FAFAFA] text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100 border border-[#E5E7EB]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Notificaciones de error o éxito general */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* MODAL: AGREGAR NUEVO RELOJ */}
        {isAddingProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
              {/* Header Modal */}
              <div className="shrink-0 p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-gradient-to-r from-[#FAFAFA] to-[#FFFFFF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5A2B]/10 flex items-center justify-center text-[#8B5A2B]">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#0A0A0A]">Agregar Nuevo Reloj</h2>
                    <p className="text-xs text-gray-500">Sube la foto y completa la información de la pieza</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario con Scroll */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {createError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{createError}</span>
                  </div>
                )}

                {/* ZONA DE FOTO (OBLIGATORIA CON CONVERTIDOR WEBP) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase font-mono text-[#0A0A0A] flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#8B5A2B]" />
                      <span>Foto del Reloj <span className="text-red-500">* (Obligatoria)</span></span>
                    </label>
                    <span className="text-[11px] text-gray-500">Auto-conversión a WebP liviano</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />

                  {!newProductForm.image ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isDragging 
                          ? 'border-[#8B5A2B] bg-[#8B5A2B]/5' 
                          : 'border-gray-300 hover:border-[#8B5A2B] bg-[#FAFAFA]'
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#8B5A2B]/10 flex items-center justify-center text-[#8B5A2B] mb-3">
                        {isOptimizingImage ? (
                          <RefreshCw className="w-6 h-6 animate-spin" />
                        ) : (
                          <UploadCloud className="w-6 h-6" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-[#0A0A0A]">
                        {isOptimizingImage ? 'Optimizando y convirtiendo a WebP...' : 'Haz clic o arrastra la foto del reloj aquí'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Sube en formato <strong>PNG, JPG o WEBP</strong>. El script la redimensionará y convertirá a WebP para que pese menos de 50 KB.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0 shadow-sm">
                        <img
                          src={newProductForm.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Foto lista y optimizada</span>
                        </div>
                        {imageOptimizationInfo && (
                          <p className="text-xs text-gray-600 font-mono">
                            {imageOptimizationInfo.originalFormat} ({imageOptimizationInfo.originalSizeKB} KB) ➔ <strong className="text-[#8B5A2B]">WebP ({imageOptimizationInfo.optimizedSizeKB} KB)</strong>
                            {imageOptimizationInfo.savedPercent > 0 && (
                              <span className="ml-1 text-emerald-600 font-bold">(-{imageOptimizationInfo.savedPercent}%)</span>
                            )}
                          </p>
                        )}
                        <p className="text-[11px] text-gray-500">
                          Garantiza ultra velocidad de carga y mínimo consumo en base de datos.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-medium text-[#8B5A2B] hover:bg-[#8B5A2B]/10 rounded-lg border border-[#8B5A2B]/30 transition-colors cursor-pointer shrink-0"
                      >
                        Cambiar Foto
                      </button>
                    </div>
                  )}

                  {imageError && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{imageError}</span>
                    </p>
                  )}
                </div>

                {/* DATOS PRINCIPALES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase font-mono text-gray-700 block mb-1">
                      Nombre del Modelo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Poedagar 832 Luxury Rose"
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-3.5 py-2.5 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase font-mono text-gray-700 block mb-1">
                      Marca *
                    </label>
                    <select
                      value={newProductForm.brand}
                      onChange={(e) => setNewProductForm({ ...newProductForm, brand: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-3.5 py-2.5 outline-none"
                    >
                      {BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* CATEGORÍA Y TAGLINE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase font-mono text-gray-700 block mb-1">
                      Categoría *
                    </label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-3.5 py-2.5 outline-none"
                    >
                      {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase font-mono text-gray-700 block mb-1">
                      Frase Destacada / Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Elegancia ejecutiva con dial blanco inmaculado."
                      value={newProductForm.tagline}
                      onChange={(e) => setNewProductForm({ ...newProductForm, tagline: e.target.value })}
                      className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-3.5 py-2.5 outline-none"
                    />
                  </div>
                </div>

                {/* PRECIOS Y DESCUENTOS */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase font-mono text-[#8B5A2B] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Estructura de Precios ($ USD)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-600 block mb-1">
                        Precio Venta ($) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newProductForm.numeric_price || ''}
                        onChange={(e) => handleNewProductPriceChange('numeric_price', e.target.value)}
                        className="w-full bg-white border border-gray-300 focus:border-[#8B5A2B] text-[#0A0A0A] font-bold text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-600 block mb-1">
                        Precio Antes / Tachado ($)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Opcional"
                        value={newProductForm.numeric_compare_at_price || ''}
                        onChange={(e) => handleNewProductPriceChange('numeric_compare_at_price', e.target.value)}
                        className="w-full bg-white border border-gray-300 focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-600 block mb-1">
                        Descuento (%)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={newProductForm.discount_percent ? `${newProductForm.discount_percent}% OFF` : 'Sin descuento'}
                        className="w-full bg-gray-100 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                  {bcvRate && newProductForm.numeric_price > 0 && (
                    <p className="text-xs text-gray-500 font-mono">
                      Equivalente aproximado a tasa BCV: <strong className="text-[#0A0A0A]">Bs. {(newProductForm.numeric_price * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</strong>
                    </p>
                  )}
                </div>

                {/* ESPECIFICACIONES HOROLÓGICAS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase font-mono text-gray-700">Ficha Técnica</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Movimiento</label>
                      <input
                        type="text"
                        value={newProductForm.movement}
                        onChange={(e) => setNewProductForm({ ...newProductForm, movement: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Material Caja</label>
                      <input
                        type="text"
                        value={newProductForm.case_material}
                        onChange={(e) => setNewProductForm({ ...newProductForm, case_material: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Resistencia al Agua</label>
                      <input
                        type="text"
                        value={newProductForm.water_resistance}
                        onChange={(e) => setNewProductForm({ ...newProductForm, water_resistance: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Tipo de Cristal</label>
                      <input
                        type="text"
                        value={newProductForm.glass_type}
                        onChange={(e) => setNewProductForm({ ...newProductForm, glass_type: e.target.value })}
                        className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                  <label className="text-xs font-semibold uppercase font-mono text-gray-700 block mb-1">
                    Descripción Comercial
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Incluye detalles de entrega MRW, garantía y especificaciones adicionales..."
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-xl px-3.5 py-2.5 outline-none resize-none"
                  />
                </div>

                {/* STOCK Y VISIBILIDAD */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={Boolean(newProductForm.in_stock)}
                      onChange={(e) => setNewProductForm({ ...newProductForm, in_stock: e.target.checked ? 1 : 0 })}
                      className="rounded text-[#8B5A2B] focus:ring-[#8B5A2B]"
                    />
                    <span>Disponible en Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={!newProductForm.is_hidden}
                      onChange={(e) => setNewProductForm({ ...newProductForm, is_hidden: e.target.checked ? 0 : 1 })}
                      className="rounded text-[#8B5A2B] focus:ring-[#8B5A2B]"
                    />
                    <span>Visible en Catálogo Público</span>
                  </label>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="shrink-0 p-4 sm:p-5 border-t border-[#E5E7EB] flex items-center justify-end gap-2 bg-[#FAFAFA]">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleCreateProduct}
                  disabled={creating || isOptimizingImage}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5A2B] to-[#6F441F] hover:from-[#7A4A1B] hover:to-[#5E340F] disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  {creating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Guardando Reloj...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publicar Reloj</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LISTA DE PRODUCTOS */}
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#8B5A2B]" />
            <p className="font-serif">Cargando inventario de Zero For Men...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
            <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="font-serif font-bold text-gray-700">No se encontraron relojes</p>
            <p className="text-xs text-gray-400 mt-1">Prueba con otra búsqueda o categoría</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#8B5A2B]/40 rounded-2xl transition-all shadow-sm overflow-hidden"
              >
                {editingId === product.id && !isEditingFull ? (
                  // Quick Edit Mode
                  <div className="p-4 flex flex-col md:flex-row items-center gap-4 bg-[#FAFAFA]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#0A0A0A] truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.brand} • {product.category}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-24">
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-0.5">Precio ($)</label>
                        <input
                          type="number"
                          value={editForm.numeric_price || ''}
                          onChange={(e) => handlePriceChange('numeric_price', e.target.value)}
                          className="w-full bg-white border border-gray-300 focus:border-[#8B5A2B] text-[#0A0A0A] font-bold text-sm rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="w-24">
                        <label className="text-[10px] uppercase font-mono text-gray-500 block mb-0.5">Antes ($)</label>
                        <input
                          type="number"
                          value={editForm.numeric_compare_at_price || ''}
                          onChange={(e) => handlePriceChange('numeric_compare_at_price', e.target.value)}
                          className="w-full bg-white border border-gray-300 focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 pt-4">
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSave(product.id)}
                          disabled={saving}
                          className="p-2 rounded-lg bg-[#8B5A2B] text-white hover:bg-[#7A4A1B] transition-colors cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : editingId === product.id && isEditingFull ? (
                  // Full Edit Modal/Drawer
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
                      <div className="shrink-0 p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h2 className="text-base font-bold text-[#0A0A0A]">Editar {product.name}</h2>
                            <p className="text-xs text-gray-500">{product.brand} • {product.category}</p>
                          </div>
                        </div>
                        <button onClick={handleCloseFullEdit} className="p-2 rounded-lg text-gray-400 hover:text-gray-700">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Nombre</label>
                            <input
                              type="text"
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Marca</label>
                            <select
                              value={editForm.brand || ''}
                              onChange={(e) => setEditForm({...editForm, brand: e.target.value})}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                            >
                              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio ($)</label>
                            <input
                              type="number"
                              value={editForm.numeric_price || ''}
                              onChange={(e) => handlePriceChange('numeric_price', e.target.value)}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] font-bold text-sm rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Precio Antes ($)</label>
                            <input
                              type="number"
                              value={editForm.numeric_compare_at_price || ''}
                              onChange={(e) => handlePriceChange('numeric_compare_at_price', e.target.value)}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">% Descuento</label>
                            <input
                              type="text"
                              readOnly
                              value={editForm.discount_percent ? `${editForm.discount_percent}% OFF` : '0%'}
                              className="w-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Movimiento</label>
                            <input
                              type="text"
                              value={editForm.movement || ''}
                              onChange={(e) => setEditForm({...editForm, movement: e.target.value})}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Material Caja</label>
                            <input
                              type="text"
                              value={editForm.case_material || ''}
                              onChange={(e) => setEditForm({...editForm, case_material: e.target.value})}
                              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-mono text-gray-500 block mb-1">Descripción</label>
                          <textarea
                            rows={2}
                            value={editForm.description || ''}
                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            className="w-full bg-[#FAFAFA] border border-[#E5E7EB] focus:border-[#8B5A2B] text-[#0A0A0A] text-sm rounded-lg px-3 py-2 outline-none resize-none"
                          />
                        </div>
                      </div>

                      <div className="shrink-0 p-4 border-t border-[#E5E7EB] flex items-center justify-end gap-2 bg-gray-50">
                        <button onClick={handleCloseFullEdit} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold">
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSave(product.id)}
                          disabled={saving}
                          className="px-5 py-2 rounded-lg bg-[#8B5A2B] hover:bg-[#7A4A1B] text-white text-xs font-bold shadow-sm"
                        >
                          {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0 shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-[#0A0A0A] truncate">
                            {product.name}
                          </h3>
                          {saveSuccess === product.id && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{product.brand} • {product.category}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <p className="text-sm font-bold text-[#8B5A2B]">{product.price}</p>
                          {product.compare_at_price && (
                            <p className="text-xs text-gray-400 line-through">{product.compare_at_price}</p>
                          )}
                          {product.discount_percent && product.discount_percent > 0 && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                              {product.discount_percent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleToggleVisibility(product)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          !product.is_hidden
                            ? 'bg-[#8B5A2B]/10 text-[#8B5A2B] border border-[#8B5A2B]/30'
                            : 'bg-gray-100 text-gray-500 border border-gray-300'
                        }`}
                      >
                        {!product.is_hidden ? 'Visible' : 'Oculto'}
                      </button>

                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          product.in_stock
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                      >
                        {product.in_stock ? 'En Stock' : 'Agotado'}
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-gray-600 hover:text-[#8B5A2B] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Editar Precios"
                      >
                        <Tag className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleEditFull(product)}
                        className="p-2 rounded-lg text-gray-600 hover:text-[#8B5A2B] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Editar Ficha Completa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Eliminar Reloj"
                      >
                        <Trash2 className="w-4 h-4" />
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