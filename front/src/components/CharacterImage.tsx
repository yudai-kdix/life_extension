import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Character, CharacterStatus } from '../contexts/CharacterContext';

interface CharacterImage {
  sad: string;
  normal: string;
  happy: string;
  dead?: string; // 死亡状態の画像を追加
}

// 定数定義を更新
const CHARACTER_IMAGES: Record<CharacterStatus, CharacterImage> = {
  0: {
    // 死亡状態は1つの画像のみ使用
    sad: '/src/assets/images/tako_dead.png',
    normal: '/src/assets/images/tako_dead.png',
    happy: '/src/assets/images/tako_dead.png',
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
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [containerPosition, setContainerPosition] = useState<Position>({ x: 0, y: 0 });

  // キャラクターの画像を決定するロジックを更新
  const currentImage = useMemo(() => {
    const images = CHARACTER_IMAGES[character.status];

    // 死亡状態の場合
    if (character.status === 0) {
      return images.dead;
    }

    // 生存状態の場合
    if (character.health_points < 5) return images.sad;
    if (character.health_points < 10) return images.normal;
    return images.happy;
  }, [character.status, character.health_points]);

  // コンテナの位置を更新
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

  // マウス追従の制御（死亡状態では無効化）
  useEffect(() => {
    // 死亡状態ではマウス追従を無効化
    if (character.status === 0) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [character.status]);

  // キャラクターの位置を計算
  const characterPosition = useMemo(() => {
    // 死亡状態では中央に固定
    if (character.status === 0) {
      return { x: 0, y: 0 };
    }

    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    return {
      x:
        mousePosition.x -
        containerPosition.x -
        (mousePosition.x >= windowCenterX ? containerWidth : 0),
      y:
        mousePosition.y -
        containerPosition.y -
        (mousePosition.y >= windowCenterY ? containerHeight : 0),
    };
  }, [character.status, mousePosition, containerPosition, containerWidth, containerHeight]);

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
