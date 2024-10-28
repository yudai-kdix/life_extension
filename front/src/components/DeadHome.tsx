import { Character } from '../contexts/CharacterContext';
import CharacterImage from './CharacterImage';

type DeadHomeProps = {
  character: Character;
};

export default function DeadHome({ character }: DeadHomeProps) {
  return (
    <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/b.png')]">
      <div className="absolute inset-0" />

      <div className="relative h-full flex flex-col">
        {/* ステータス表示（右上） */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="space-y-3">
            <div>
              <div className="font-semibold mb-2 border-b-2">{character.character_name}</div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">HP</span>
                <span className="text-sm">{character.health_points}/15</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(character.health_points / 15) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{Math.floor(character.lifespan)}年</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{character.age}歳</span>
            </div>
          </div>
        </div>

        {/* モーダル */}
        {/* {selectedAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">{selectedAction.type}の詳細を選択</h3>
              <div className="space-y-2">
                {selectedAction.details.map((detail) => (
                  <button
                    key={detail.value}
                    onClick={() => handleActionDetailSelect(detail)}
                    className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium">{detail.label}</div>
                    <div className="text-sm text-gray-600">{detail.description}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedAction(null)}
                className="mt-4 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                キャンセル
              </button>
            </div>
          </div>
        )} */}

        {/* キャラクター表示エリア */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center" id="myImage">
            {/* バックエンド側でキャラクターのstatusの初期値がnullになっているのが修正されれば削除 */}
            {character.status != null && <CharacterImage character={character} />}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" id="effects-container" />
    </div>
  );
}
