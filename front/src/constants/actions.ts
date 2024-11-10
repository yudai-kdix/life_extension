// src/constants/actions.ts
export type ActionType =
  | '睡眠'
  | '食事'
  | '運動'
  | 'タバコ'
  | '酒'
  | 'エナドリ';

  export interface MealType {
    type: '朝食' | '昼食' | '夕食' | '軽食';
    icon: string;
    description: string;
  }

export interface GameAction {
  type: ActionType;
  icon: string;
  description: string;
  position: 'top' | 'right' | 'bottom' | 'left' | 'center';
  order: number;
  details: { label: string; value: string; description: string }[];
  imagePath: string;
  subActions?: MealType[]; // 食事用のサブアクション
}

export const GAME_ACTIONS: GameAction[] = [
  {
    type: '睡眠',
    icon: '😴',
    description: '睡眠時間によってHPと寿命が変化します',
    position: 'top',
    order: 1,
    imagePath: '/src/assets/images/bed.png',
    details: [
      {
        label: '3時間未満',
        value: 'sleep_0to3',
        description: '極度の睡眠不足です。HPが大きく減少し、寿命も縮みます。',
      },
      {
        label: '3-5時間',
        value: 'sleep_3to5',
        description: '睡眠不足です。HPが減少し、寿命もやや縮みます。',
      },
      {
        label: '5-7時間',
        value: 'sleep_5to7',
        description: 'もう少し睡眠が必要かもしれません。HPがやや回復します。',
      },
      {
        label: '7時間以上',
        value: 'sleep_7plus',
        description: '十分な睡眠が取れています。HPが回復し、寿命も延びます。',
      },
    ],
  },
  {
    type: '食事',
    icon: '🍚',
    description: '食事の質でHPと寿命が変化します',
    position: 'right',
    order: 1,
    imagePath: '/src/assets/images/meal.png',
    subActions: [
      {
        type: '朝食',
        icon: '🍳',
        description: '朝食の質でHPと寿命が変化します',
      },
      {
        type: '昼食',
        icon: '🍚',
        description: '昼食の質でHPと寿命が変化します',
      },
      {
        type: '夕食',
        icon: '🍖',
        description: '夕食の質でHPと寿命が変化します',
      },
      {
        type: '軽食',
        icon: '🍪',
        description: '軽食の質でHPと寿命が変化します',
      },
    ],
    details: [
      {
        label: '食べていない',
        value: 'meal_none',
        description: '食事を抜くと活力が低下します。',
      },
      {
        label: '不健康な食事',
        value: 'meal_unhealthy',
        description: '栄養が偏った食事です。HPがやや減少します。',
      },
      {
        label: 'ちゃんとした食事',
        value: 'meal_healthy',
        description: '栄養バランスの取れた食事です。HPが回復します。',
      },
    ],
  },
  {
    type: '運動',
    icon: '🏃',
    description: '運動量でHPと寿命が変化します',
    position: 'left',
    order: 1,
    imagePath: '/src/assets/images/exercise.png',
    details: [
      {
        label: '何もしない',
        value: 'exercise_none',
        description: '運動不足です。徐々にHPが減少していきます。',
      },
      {
        label: '軽い運動',
        value: 'exercise_light',
        description: '適度な運動です。HPが少し回復し、寿命もやや延びます。',
      },
      {
        label: '適度な運動',
        value: 'exercise_moderate',
        description: '程よい運動量です。HPが回復し、寿命も延びます。',
      },
      {
        label: '激しい運動',
        value: 'exercise_intense',
        description: '過度な運動です。一時的にHPが減少しますが、寿命は延びます。',
      },
    ],
  },
  {
    type: 'タバコ',
    icon: '🚬',
    description: '喫煙は寿命に影響します',
    position: 'right',
    order: 2,
    imagePath: '/src/assets/images/smoke.png',
    details: [
      {
        label: '吸っていない',
        value: 'smoke_none',
        description: '健康的な選択です。寿命への悪影響はありません。',
      },
      {
        label: '吸った',
        value: 'smoke_yes',
        description: '喫煙により寿命が縮みます。',
      },
    ],
  },
  {
    type: '酒',
    icon: '🍺',
    description: '飲酒量でHPと寿命が変化します',
    position: 'bottom',
    order: 1,
    imagePath: '/src/assets/images/alcohol.png',
    details: [
      {
        label: '飲んでいない',
        value: 'alcohol_none',
        description: '健康的な選択です。体への悪影響はありません。',
      },
      {
        label: '適度に飲んだ',
        value: 'alcohol_moderate',
        description: '程よい飲酒量です。一時的にHPが回復しますが、寿命はやや縮みます。',
      },
      {
        label: '飲みすぎた',
        value: 'alcohol_excessive',
        description: '過度な飲酒です。HPが大きく減少し、寿命も縮みます。',
      },
    ],
  },
  {
    type: 'エナドリ',
    icon: '⚡',
    description: 'HPが回復しますが寿命が減ります',
    position: 'bottom',
    order: 2,
    imagePath: '/src/assets/images/energy-drink.png',
    details: [
      {
        label: '飲んでいない',
        value: 'energy_none',
        description: '健康的な選択です。体への悪影響はありません。',
      },
      {
        label: '飲んだ',
        value: 'energy_consumed',
        description: '一時的にHPが回復しますが、寿命が縮みます。',
      },
    ],
  },
];
