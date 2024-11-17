import { createContext, useState } from "react";

export const FavoriteContext = createContext({
    ids:[],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});


function FavoritesContextProvider({children}){
    const [favoriteJobIds, setFavoriteJobIds] = useState([]);

    function addFavorite(id){
        setFavoriteJobIds((curFavJobIds) => [...curFavJobIds,id]);
    }

    function removeFavorite(id){
        setFavoriteJobIds((curFavJobIds) => {
            return curFavJobIds.filter((item) => item!==id);
        });
    }

    const value = {
        ids: favoriteJobIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    }

    return <FavoriteContext.Provider value={value}>
        {children}
    </FavoriteContext.Provider>
}

export default FavoritesContextProvider;