import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Character, CharacterStatus } from '../contexts/CharacterContext';
import { ActionType } from '@/constants/actions';

// 1. 型定義
interface CharacterImage {
  sad?: string;
  normal?: string;
  happy?: string;
  dead?: string;
  // アクション用の画像
  smoking?: string;
  drinking?: string;
  energyDrink?: string;
}

interface Position {
  x: number;
  y: number;
}

interface CharacterImageProps {
  character: Character;
  containerWidth?: number;
  containerHeight?: number;
  currentAction?: {
    type: ActionType;
    value: string;
  } | null;
}

// 2. 定数定義
const CHARACTER_IMAGES: Record<CharacterStatus, CharacterImage> = {
  0: {
    dead: '/src/assets/images/tako_dead.png',
  },
  1: {
    sad: '/src/assets/images/tako_baby_sad.png',
    normal: '/src/assets/images/tako_baby_normal.png',
    happy: '/src/assets/images/tako_baby_happy.png',
    smoking: '/src/assets/images/tako_baby_smoking.png',
    drinking: '/src/assets/images/tako_baby_drinking.png',
    energyDrink: '/src/assets/images/tako_baby_energy.png',
  },
  2: {
    sad: '/src/assets/images/tako_yonger_sad.png',
    normal: '/src/assets/images/tako_yonger_normal.png',
    happy: '/src/assets/images/tako_yonger_happy.png',
    smoking: '/src/assets/images/tako_yonger_smoking.png',
    drinking: '/src/assets/images/tako_baby_drinking.png',
    energyDrink: '/src/assets/images/tako_yonger_energy.png',
  },
  3: {
    sad: '/src/assets/images/tako_older_sad.png',
    normal: '/src/assets/images/tako_older_normal.png',
    happy: '/src/assets/images/tako_older_happy.png',
    smoking: '/src/assets/images/tako_older_smoking.png',
    drinking: '/src/assets/images/tako_baby_drinking.png',
    energyDrink: '/src/assets/images/tako_older_energy.png',
  },
};

const ACTION_MAP: Record<string, ActionType | null> = {
  smoke_yes: 'タバコ',
  smoke_none: null,
  alcohol_moderate: '酒',
  alcohol_excessive: '酒',
  alcohol_none: null,
  energy_consumed: 'エナドリ',
  energy_none: null,
};

function CharacterImage({
  character,
  containerWidth = 125,
  containerHeight = 100,
  currentAction,
}: CharacterImageProps) {
  // 3. state/ref定義
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const [targetPosition, setTargetPosition] = useState<Position>({ x: 0, y: 0 });
  const [containerPosition, setContainerPosition] = useState<Position>({ x: 0, y: 0 });
  const [temporaryAction, setTemporaryAction] = useState<ActionType | null>(null);

  // 4. 表示に関するロジック
  const imageSize = character.status === 0 ? 350 : 160;

  const currentImage = useMemo(() => {
    const images = CHARACTER_IMAGES[character.status];

    if (character.status === 0) {
      return images.dead;
    }

    if (temporaryAction) {
      switch (temporaryAction) {
        case 'タバコ':
          return images.smoking;
        case '酒':
          return images.drinking;
        case 'エナドリ':
          return images.energyDrink;
      }
    }

    if (character.health_points < 5) return images.sad;
    if (character.health_points < 10) return images.normal;
    return images.happy;
  }, [character.status, character.health_points, temporaryAction]);

  const characterPosition = useMemo(() => {
    return character.status === 0 ? { x: 0, y: 0 } : targetPosition;
  }, [character.status, targetPosition]);

  // 5. コンテナの位置更新
  useEffect(() => {
    function updateContainerPosition() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerPosition({ x: rect.x, y: rect.y });
      }
    }

    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    return () => window.removeEventListener('resize', updateContainerPosition);
  }, []);

  // 6. クリック位置の処理
  useEffect(() => {
    if (character.status === 0) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const isInteractiveElement = [
        '.bg-white\\/90.backdrop-blur-sm', // ステータス表示
        'button', // アクションボタン
        '.fixed.inset-0.bg-black\\/50', // モーダル
        '.text-lg', // キャラ作成
      ].some((selector) => target.closest(selector) !== null);

      const isEffectsContainer = target.closest('#effects-container') !== null;

      if (!isInteractiveElement || isEffectsContainer) {
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;

        setTargetPosition({
          x:
            event.clientX -
            containerPosition.x -
            (event.clientX >= windowCenterX ? containerWidth : 0),
          y:
            event.clientY -
            containerPosition.y -
            (event.clientY >= windowCenterY ? containerHeight : 0),
        });
      }
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [character.status, containerPosition, containerWidth, containerHeight]);

  // 7. アクション処理
  useEffect(() => {
    if (!currentAction) return;

    const newAction = ACTION_MAP[currentAction.value];
    if (newAction !== undefined) {
      setTemporaryAction(newAction);
    }
  }, [currentAction]);

  // 8. アクションタイマー処理
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (temporaryAction !== null) {
      timerRef.current = window.setTimeout(() => {
        setTemporaryAction(null);
        timerRef.current = null;
      }, 3000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [temporaryAction]);

  return (
    <div ref={containerRef} className="relative">
      <img
        src={currentImage}
        width={imageSize}
        height={imageSize}
        alt={`Character (Status: ${character.status === 0 ? 'Dead' : 'Alive'}, HP: ${character.health_points}${
          temporaryAction ? `, Action: ${temporaryAction}` : ''
        })`}
        className={`transition-all duration-300 ease-in-out object-contain
          ${character.status === 0 ? 'grayscale opacity-75' : ''}`}
        style={{
          transform: `translate(${characterPosition.x}px, ${characterPosition.y}px)`,
        }}
      />
    </div>
  );
}

export default CharacterImage;
