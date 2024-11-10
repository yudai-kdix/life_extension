import { GameAction } from '../constants/actions';

interface ActionButtonProps {
  action: GameAction;
  onClick: (action: GameAction) => void;
}

export function ActionButton({ action, onClick }: ActionButtonProps) {
  return (
    // <li className="flex-shrink-0 list-none">
    <div className="">
      <button
        onClick={() => onClick(action)}
        className="relative w-24 h-24 rounded-full bg-white text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110"
      >
        <span className="text-5xl">{action.icon}</span>
      </button>
    </div>

    // </li>
  );
}
