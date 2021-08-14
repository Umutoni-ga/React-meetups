import {createContext, useState} from 'react';

const FavoritesContext= createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup)=>{},
    removeFavorite: (meetupId)=>{},
    itemIsFavorite: (meetupId)=>{}
});

export function FavoritesContextProvider(props){
    const [userFavorites, setUserFavorites] = useState([]);
    

    const context= {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: isItemFavoriteHandler
    };

    function addFavoriteHandler(favoriteMeetup){
        fetch('https://react-meetup-d30e7-default-rtdb.firebaseio.com/favorites.json', 
        {
            method: 'POST',
            body: JSON.stringify({
              id: favoriteMeetup.id,
              title: favoriteMeetup.title,
              description: favoriteMeetup.description,
              image: favoriteMeetup.image,
              address: favoriteMeetup.address,
            }),
            headers: {
                'content-type':'application/json'
            }
        }).then(()=>{
          console.log('it worked!')
        });
        setUserFavorites(prevUserFavorites=>{
            return prevUserFavorites.concat(favoriteMeetup);
        })
    }

    function removeFavoriteHandler(meetupId){
        fetch('https://react-meetup-d30e7-default-rtdb.firebaseio.com/favorites.json/')
        .then(res=> {return res.json()})
        .then(data=>{
        for (const key in data){
          if(data[key].id===meetupId){
          fetch('https://react-meetup-d30e7-default-rtdb.firebaseio.com/favorites/'+key+'.json', {
          method: 'DELETE',}).then(()=>{
            console.log('done')
          })
          }
        }
        })
        setUserFavorites( prevUserFavorites => {
            return prevUserFavorites.filter(meetup=> meetupId !== meetup.id);
        })
    }

    function isItemFavoriteHandler(meetupId){
        return userFavorites.some(meetup=>meetupId=== meetup.id);
    }


    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;