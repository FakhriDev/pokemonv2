import React from 'react';
import { Heart } from '@phosphor-icons/react';
export const NotificationLove = (props) => {
  const { type } = props;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-400/15 z-50 flex items-center justify-center">
      <div className="p-4 animate-bounce-once">
        {type === 'add' ? (
          <span>
            <Heart size={96} color="red" weight="fill" />
          </span>
        ) : (
          <span>
            <Heart size={96} color="red" />
          </span>
        )}
      </div>
    </div>
  );
};
