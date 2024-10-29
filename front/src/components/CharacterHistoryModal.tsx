import React, { useState } from 'react';
import { Character, useCharacter } from '../contexts/CharacterContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skull } from 'lucide-react';

// Character History Modal Component
export const CharacterHistoryModal = ({ characters }: { characters: Character[] }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-sm text-blue-600 hover:text-blue-800 underline">
        キャラクター履歴を表示
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>キャラクター履歴</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  {character.character_name}
                  {(character.status === 0 || character.health_points <= 0) && (
                    <span className="text-red-500 text-sm">(死亡)</span>
                  )}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>寿命: {Math.floor(character.lifespan)}年</div>
                <div>享年: {character.age}歳</div>
                <div>最終HP: {Math.ceil(character.health_points)}</div>
                <div>
                  最終状態:{' '}
                  {character.status === 1 ? '健康' : character.status === 0 ? '死亡' : '不調'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
