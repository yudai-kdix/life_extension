import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Character, CharacterStatus } from '../contexts/CharacterContext';

interface CharacterImage {
  sad?: string;
  normal?: string;
  happy?: string;
  dead?: string;
}

const CHARACTER_IMAGES: Record<CharacterStatus, CharacterImage> = {
  0: {
    dead: '/src/assets/images/tako_dead.png',
  },
  1: {
    sad: '/src/assets/images/tako_baby_sad.png',
    normal: '/src/assets/images/tako_baby_normal.png',
    happy: '/src/assets/images/tako_baby_happy.png',
  },
  2: {
    sad: '/src/assets/images/tako_yonger_sad.png',
    normal: '/src/assets/images/tako_yonger_normal.png',
    happy: '/src/assets/images/tako_yonger_happy.png',
  },
  3: {
    sad: '/src/assets/images/tako_older_sad.png',
    normal: '/src/assets/images/tako_older_normal.png',
    happy: '/src/assets/images/tako_older_happy.png',
  },
};

interface Position {
  x: number;
  y: number;
}

interface CharacterImageProps {
  character: Character;
  containerWidth?: number;
  containerHeight?: number;
}

function CharacterImage({
  character,
  containerWidth = 125,
  containerHeight = 100,
}: CharacterImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 0, y: 0 });
  const [containerPosition, setContainerPosition] = useState<Position>({ x: 0, y: 0 });

  const currentImage = useMemo(() => {
    const images = CHARACTER_IMAGES[character.status];

    if (character.status === 0) {
      return images.dead;
    }

    if (character.health_points < 5) return images.sad;
    if (character.health_points < 10) return images.normal;
    return images.happy;
  }, [character.status, character.health_points]);

  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerPosition({ x: rect.x, y: rect.y });
      }
    };

    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    return () => window.removeEventListener('resize', updateContainerPosition);
  }, []);

  useEffect(() => {
    if (character.status === 0) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // インタラクティブ要素のチェック
      const isInteractiveElement = (
        // ステータス表示エリア（右上のカード）
        target.closest('.bg-white\\/90.backdrop-blur-sm') !== null ||
        // アクションボタン
        target.closest('button') !== null ||
        // モーダル
        target.closest('.fixed.inset-0.bg-black\\/50') !== null ||
        // キャラ作成時の処理
        target.closest('.text-lg') !== null
      );

      // エフェクトコンテナのチェック
      const isEffectsContainer = target.closest('#effects-container') !== null;

      // インタラクティブ要素上のクリックでなければ位置を更新
      if (!isInteractiveElement || isEffectsContainer) {
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;

        // クリック位置に基づいて新しい位置を計算
        const newX = event.clientX - containerPosition.x -
          (event.clientX >= windowCenterX ? containerWidth : 0);
        const newY = event.clientY - containerPosition.y -
          (event.clientY >= windowCenterY ? containerHeight : 0);

        setTargetPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [character.status, containerPosition, containerWidth, containerHeight]);

  const characterPosition = useMemo(() => {
    if (character.status === 0) {
      return { x: 0, y: 0 };
    }
    return targetPosition;
  }, [character.status, targetPosition]);

  return (
    <div ref={containerRef} className="relative">
      <img
        src={currentImage}
        width={character.status == 0 ? 350 : 160}
        alt={`Character (Status: ${character.status === 0 ? 'Dead' : 'Alive'}, HP: ${character.health_points})`}
        className={`transition-transform duration-500 ease-in-out
          ${character.status === 0 ? 'grayscale opacity-75' : ''}`}
        style={{
          transform: `translate(${characterPosition.x}px, ${characterPosition.y}px)`,
        }}
      />
    </div>
  );
}

export default CharacterImage;