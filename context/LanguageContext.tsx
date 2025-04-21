import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

interface Language {
  name: string;
  localName: string;
  code: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
}

const defaultLanguage: Language = {
  name: 'English',
  localName: 'English',
  code: 'en',
};

const languages: Language[] = [
  defaultLanguage,
  { name: 'Urdu', localName: 'اردو', code: 'ur' },
  { name: 'Arabic', localName: 'العربية', code: 'ar' },
  { name: 'Chinese', localName: '中文', code: 'zh' },
  { name: 'Spanish', localName: 'Español', code: 'es' },
  { name: 'Hindi', localName: 'हिन्दी', code: 'hi' },
  { name: 'French', localName: 'Français', code: 'fr' },
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  languages: languages,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = languages.find(lang => lang.code === i18n.language);
    return savedLanguage || defaultLanguage;
  });

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language.code);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
} 