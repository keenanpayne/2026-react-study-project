import { useCallback, useState } from 'react';
import type { MobileView, WorkbenchPane } from '../ui/composite/MobileNavigation';

export function useMobileNavigation(initialPane: WorkbenchPane = 'preview') {
  const [activePane, setActivePane] = useState<WorkbenchPane>(initialPane);
  const [activeMobileView, setActiveMobileView] = useState<MobileView>('chat');

  const handleMobileViewChange = useCallback((view: MobileView) => {
    setActiveMobileView(view);
    if (view !== 'chat') {
      setActivePane(view);
    }
  }, []);

  return {
    activePane,
    setActivePane,
    activeMobileView,
    handleMobileViewChange,
  };
}
