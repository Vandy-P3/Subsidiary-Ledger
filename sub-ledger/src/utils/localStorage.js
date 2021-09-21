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
  
export const removeAssetId = (assetId) => {
    const savedAssetIds = localStorage.getItem('saved_assets')
      ? JSON.parse(localStorage.getItem('saved_assets'))
      : null;
  
    if (!savedAssetIds) {
      return false;
    }
  
    const updatedSavedAssetIds = savedAssetIds?.filter((savedBookId) => savedBookId !== assetId);
    localStorage.setItem('saved_assets', JSON.stringify(updatedSavedAssetIds));
  
    return true;
};
  