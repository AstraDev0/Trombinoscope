import React, { createContext, useContext, useState } from 'react';

const ProviderInfo = createContext();

export const ProviderInfoProvider = ({ children, myImage, setImage, myInfo, setInfo }) => {
  return (
    <ProviderInfo.Provider value={{ myImage, setImage, myInfo, setInfo }}>
      {children}
    </ProviderInfo.Provider>
  );
};

export const useProviderInfo = () => {
  return useContext(ProviderInfo);
};