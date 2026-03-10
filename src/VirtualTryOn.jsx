import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ChevronLeft,
  Flame,
  Bell,
  Menu,
  User,
  Heart,
  Shirt,
  Lightbulb,
  MessageCircle,
  Plus,
  X,
  ShoppingBag,
  Ruler,
  Palette,
  Tag,
  Store,
  Sparkles,
} from 'lucide-react';

const avatars = [
  { id: 1, image: `${import.meta.env.BASE_URL}avatar.png` },
  { id: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=300&fit=crop" },
];

const outfits = [
  { id: 1, name: "Blazer & Jeans", style: "Casual", match: 94, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=600&fit=crop", fabric: "Algodão e Linho", store: "Zara", price: "R$ 459,90", color: "Azul Marinho", size: "P, M, G", brand: "Zara Collection" },
  { id: 2, name: "Vestido Midi", style: "Chique", match: 91, image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=400&h=600&fit=crop", fabric: "Seda", store: "Amaro", price: "R$ 289,90", color: "Verde Esmeralda", size: "PP, P, M", brand: "Amaro" },
  { id: 3, name: "Look All Black", style: "Festa", match: 88, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop", fabric: "Crepe", store: "Le Lis", price: "R$ 599,00", color: "Preto", size: "P, M, G, GG", brand: "Le Lis Blanc" },
  { id: 4, name: "Jogger & Tênis", style: "Esportivo", match: 93, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", fabric: "Dry-fit", store: "Nike", price: "R$ 349,90", color: "Cinza", size: "P, M, G", brand: "Nike Sportswear" },
  { id: 5, name: "Camisa Social", style: "Trabalho", match: 87, image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&h=600&fit=crop", fabric: "Algodão Egípcio", store: "Dudalina", price: "R$ 279,90", color: "Branco", size: "36, 38, 40, 42", brand: "Dudalina" },
  { id: 6, name: "Cropped & Cargo", style: "Streetwear", match: 90, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop", fabric: "Sarja", store: "C&A", price: "R$ 199,90", color: "Verde Militar", size: "P, M, G", brand: "Clockhouse" },
  { id: 7, name: "Saída de Praia", style: "Praia", match: 82, image: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=400&h=600&fit=crop", fabric: "Tricô", store: "Farm", price: "R$ 259,00", color: "Off-white", size: "U", brand: "Farm Rio" },
  { id: 8, name: "Slip Dress", style: "Romântico", match: 91, image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&h=600&fit=crop", fabric: "Cetim", store: "Animale", price: "R$ 489,00", color: "Champagne", size: "PP, P, M", brand: "Animale" },
  { id: 9, name: "Conjunto Linho", style: "Minimalista", match: 85, image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop", fabric: "Linho Puro", store: "Osklen", price: "R$ 699,00", color: "Bege", size: "P, M, G", brand: "Osklen" },
  { id: 10, name: "Macacão Utilitário", style: "Casual", match: 83, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=600&fit=crop", fabric: "Jeans", store: "Renner", price: "R$ 179,90", color: "Azul Claro", size: "36, 38, 40, 42", brand: "Blue Steel" },
  { id: 11, name: "Saia Midi & Blusa", style: "Chique", match: 94, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop", fabric: "Viscose", store: "Maria Filó", price: "R$ 379,00", color: "Estampado", size: "P, M, G", brand: "Maria Filó" },
  { id: 12, name: "Vestido Longo", style: "Festa", match: 89, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop", fabric: "Chiffon", store: "Shoulder", price: "R$ 799,00", color: "Vermelho", size: "PP, P, M, G", brand: "Shoulder" },
  { id: 13, name: "Jaqueta Couro", style: "Streetwear", match: 86, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=600&fit=crop", fabric: "Couro Sintético", store: "Riachuelo", price: "R$ 249,90", color: "Preto", size: "P, M, G, GG", brand: "Pool" },
  { id: 14, name: "Vestido Floral", style: "Romântico", match: 92, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop", fabric: "Algodão", store: "Antix", price: "R$ 329,00", color: "Floral Rosa", size: "PP, P, M", brand: "Antix" },
  { id: 15, name: "Terno Feminino", style: "Trabalho", match: 89, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop", fabric: "Gabardine", store: "Zara", price: "R$ 549,90", color: "Cinza Grafite", size: "36, 38, 40", brand: "Zara Woman" },
  { id: 16, name: "Look Monocromático", style: "Minimalista", match: 91, image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop", fabric: "Malha", store: "COS", price: "R$ 459,00", color: "Caramelo", size: "XS, S, M, L", brand: "COS" },
  { id: 17, name: "Legging & Top", style: "Esportivo", match: 88, image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=600&fit=crop", fabric: "Suplex", store: "Track&Field", price: "R$ 398,00", color: "Preto e Rosa", size: "PP, P, M, G", brand: "Track&Field" },
  { id: 18, name: "Vestido Cocktail", style: "Festa", match: 95, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=600&fit=crop", fabric: "Tafetá", store: "Bo.Bô", price: "R$ 1.299,00", color: "Azul Royal", size: "36, 38, 40", brand: "Bo.Bô" },
  { id: 19, name: "Calça Wide & Cropped", style: "Casual", match: 87, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop", fabric: "Jeans", store: "Levi's", price: "R$ 399,90", color: "Azul Médio", size: "36, 38, 40, 42", brand: "Levi's" },
  { id: 20, name: "Biquíni & Saída", style: "Praia", match: 84, image: "https://images.unsplash.com/photo-1506795660198-e95c77602129?w=400&h=600&fit=crop", fabric: "Lycra", store: "Lenny Niemeyer", price: "R$ 598,00", color: "Coral", size: "P, M, G", brand: "Lenny Niemeyer" },
  { id: 21, name: "Blazer Oversized", style: "Chique", match: 90, image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&h=600&fit=crop", fabric: "Lã", store: "Massimo Dutti", price: "R$ 899,00", color: "Camel", size: "S, M, L", brand: "Massimo Dutti" },
  { id: 22, name: "Hoodie & Jeans", style: "Streetwear", match: 81, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop", fabric: "Moletom", store: "Approve", price: "R$ 289,90", color: "Cinza Mescla", size: "P, M, G, GG", brand: "Approve" },
  { id: 23, name: "Vestido Renda", style: "Romântico", match: 93, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop", fabric: "Renda Guipir", store: "Fabulous Agilità", price: "R$ 459,00", color: "Nude", size: "PP, P, M", brand: "Fabulous Agilità" },
  { id: 24, name: "Alfaiataria", style: "Trabalho", match: 96, image: "https://images.unsplash.com/photo-1580913428023-02c695666d61?w=400&h=600&fit=crop", fabric: "Oxford", store: "NK Store", price: "R$ 1.199,00", color: "Marinho", size: "36, 38, 40, 42", brand: "NK Store" },
];

const styleFilters = [
  "Todos",
  "Casual",
  "Chique",
  "Festa",
  "Esportivo",
  "Trabalho",
  "Streetwear",
  "Praia",
  "Romântico",
  "Minimalista",
];

const navTabs = [
  { id: "inspo", label: "Inspo", icon: Lightbulb },
  { id: "stylist", label: "Stylist", icon: MessageCircle },
  { id: "closet", label: "Closet", icon: Shirt },
  { id: "profile", label: "Profile", icon: User },
];

export default function VirtualTryOn() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("closet");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);
  const [showLookDetail, setShowLookDetail] = useState(null);
  const galleryRef = useRef(null);
  const touchStartY = useRef(0);

  const currentAvatar = avatars.find(a => a.id === selectedAvatar) || avatars[0];
  const selectedLookData = showLookDetail ? outfits.find(o => o.id === showLookDetail) : null;

  // Ref para evitar reset imediato após expansão
  const justExpanded = useRef(false);

  const handleScroll = useCallback((e) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop > 10 && !isScrolled) {
      // Scroll para baixo - expande OutfitGrid, diminui avatar
      setIsScrolled(true);
      justExpanded.current = true;
      // Permite voltar ao normal após um tempo
      setTimeout(() => {
        justExpanded.current = false;
      }, 300);
    } else if (scrollTop === 0 && isScrolled && !justExpanded.current) {
      // Scroll voltou ao topo - colapsa OutfitGrid, expande avatar
      setIsScrolled(false);
    }
  }, [isScrolled]);

  // Detecta pull-to-refresh apenas quando no topo absoluto
  const handleTouchStart = useCallback((e) => {
    if (!galleryRef.current) return;
    // Só registra se estiver no topo
    if (galleryRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    } else {
      touchStartY.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!galleryRef.current || touchStartY.current === null) return;

    const scrollTop = galleryRef.current.scrollTop;
    // Se começou a scrollar para baixo, cancela o gesto de expansão
    if (scrollTop > 0) {
      touchStartY.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!galleryRef.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    const scrollTop = galleryRef.current.scrollTop;

    // No topo e arrastou para baixo
    if (scrollTop === 0 && deltaY > 100) {
      if (isScrolled) {
        // Se OutfitGrid está expandido, colapsa primeiro
        setIsScrolled(false);
      } else {
        // Se já está colapsado, expande o avatar
        setIsAvatarExpanded(true);
      }
    }

    touchStartY.current = null;
  }, [isScrolled]);

  const filteredOutfits =
    activeFilter === "Todos"
      ? outfits
      : outfits.filter((outfit) => outfit.style === activeFilter);

  // Reset scroll position quando filtro muda (mas mantém isScrolled)
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollTop = 0;
    }
  }, [activeFilter]);

  // Ref para rastrear estado anterior de isScrolled
  const wasScrolled = useRef(false);

  // Quando avatar diminui (isScrolled muda de false para true), reseta o scroll
  useEffect(() => {
    if (isScrolled && !wasScrolled.current && galleryRef.current) {
      // Avatar acabou de diminuir - reseta scroll para o topo
      setTimeout(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollTop = 0;
        }
      }, 150);
    }
    wasScrolled.current = isScrolled;
  }, [isScrolled]);

  // Reset scroll quando avatar colapsa (volta a mostrar os looks)
  useEffect(() => {
    if (!isAvatarExpanded && galleryRef.current) {
      setTimeout(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollTop = 0;
          setIsScrolled(false);
        }
      }, 150);
    }
  }, [isAvatarExpanded]);

  const toggleFavorite = (e, outfitId) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId]
    );
  };


  // Shared Components
  const Header = ({ className = "" }) => (
    <header className={`flex items-center px-4 lg:px-6 h-14 bg-[#FAF8F5] flex-shrink-0 ${className}`}>
      <button className="p-1 transition-all duration-200 hover:bg-gray-100 rounded-full">
        <ChevronLeft size={24} className="text-[#1A1A1A]" />
      </button>
      <h1 className="text-lg font-semibold text-[#1A1A1A] whitespace-nowrap ml-2">
        Virtual Try-On
      </h1>
      <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-0.5">
          <Flame size={18} className="text-orange-500 fill-orange-500" />
          <span className="text-sm font-medium text-[#1A1A1A]">1</span>
        </div>
        <span className="px-2.5 py-1 bg-gray-100 text-[#1A1A1A] text-xs font-medium rounded-full border border-gray-200">
          Free
        </span>
        <button className="p-1 transition-all duration-200 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-[#1A1A1A]" />
        </button>
        <button className="p-1 transition-all duration-200 hover:bg-gray-100 rounded-full">
          <Menu size={20} className="text-[#1A1A1A]" />
        </button>
      </div>
    </header>
  );

  const AvatarSection = ({ expanded = false, className = "", style, onSwipeDown }) => (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onTouchStart={(e) => {
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY.current;
        // Arrastar para baixo no avatar = callback
        if (deltaY > 50 && onSwipeDown) {
          onSwipeDown();
        }
      }}
    >
      <div className="h-full w-full rounded-2xl relative overflow-hidden">
        <img
          src={currentAvatar.image}
          alt="Avatar"
          onClick={() => !expanded && setShowAvatarModal(true)}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Avatar Picker Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAvatarPicker(!showAvatarPicker);
          }}
          className={`absolute bottom-2 left-2 w-9 h-9 lg:w-11 lg:h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${showAvatarPicker ? 'border-green-500' : 'border-white'} shadow-md`}
        >
          <img src={currentAvatar.image} alt="Avatar thumbnail" className="w-full h-full object-cover" />
        </button>

        {/* Avatar Picker Popup */}
        {showAvatarPicker && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAvatar(avatar.id);
                  setShowAvatarPicker(false);
                }}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  selectedAvatar === avatar.id ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img src={avatar.image} alt={`Avatar ${avatar.id}`} className="w-full h-full object-cover" />
              </button>
            ))}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAvatarPicker(false);
              }}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center transition-all duration-200 hover:bg-gray-200 hover:scale-105"
            >
              <Plus size={18} className="text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const FilterChips = ({ className = "" }) => (
    <div className={`flex gap-2 overflow-x-auto hide-scrollbar ${className}`}>
      {styleFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
            activeFilter === filter
              ? "bg-[#1A1A1A] text-white"
              : "border border-[#E0E0E0] text-[#555] bg-white hover:bg-gray-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );

  const OutfitGrid = ({ columns = 3, className = "", minHeight = false }) => (
    <div
      className={`grid gap-2 lg:gap-3 ${columns === 4 ? 'grid-cols-4' : 'grid-cols-3'} ${className}`}
      style={minHeight ? { paddingBottom: '100vh' } : undefined}
    >
      {filteredOutfits.map((outfit) => (
        <div
          key={outfit.id}
          onClick={() => setShowLookDetail(outfit.id)}
          className="relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
          style={{ aspectRatio: '3/4' }}
        >
          <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
          <button
            onClick={(e) => toggleFavorite(e, outfit.id)}
            className="absolute top-2 right-2 w-7 h-7 lg:w-8 lg:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-white"
          >
            <Heart
              size={14}
              className={favorites.includes(outfit.id) ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const TryOnCounter = ({ className = "" }) => (
    <div className={`px-4 lg:px-6 py-3 bg-white border-t border-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#1A1A1A]">1/2 try-ons restantes hoje</p>
        <button className="text-sm font-semibold text-[#E07A5F] hover:text-[#c96a52] transition-all duration-200">
          Upgrade
        </button>
      </div>
      <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: '50%', background: 'linear-gradient(to right, #22c55e, #86efac)' }}
        />
      </div>
    </div>
  );

  const BottomNav = ({ className = "" }) => (
    <nav className={`flex items-center justify-around px-4 py-3 bg-white border-t border-gray-100 ${className}`}>
      {navTabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1 transition-all duration-200 min-w-[60px]"
          >
            <IconComponent
              size={22}
              className={isActive ? "text-[#1A1A1A]" : "text-gray-400"}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <span className={`text-[11px] ${isActive ? "text-[#1A1A1A] font-medium" : "text-gray-400"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  const AvatarModal = () => (
    showAvatarModal && (
      <div
        className="absolute inset-0 z-50 flex items-center justify-center px-4 py-8"
        onClick={() => setShowAvatarModal(false)}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
        <button
          onClick={() => setShowAvatarModal(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 z-10"
        >
          <X size={24} className="text-[#1A1A1A]" />
        </button>
        <img
          src={currentAvatar.image}
          alt="Avatar fullscreen"
          className="relative z-10 max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )
  );

  const LookDetailModal = () => (
    selectedLookData && (
      <div
        className="absolute inset-0 z-50 flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => setShowLookDetail(null)}
            className="p-1 hover:bg-gray-100 rounded-full transition-all"
          >
            <ChevronLeft size={24} className="text-[#1A1A1A]" />
          </button>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Detalhes do Look</h2>
          <button
            onClick={() => toggleFavorite({ stopPropagation: () => {} }, selectedLookData.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-all"
          >
            <Heart
              size={24}
              className={favorites.includes(selectedLookData.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image */}
          <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
            <img
              src={selectedLookData.image}
              alt={selectedLookData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 rounded-full shadow-sm">
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Sparkles size={14} />
                {selectedLookData.match}% match
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#1A1A1A]">{selectedLookData.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedLookData.style}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#1A1A1A]">{selectedLookData.price}</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                Disponível
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Palette size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cor</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selectedLookData.color}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Shirt size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tecido</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selectedLookData.fabric}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Ruler size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tamanhos</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selectedLookData.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Store size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Loja</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selectedLookData.store}</p>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Tag size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Marca</p>
                <p className="text-sm font-medium text-[#1A1A1A]">{selectedLookData.brand}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button className="flex-1 py-3 bg-[#1A1A1A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#333] transition-all">
            <Sparkles size={18} />
            Experimentar
          </button>
          <button className="py-3 px-4 bg-gray-100 text-[#1A1A1A] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
            <ShoppingBag size={18} />
            Comprar
          </button>
        </div>
      </div>
    )
  );

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-[393px] h-full bg-[#FAF8F5] flex flex-col overflow-hidden relative">
        {!isAvatarExpanded && <Header />}

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Avatar Area */}
          <div
            className={`px-4 transition-all duration-300 ease-out ${isAvatarExpanded ? 'flex-1' : 'flex-shrink-0'}`}
            style={{ height: isAvatarExpanded ? undefined : (isScrolled ? '180px' : '320px') }}
          >
            <AvatarSection
              expanded={isAvatarExpanded}
              className="h-full mx-auto"
              style={{ aspectRatio: isAvatarExpanded ? undefined : '3/4' }}
              onSwipeDown={() => {
                if (isAvatarExpanded) {
                  // Avatar expandido: arrastar para baixo = mostrar looks
                  setIsAvatarExpanded(false);
                }
              }}
            />
          </div>

          {/* Handle when expanded - visual indicator to pull down */}
          {isAvatarExpanded && (
            <div className="flex justify-center py-4">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
          )}

          {/* Content */}
          {!isAvatarExpanded && (
            <>
              <div className="pt-3 pb-2 flex-shrink-0">
                <FilterChips className="px-4" />
              </div>

              <div
                key={activeFilter}
                ref={galleryRef}
                onScroll={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="flex-1 px-4 py-2 overflow-y-auto min-h-0 hide-scrollbar"
                style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
              >
                <OutfitGrid columns={3} minHeight />
              </div>

              <TryOnCounter />
            </>
          )}
        </div>

        <AvatarModal />
        <LookDetailModal />
        <BottomNav className="flex-shrink-0" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full max-w-6xl h-full bg-[#FAF8F5] flex-col overflow-hidden relative mx-auto">
        <Header />

        <div className="flex-1 flex min-h-0 overflow-hidden p-6 gap-6">
          {/* Left: Avatar */}
          <div className="w-[400px] flex-shrink-0 flex flex-col">
            <AvatarSection className="flex-1 rounded-2xl" />
          </div>

          {/* Right: Outfits */}
          <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Escolha um look</h2>
              <FilterChips />
            </div>

            <div className="flex-1 p-4 overflow-y-auto hide-scrollbar">
              <OutfitGrid columns={4} />
            </div>

            <TryOnCounter />
          </div>
        </div>

        <AvatarModal />
        <LookDetailModal />
        <BottomNav />
      </div>
    </>
  );
}
