export const getSavedAssetIds = () => {
    const savedAssetIds = localStorage.getItem('saved_assets')
      ? JSON.parse(localStorage.getItem('saved_assets'))
      : [];
  
    return savedAssetIds;
};
  
export const saveAssetIds = (assetIdArr) => {
    if (assetIdArr.length) {
      localStorage.setItem('saved_assets', JSON.stringify(assetIdArr));
    } else {
      localStorage.removeItem('saved_assets');
    }
};
  