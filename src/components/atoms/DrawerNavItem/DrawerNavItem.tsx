import "./DrawerNavItem.scss";

import React from "react";
import {IDrawerNavItemProps} from "./types";
import {NavLink} from "react-router-dom";

const DrawerNavItem = ({
                           to,
                           alt,
                           badge,
                           text,
                           premium,
                       }: IDrawerNavItemProps) => {
    const baseclass = "drawer-nav-item";

    return (
        <NavLink to={to ? to : "/"} className={baseclass}>
            {alt && badge && (
                <img
                    className={`${baseclass}_logo`}
                    alt={alt}
                    src={badge}
                    width="50px"
                    height="30px"
                />
            )}
            <div>
                {premium && <small className="premium">Premium users only</small>}
                <span>{text}</span>
            </div>
        </NavLink>
    );
};

export default DrawerNavItem;
