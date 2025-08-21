import React from 'react'
import { useLanguage } from "../context/LanguageContext";

const ArtisticaMasc = () => {
  const { t } = useLanguage();
  return (
    <div>{t.artisticMale}</div>
  )
}

export default ArtisticaMasc