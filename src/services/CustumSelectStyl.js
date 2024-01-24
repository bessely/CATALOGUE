export const CustumSelectStyl = {
    option: (provided, state) => ({
        ...provided,
        color           : state.isSelected ? 'gray' : '##888ea8',
        borderBottom    : '1px dashed Rgba(136,142,168,0.1)',
        padding         : 10,
        height          : 45,
        minHeight       : 45,
        backgroundColor : '#fff',
    }),
    menu: (provided, state) => ({
        ...provided,
        // width     : state.selectProps.width,
        borderBottom : '1px dotted pink',
        color        : state.selectProps.menuColor,
        padding      : 0,
    }),
    control: (provided, state) => ({
        ...provided,
        height          : 45,
        minHeight       : 45,
        backgroundColor : state.isDisabled ? "#F1F2F3":'#fff',
        borderRadius    : 6,
        borderColor     : '#bfc9d4',
        boxShadow       : state.isFocused ? "0 0 5px 2px rgb(194 213 255 / 62%)" : 0,
        "&:focus"       : {border: state.isFocused ? 0 : 0,},
    }),
    singleValue: (provided, state) => {
        const opacity    = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color      = state.isDisabled ? "#9BA0B6" : '#888ea8';
        const fontSize   = "16px";
        const padding    = "10px";
        return { ...provided, opacity, transition, color, padding, fontSize };
    }
};