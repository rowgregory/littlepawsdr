import { useEffect, useState } from 'react';

interface UseAutoSaveProps {
  inputs: any;
  onSave: (data: any) => Promise<void>;
  isLoading: boolean;
  debounceMs?: number;
  enabled?: boolean;
}

export const useAutoSave = ({
  inputs,
  onSave,
  isLoading,
  debounceMs = 1000,
  enabled = true,
}: UseAutoSaveProps) => {
  const [initialInputs, setInitialInputs] = useState<any>(null);
  const [hasChanged, setHasChanged] = useState(false);

  // Set initial inputs when they're first populated
  useEffect(() => {
    if (initialInputs === null && Object.keys(inputs || {}).length > 0) {
      setInitialInputs(inputs);
    }
  }, [inputs, initialInputs]);

  // Check if inputs changed from initial
  useEffect(() => {
    if (!initialInputs) return;

    if (JSON.stringify(inputs) !== JSON.stringify(initialInputs)) {
      setHasChanged(true);
    }
  }, [inputs, initialInputs]);

  // Auto-save when inputs change
  useEffect(() => {
    if (!hasChanged || !enabled || isLoading) return;

    const timer = setTimeout(async () => {
      try {
        await onSave(inputs);
        setHasChanged(false);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputs, hasChanged, enabled, isLoading, onSave, debounceMs]);
};
