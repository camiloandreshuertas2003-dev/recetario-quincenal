'use client';

import React, { useState } from 'react';
import { FridgeNote } from '@/types';
import { addFridgeNote, deleteFridgeNote } from '@/lib/storage';
import { StickyNote, Plus, Trash2, X, Sparkles, Send } from 'lucide-react';

interface FridgeNotesModalProps {
  notes?: FridgeNote[];
  currentUserName?: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNotes?: () => void;
}

export const FridgeNotesModal: React.FC<FridgeNotesModalProps> = ({
  notes,
  currentUserName,
  isOpen,
  onClose,
  onUpdateNotes
}) => {
  const [newNoteText, setNewNoteText] = useState('');

  if (!isOpen) return null;

  const displayNotes = notes ?? [];
  const displayName = currentUserName || 'Hogar';

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    addFridgeNote(newNoteText.trim(), displayName);
    setNewNoteText('');
    onUpdateNotes?.();
  };

  const handleDelete = (id: string) => {
    deleteFridgeNote(id);
    onUpdateNotes?.();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <StickyNote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Notas de la Nevera
              </h3>
              <p className="text-[10px] text-slate-500">
                Post-its colaborativos para el hogar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAdd} className="py-3 flex gap-2">
          <input
            type="text"
            required
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Escribe un recado rápido para el hogar..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
            title="Pegar nota"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {displayNotes.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-1">
              <StickyNote className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs">No hay notas en la nevera.</p>
              <p className="text-[10px]">¡Deja un recado a tu pareja!</p>
            </div>
          ) : (
            displayNotes.map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-2xl border transition-all shadow-2xs relative ${
                  note.color || 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    {note.authorName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] opacity-70">{note.createdAt}</span>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                      title="Quitar nota"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  {note.text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{displayNotes.length} notas activas</span>
          <button
            onClick={onClose}
            className="font-bold text-brand-700 hover:underline"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
