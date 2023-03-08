export const useColor = () => {
  
  const them = {'primary':'#1961B6','secondary':'#ffffff'}
  const disableColor = '#E0E0E0'
  const makeColor = ({ themeColor, isDisabled }) => {
    const madeColor =  them[themeColor] || themeColor;
    return isDisabled
      ? disableColor
      : madeColor;
  };

  return {
    makeColor,
  };
};

export default { useColor };