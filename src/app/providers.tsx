'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ProgressProvider } from '@bprogress/next/app';
import { MyAppProvider } from '@/hooks/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="#633bff"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <MyAppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </MyAppProvider>
    </ProgressProvider>
  );
};

export default Providers;