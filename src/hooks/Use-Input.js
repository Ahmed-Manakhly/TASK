import { useReducer } from "react";
//-----------------------------------------------------
const initialInputState = {value : "" , isTouched : false} ;
//-----------------------------------------------
const inputStateReducer = (state,action) => {
    if(action.type === 'INPUT'){
        return {value : action.value , isTouched : state.isTouched};
    } ;
    if(action.type === 'BLUR'){
        return {value : state.value , isTouched : true};
    } ;
    if(action.type === 'REST'){
        return {value : '' , isTouched : false};
    } ;
    return initialInputState ;
} ;
//-------------------------------------------------------

const useInput = (validateValue) => {
    const [inputState,dispatchState] = useReducer(inputStateReducer , initialInputState) ;
//-----------------------------------------------------------------------------
    const valueIsValid = validateValue(inputState.value) ;
    const hasError = !valueIsValid && inputState.isTouched ;
//--------------------------------------------------------------------------------------
    const valueChangeHandler = (event) => {
        dispatchState({type : 'INPUT' , value : event.target.value});
    } ;
    //-------------------------------
    const inputBlurHandler = event =>{
        dispatchState({type : 'BLUR'});
    };
    //-------------------------------
    const reset = () => {
        dispatchState({type : 'REST'}) ;
    }

//-------------------------------------------------------------------------------------

    return {
        value : inputState.value , hasError ,valueIsValid , valueChangeHandler, inputBlurHandler , reset
    }
} ;

export default useInput ;