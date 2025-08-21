import React from 'react'
import { useLanguage } from "../context/LanguageContext";

const Artistica = () => {
  const { t } = useLanguage();
  return (
    <div>{t.artisticFemale}</div>
  )
}

export default Artistica