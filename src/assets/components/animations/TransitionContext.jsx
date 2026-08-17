import React, { createContext, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

export const useTransitionNavigate = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionNavigate must be used within a TransitionProvider');
  }
  return context.navigateWithTransition;
};

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const transitionHandlerRef = useRef(null);

  const registerTransitionHandler = (handler) => {
    transitionHandlerRef.current = handler;
  };

  const navigateWithTransition = (toUrl, options = {}) => {
    if (transitionHandlerRef.current) {
      transitionHandlerRef.current(toUrl, () => navigate(toUrl, options));
    } else {
      navigate(toUrl, options);
    }
  };

  return (
    <TransitionContext.Provider
      value={{ navigateWithTransition, registerTransitionHandler, navigate }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
