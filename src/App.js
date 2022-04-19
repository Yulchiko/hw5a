import React, {useReducer, useState} from 'react';

const reducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'addCat':
            return {...state, cats: [...state.cats, {name: payload, id: Date.now()}]}
        case 'delCat':
            return {...state, cats: state.cats.filter(cat => cat.id !== payload)}
        case 'addDog':
            return {...state, dogs: [...state.dogs, {name: payload, id: Date.now()}]}
        case 'delDog':
            return {...state, dogs: state.dogs.filter(dog => dog.id !== payload)}

        default:
            throw new Error('Error')
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, {cats: [], dogs: []});
    const [catValue, setCatValue] = useState('')
    const [dogValue, setDogValue] = useState('')

    const clickCat = () => {
        dispatch({type: 'addCat', payload: catValue})
        setCatValue('')
    }

    const clickDog = () => {
        dispatch({type: 'addDog', payload: dogValue})
        setCatValue('')
    }
    return (
        <div >
            <div >
                <label>Cat name: <input type="text" onChange={({target}) => setCatValue(target.value)}
                                        value={catValue}/></label>
                <button onClick={clickCat}>Save</button>
                <label>Dog name: <input type="text" onChange={({target}) => setDogValue(target.value)}
                                        value={dogValue}/></label>
                <button onClick={clickDog}>Save</button>
            </div>
            <hr/>
            <div style={{  marginLeft:'20px'}}>
                <div style={{display:'flex'}}>
                    {state.cats.map(cat=>(
                        <div key={cat.id}>
                            {cat.name}
                            <button onClick={() => dispatch({type: 'delCat', payload: cat.id})}>Delete</button>
                        </div>
                    ))}
                    {state.dogs.map(dog=>(
                        <div key={dog.id}>
                            {dog.name}
                            <button onClick={() => dispatch({type: 'delDog', payload: dog.id})}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;