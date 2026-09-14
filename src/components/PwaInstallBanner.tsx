'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Share2, PlusSquare, Bookmark, Smartphone, CheckCircle2 } from 'lucide-react';

interface PwaInstallBannerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({
  isOpen: forceOpen,
  onClose: forceClose
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if already installed / standalone
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Capture Android install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowModal(true);
    }
  };

  const isModalOpen = forceOpen !== undefined ? forceOpen : showModal;
  const closeModal = forceClose || (() => setShowModal(false));

  if (isStandalone && !forceOpen) return null;

  return (
    <>
      {/* Mini banner button for quick access */}
      {!forceOpen && !isStandalone && (
        <div className="bg-gradient-to-r from-brand-600 to-emerald-700 text-white px-3.5 py-2 rounded-2xl flex items-center justify-between shadow-xs mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
              <Download className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">
                ¿Llevar en el celular?
              </p>
              <p className="text-[10px] text-brand-100 mt-0.5">
                Instalar app o guardar en marcadores
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="text-[11px] font-extrabold bg-white text-brand-800 px-3 py-1.5 rounded-xl shadow-xs hover:bg-brand-50 transition-colors"
          >
            Descargar
          </button>
        </div>
      )}

      {/* Guide Modal for Android & iOS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Descargar en tu Celular
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Acceso directo rápido sin necesidad de tienda
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-700">
              {deferredPrompt ? (
                <div className="text-center py-2 space-y-3">
                  <p className="font-semibold text-slate-800">
                    Tu navegador permite instalar la app directamente en tu pantalla de inicio con 1 toque:
                  </p>
                  <button
                    onClick={async () => {
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === 'accepted') {
                        setDeferredPrompt(null);
                        closeModal();
                      }
                    }}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Instalar Aplicación Ahora</span>
                  </button>
                </div>
              ) : isIOS ? (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="text-slate-700 leading-snug">
                      En Safari, toca el botón de <strong>Compartir</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> en la barra inferior del navegador.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="text-slate-700 leading-snug">
                      Desliza hacia abajo en el menú y selecciona <strong>"Agregar al inicio"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-700" /> o <strong>"Agregar a marcadores"</strong>.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="text-slate-700 leading-snug">
                      Toca <strong>"Agregar"</strong> arriba a la derecha. ¡Listo! Tendrás el icono de Chef en tu pantalla como una app nativa.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="text-slate-700 leading-snug">
                      Toca el menú de tres puntos (<strong>⋮</strong>) en la parte superior derecha de tu navegador Chrome o navegador del celular.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="text-slate-700 leading-snug">
                      Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal / Marcadores"</strong>.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="text-slate-700 leading-snug">
                      Confirma para tenerla disponible inmediatamente sin gastar espacio de memoria.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
