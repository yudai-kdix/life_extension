import { Navigate, useNavigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useEffect, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { ActionType, GAME_ACTIONS, GameAction, MealType } from '../constants/actions';
import CharacterImage from '../components/CharacterImage';
import { useAuth } from '../contexts/AuthContext';
import DeadHome from '../components/DeadHome';

export function Home() {
  const {
    currentCharacter,
    mealStatus,
    fetchCharacter,
    fetchMealStatus,
    performAction,
    resetCurrentCharacter,
  } = useCharacter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<GameAction | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [currentAction, setCurrentAction] = useState<{
    type: ActionType;
    value: string;
  } | null>(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const userId = userInfo?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          await fetchCharacter(userId);
          await fetchMealStatus(userId);
        }
      } catch (error) {
        console.error('Failed to fetch characters: ', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, [userId, fetchCharacter, fetchMealStatus]);

  if (!userId) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!currentCharacter) {
    console.log('カレントキャラクターがないため、/createにリダイレクト');
    return <Navigate to="/create" replace />;
  }

  const handleActionSelect = (action: GameAction) => {
    setSelectedAction(action);
    setSelectedMealType(null);
  };

  const handleMealTypeSelect = (mealType: MealType) => {
    setSelectedMealType(mealType);
  };

  const handleActionDetailSelect = async (detail: { value: string }) => {
    if (selectedAction) {
      try {
        const actionType = selectedMealType ? selectedMealType.type : selectedAction.type;
        // アクションの情報を設定
        setCurrentAction({
          type: actionType as ActionType,
          value: detail.value,
        });
        console.log(
          'performAction: ',
          { ...selectedAction, type: actionType as ActionType },
          detail,
        );
        await performAction({ ...selectedAction, type: actionType as ActionType }, detail);
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setSelectedAction(null); // モーダルを閉じる
        setSelectedMealType(null);
         // 3秒後にアクション情報をクリア
         setTimeout(() => {
          setCurrentAction(null);
        }, 3000);
      }
    }
  };

  // キャラ作成時の処理
  const handleCharacterCreate = async () => {
    console.log('create');
    await resetCurrentCharacter();
    navigate('/create');
  };

  // 死亡時のホーム
  if (currentCharacter.status == 0) {
    return <DeadHome character={currentCharacter} handleCharacterCreate={handleCharacterCreate} />;
  }

  return (
    <div className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/src/assets/images/b.png')]">
      <div className="absolute inset-0" />

      <div className="relative h-full flex flex-col">
        {/* ステータス表示（右上） */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="space-y-3">
            <div>
              <div className="font-semibold mb-2 border-b-2">{currentCharacter.character_name}</div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">HP</span>
                <span className="text-sm">{Number(currentCharacter.health_points).toFixed(1)}/15</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentCharacter.health_points / 15) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">寿命</span>
              <span className="text-sm">{Math.floor(currentCharacter.lifespan)}年</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">年齢</span>
              <span className="text-sm">{currentCharacter.age}歳</span>
            </div>

            <div className="flex justify-between">
              {mealStatus.morning ? (
                <img src={'/src/assets/images/morning.png'} width="30px" />
              ) : (
                <img
                  src={'/src/assets/images/morning.png'}
                  width="30px"
                  className="filter grayscale"
                />
              )}
              {mealStatus.afternoon ? (
                <img src={'/src/assets/images/lunch.png'} width="30px" />
              ) : (
                <img
                  src={'/src/assets/images/lunch.png'}
                  width="30px"
                  className="filter grayscale"
                />
              )}
              {mealStatus.night ? (
                <img src={'/src/assets/images/dinner.png'} width="30px" />
              ) : (
                <img
                  src={'/src/assets/images/dinner.png'}
                  width="30px"
                  className="filter grayscale"
                />
              )}
              {mealStatus.other ? (
                <img src={'/src/assets/images/snack.png'} width="30px" />
              ) : (
                <img
                  src={'/src/assets/images/snack.png'}
                  width="30px"
                  className="filter grayscale"
                />
              )}
            </div>
          </div>
        </div>

        {/* 行動一覧 */}
        <div className="w-screen overflow-x-auto flex justify-between lg:justify-center items-center px-4 absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          {GAME_ACTIONS.map((action) => (
            <ActionButton key={action.type} action={action} onClick={handleActionSelect} />
          ))}
        </div>

        {/* モーダル */}
        {selectedAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              {selectedAction.type === '食事' && !selectedMealType ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">食事の種類を選択</h3>
                  <div className="space-y-2">
                    {selectedAction.subActions?.map((subAction) => (
                      <button
                        key={subAction.type}
                        onClick={() => handleMealTypeSelect(subAction)}
                        className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="font-medium flex items-center gap-2">
                          <span>{subAction.icon}</span>
                          <span>{subAction.type}</span>
                        </div>
                        <div className="text-sm text-gray-600">{subAction.description}</div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-4">
                    {selectedMealType?.type || selectedAction.type}の詳細を選択
                  </h3>
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
                </>
              )}
              <button
                onClick={() => {
                  if (selectedMealType) {
                    setSelectedMealType(null);
                  } else {
                    setSelectedAction(null);
                  }
                }}
                className="mt-4 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {selectedMealType ? '戻る' : 'キャンセル'}
              </button>
            </div>
          </div>
        )}

        {/* キャラクター表示エリア */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center" id="myImage">
            <CharacterImage character={currentCharacter}  currentAction={currentAction}/>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" id="effects-container" />
    </div>
  );
}
