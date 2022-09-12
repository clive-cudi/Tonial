import React from "react";
import LoggedInRouting from "./LoggedInStack/LoggedInRouting";
import LoggedOutRouting from "./LoggedOutStack.js/LoggedOutRouting";
import { AuthStatusCtx } from "./contexts/AuthStatusCtx";
import { useContext } from "react";
import { ThemeCtx } from "./contexts/ThemeCtx";

function Routing(){
    // eslint-disable-next-line
    const [isAuth] = useContext(AuthStatusCtx);
    const [darkTheme, setDarkTheme] = useContext(ThemeCtx);

    return (
        <div className="Content" style={{
            background: !darkTheme && "rgb(233, 233, 233)"
        }} >
            {
                isAuth === true ? <LoggedInRouting /> : <LoggedOutRouting />
            }
        </div>
    )
}

export default Routing;