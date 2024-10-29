import { useCharacter } from '@/contexts/CharacterContext';
import { CharacterHistoryModal } from './CharacterHistoryModal';
import { Skull } from 'lucide-react';

export function CharacterSection() {
  const { currentCharacter, characters } = useCharacter();
  const isDead = currentCharacter?.status === 0 || (currentCharacter?.health_points ?? 0) <= 0;
  const character = currentCharacter ? currentCharacter : characters[0];

  if (characters.length <= 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">キャラクター情報</h2>
        <div className="text-gray-500">キャラクターが存在しません。新しく作成してください。</div>
      </div>
    );
  }

  // ステータスバーのスタイルを計算する関数
  const getStatusBarStyle = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    const getColor = () => {
      if (isDead) return 'bg-gray-500';
      if (percentage > 66) return 'bg-green-500';
      if (percentage > 33) return 'bg-yellow-500';
      return 'bg-red-500';
    };
    return `${getColor()} h-2 rounded-full transition-all duration-300`;
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${isDead ? 'opacity-90' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">キャラクター情報</h2>
        <div className="flex items-center gap-4">
          <CharacterHistoryModal characters={characters} />
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            最終更新:{' '}
            {character.last_updated ? new Date(character.last_updated).toLocaleString() : '?'}
          </span>
        </div>
      </div>

      {isDead && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <Skull className="text-red-500 w-6 h-6" />
          <div>
            <h3 className="font-medium text-red-800">キャラクターは死亡しました</h3>
            <p className="text-sm text-red-600">
              享年: {character.age}歳 / 寿命: {Math.floor(character.lifespan)}年
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>
              <span>なまえ：</span>
              <span className="font-semibold">{character.character_name}</span>
            </span>
          </div>

          {/* HP */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>HP</span>
              <span>{Math.ceil(character.health_points)}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={getStatusBarStyle(character.health_points, 10)}
                style={{
                  width: `${(character.health_points / 15) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Age & Lifespan */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-sm text-gray-500">年齢</div>
              <div className="text-lg font-medium">{character.age}歳</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">寿命</div>
              <div className="text-lg font-medium">{Math.floor(character.lifespan)}年</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t">
          <div className="text-sm text-gray-500 mb-2">ステータス</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="px-4 py-2 bg-gray-50 rounded">体力: {character.health_points}</div>
            <div className="px-4 py-2 bg-gray-50 rounded">
              状態: {isDead ? '死亡' : character.status === 1 ? '健康' : '不調'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
