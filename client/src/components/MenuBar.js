import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "shards-react";

// Menu bar for navigation purpose 
class MenuBar extends React.Component {
  render() {
    return (
      <Navbar type="dark" theme="secondary" expand="md" >
        <NavbarBrand href="/"><h1 style={{ color: "#dbdbdb" }}><img src={'hat.svg'} alt="hat"
          style={{ width: 50 }} /> Chef's Shelf</h1></NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/recipespage">
              Search Recipes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/ingredientpage" >
              Search Ingredient
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/brandpage" >
              Search Brand
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/nutrition" >
              Search Nutritions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/recommendation" >
              Chef's Recommendation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/stat" >
              Statistics
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/about" >
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/login" >
              My Account
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default MenuBar
