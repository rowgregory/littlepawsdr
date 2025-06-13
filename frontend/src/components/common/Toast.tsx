import { useEffect, FC, ElementType, useState, useRef, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { AlertType, closeToast, Position } from '../../redux/features/toastSlice';

interface TypeStyle {
  bg: string;
  text: string;
  icon: ElementType;
  iconColor: string;
}

interface ToastProps {
  duration?: number;
  position?: Position;
  showCloseButton?: boolean;
}

const Toast: FC<ToastProps> = ({ duration = 4000, showCloseButton = true }) => {
  const dispatch = useAppDispatch();
  const { message, type, id, position } = useAppSelector((state) => state.toast);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastIdRef = useRef<number>(0);

  const handleClose = useCallback(() => {
    setVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    dispatch(closeToast());
  }, [dispatch]);

  useEffect(() => {
    if (message && id !== lastIdRef.current) {
      lastIdRef.current = id;
      setVisible(true);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [id, message, duration, handleClose]);

  if (!visible || !message) return null;

  const typeStyle = getTypeStyles(type);
  const IconComponent = typeStyle?.icon;

  return (
    <div
      className={`
        fixed z-50 max-w-sm w-full mx-auto
        ${getPositionClasses(position)}
        ${getSlideAnimation(position, visible)}
      `}
    >
      <div
        className={`
        ${typeStyle.bg} ${typeStyle.text}
        border rounded-lg shadow-lg p-4
        flex items-start gap-3
      `}
      >
        <IconComponent className={`${typeStyle.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium leading-relaxed'>{message}</p>
        </div>

        {showCloseButton && (
          <button
            onClick={handleClose}
            className={`
              ${typeStyle.iconColor} hover:opacity-70 
              transition-opacity p-0.5 flex-shrink-0
            `}
            aria-label='Close notification'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;

// helper functions
const getPositionClasses = (pos: Position): string => {
  const positions: Record<Position, string> = {
    tl: 'top-4 left-4',
    tc: 'top-4 left-1/2 -translate-x-1/2',
    tr: 'top-4 right-4',
    bl: 'bottom-4 left-4',
    bc: 'bottom-4 left-1/2 -translate-x-1/2',
    br: 'bottom-4 right-4',
  };
  return positions[pos];
};

const getSlideAnimation = (pos: Position, visible: boolean): string => {
  const animations: Record<Position, { in: string; out: string }> = {
    tl: { in: 'animate-slide-in-left', out: 'animate-slide-out-left' },
    tc: { in: 'animate-slide-in-down', out: 'animate-slide-out-up' },
    tr: { in: 'animate-slide-in-right', out: 'animate-slide-out-right' },
    bl: { in: 'animate-slide-in-left', out: 'animate-slide-out-left' },
    bc: { in: 'animate-slide-in-up', out: 'animate-slide-out-down' },
    br: { in: 'animate-slide-in-right', out: 'animate-slide-out-right' },
  };
  return visible ? animations[pos]?.in : animations[pos]?.out;
};

const getTypeStyles = (alertType: AlertType): TypeStyle => {
  const styles: Record<AlertType, TypeStyle> = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: AlertCircle,
      iconColor: 'text-red-500',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500',
    },
  };
  return styles[alertType] ?? styles.success;
};
